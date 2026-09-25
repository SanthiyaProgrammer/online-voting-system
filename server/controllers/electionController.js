const {v4: uuid} = require("uuid")
const cloudinary = require('../utils/cloudinary')
const HttpError = require("../models/ErrorModel")
const ElectionModel = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')
const path = require("path")
//=============================add new election
//post:api/elections
//protected(only admin)
const addElection = async (req,res,next) => {
    //only admin can add election
    if(!req.user.isAdmin){
        return next(new HttpError("only an admin can perform this action",403))
    }
    

    try {
        
        const {title,description} = req.body;
    if(!title || !description){
        return next(new HttpError("fill all the fields",422))
    }
    if(!req.files.thumbnail){
        return next(new HttpError("choose a thumbnail",422))
    }
    const {thumbnail} = req.files;
    //image should be less than 1mb
    if(thumbnail.size > 1000000){
        return next(new HttpError("file size too big. should be less than 1mb"))
    }
    //rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".")
    fileName = fileName[0] + uuid() +
     "." + fileName[fileName.length - 1]

    //upload file to uploads folder 
    await thumbnail.mv(path.join(__dirname,'..','uploads',fileName), async (err) => {
        if(err){
            return next(new HttpError(err))
        }
        //store image on cloudinary
        const result = await cloudinary.uploader.upload(path.join(__dirname,'..','uploads',fileName),
            {resource_type:"image"})
        if(!result.secure_url){
            return next(new HttpError("couldn't upload image",422))
        }
        //save election to db
        const newElection = await ElectionModel.create({title,description,thumbnail:result.secure_url})
        res.json(newElection)
    })

    } catch (error) {
        return next(new HttpError(error))
    }

}
//=============================get all election 
//post:api/elections
//protected
const getElections = async (req,res,next) => {
    try {
        const elections = await ElectionModel.find();
        res.status(200).json(elections)
    } catch (error) {
        return next(new HttpError(error))
    }
}
//=============================get single election
//post:api/elections/:id
//protected
const getElection = async (req,res,next) => {
    try {
        const {id} = req.params;
        const election =await ElectionModel.findById(id)
        res.status(200).json(election)
    } catch (error) {
        return next(new HttpError(error))
    }
}
//=============================get election candidates
//post:api/elections/id/candidates
//protected
const getCandidatesOfElection = async(req,res,next) => {
    try {
        const {id} = req.params;
        const candidates = await CandidateModel.find({election: id})
        res.status(200).json(candidates);
    } catch (error) {
       return next(new HttpError(error)) 
    }
}

//=============================get voters of election
//post:api/elections/:id/voters
//protected
const getElectionVoters = async(req,res,next) => {
    try {
        const {id}= req.params;
        const response =await ElectionModel.findById(id).populate('voters')
        res.status(200).json(response.voters)
    } catch (error) {
        return next(new HttpError(error))
    }
}
//=============================update election
//patch:api/elections/:id
//protected(only admin)
const updateElection = async(req,res,next) => {
    try {
            //only admin can add election
    if(!req.user.isAdmin){
        return next(new HttpError("only an admin can perform this action",403))
    }
        const {id} = req.params;
        const {title,description}=req.body;
        if(!title || !description){
            return next(new HttpError("fill all the fields",422))
        }
        if(req.files.thumbnail){
            const {thumbnail} = req.files;
        //image should be less than 1mb
        if(thumbnail.size > 1000000){
            return next(new HttpError("file size too big. should be less than 1mb"))
        }
        //rename the image
        let fileName = thumbnail.name;
        fileName = fileName.split(".")
        fileName = fileName[0] + uuid() +
         "." + fileName[fileName.length - 1]
        thumbnail.mv(path.join(__dirname,'..','uploads',fileName), async (err) => {
            if(err){
                return next(new HttpError(err))
            }
            //store image on cloudinary
            const result = await cloudinary.uploader.upload(path.join(__dirname,'..','uploads',fileName),
                {resource_type:"image"})
            if(!result.secure_url){
                return next(new HttpError("couldn't upload image",422))
            }
            //save election to db
             await ElectionModel.findByIdAndUpdate(id, {title,description,thumbnail:result.secure_url})
            res.json("election updated successfully",200)
        })
        }
       
    } catch (error) {
        
    }
}
//=============================delete election
//delete:api/elections/:id
//protected(only admin)
const removeElection = async(req,res,next) => {
try {
                //only admin can add election
    if(!req.user.isAdmin){
        return next(new HttpError("only an admin can perform this action",403))
    }
    const {id} = req.params;
    await ElectionModel.findByIdAndDelete(id);
    //delete candidates that belongs to this election
    await CandidateModel.deleteMany({election:id})
    res.status(200).json("election deleted successfully.")
} catch (error) {
    return next(new HttpError(erro))
}
}

module.exports = {addElection,getElections,getElection,updateElection,
removeElection,getCandidatesOfElection,getElectionVoters}