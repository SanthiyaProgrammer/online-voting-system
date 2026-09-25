const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const VoterModel = require("../models/voterModel")
const HttpError = require("../models/ErrorModel")

//=============================register new voter
//post:api/voters/register
//unprotected
const registerVoter = async (req,res,next) => {
    try {
       const {fullName,voterId,password,password2} = req.body;
       if(!fullName || !voterId || !password || !password2){
        return next(new HttpError("fill in all fields",422))
       }

       //make all emails lowercased
       const newvoterId = voterId.toLowerCase()
       if((voterId.trim().length) < 10){
        return next(new HttpError("voterId should be at least 10 characters.",422))
       }
       //check if the email already exists in db
       const voterIdExists = await VoterModel.findOne({voterId:newvoterId})
       if(voterIdExists){
        return next(new HttpError("email already exist",422))
       }
       //make sure password 6+ characters
       if((password.trim().length) < 6){
        return next(new HttpError("password shold be at least 6 characters.",422))
       }
       //make sure passwords match 
       if(password !=password2){
        return next(new HttpError("password do not match",422))
       }

       //hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);
       //no user/voter should be admin except for one eith email "achiever@gmail.com"
       let isAdmin =false;
       if(voterId == "admin12345"){
        isAdmin = true
       }
       //save new voter to db
       const newVoter = await VoterModel.create({fullName,voterId:newvoterId, password:hashedPassword,isAdmin})
       res.status(201).json(`new voter ${fullName} created`)
    } catch (error) {
        return next(new HttpError("voter registration failed",422))
    }
}

//function to generate token
const generateToken = (payload) => {
    const token = jwt.sign(payload,process.env.JWT_SECRET, {expiresIn: "1d"})
    return token;
}


//=====================login voter
//post:api/voters/login
//unprotected
const loginVoter = async(req,res,next) => {
    try {
        const {voterId, password} = req.body;
        if(!voterId || !password){
            return next(new HttpError("fill in all fields",422))
        }
        const newvoterId = voterId.toLowerCase()
        const voter = await VoterModel.findOne({voterId: newvoterId})
        if(!voter){
            return next(new HttpError("Invalid credentials",422))
        }
        //compare passwords
        const comparePass = await bcrypt.compare(password, voter.password)
        if(!comparePass){
            return next(new HttpError("Invalid credentials",422))
        }
        const {_id: id, isAdmin,votedElections} = voter;
        const token = generateToken({id, isAdmin})

        res.json({token, id, votedElections, isAdmin})

    } catch (error) {
        return next(new HttpError("login failed.please check credentials or try again later.",422))
    }
}




//=====================get voter
//get:api/voters/idpo
//protected
const getVoter = async(req,res,next) => {
    try {
        const {id} = req.params;
        const voter = await VoterModel.findById(id).select("-password")
        res.json(voter)
    } catch (error) {
        return next(HttpError("couldn't get voter", 404))
    }
}


module.exports ={registerVoter, loginVoter, getVoter}
