import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from "react-redux"
import { voteActions } from '../store/vote-slice'

const Login = () => {
  const [userData,setUserData] = useState({fullName:" ",voterId:"",password:"",password2:""})
  const [error,setError]= useState("")

  const dispatch = useDispatch()
  const navigate= useNavigate()
//funtion to change controlled inputs
  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const loginVoter = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/voters/login`, userData)
      const newVoter= await response.data;
      //save new voter in local storage and update in redux store
      localStorage.setItem("currentUser",JSON.stringify(newVoter))
      dispatch(voteActions.changeCurrentVoter(newVoter))
      navigate('/result')
    } catch (err) {
      setError(err.response.data.message)
    }
  }
  
  return (
    <section className='register'>
      <div className='container register_container'>
        <h2>Sign IN</h2>
        <form onSubmit={loginVoter}>
          {error && <p className='form_error_message'>{error}</p>}
          <input type='text' name='voterId' placeholder='voter id'  onChange={changeInputHandler} autoComplete='true' autoFocus/>
          <input type='password' name='password' placeholder='Password'  onChange={changeInputHandler} autoComplete='true' autoFocus/>
          <p>Don't have an account?<Link to='/register'>sign up</Link></p>
          <button type='submit' className='btn primary'>Login</button>

        </form>
      </div>
    </section>
  )
}

export default Login