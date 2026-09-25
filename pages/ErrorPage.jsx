import React,{useEffect} from 'react'
import Image from '../assets/errors.png'
import {useNavigate} from 'react-router-dom'

const ErrorPage = () => {
  const navigate=useNavigate()
  //redirect user to previous page after 6 secs
  useEffect(()=>{
    setTimeout(()=>{
      navigate(-1)
    },4000)  
  })
  return (
   <section className='errorPage'>
    <div className="errorPage_container">
      <img src={Image} alt="page not found"/>
      <h1>404</h1>
      <p>this page does not exist.You will be redirect to the previous page shortly</p>
    </div>
   </section>
  )
}

export default ErrorPage