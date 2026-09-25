import React, { use, useEffect, useState } from 'react'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import {useDispatch, useSelector} from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import Loader from '../components/Loader'
import UpdateElectionModal from '../components/UpdateElectionModal'
import { useNavigate } from 'react-router-dom'
const Elections = () => {
  const navigate=useNavigate()
  const token = useSelector(state => state?.vote?.currentVoter?.token)
    //access control
    useEffect(()=> {
      if(!token){
        if(!token){
          navigate('/')
        }
      }
    },[])
  const [elections,setElections] = useState([])
  const [isLoading, setIsLoading]= useState(false);
  const dispatch = useDispatch()
  //open modal
  const openModal = () => {
    dispatch(UiActions.openElectionModal())
  }
  const isAdmin = useSelector(state => state?.vote?.currentVoter?.isAdmin)
  const electionModalShowing = useSelector(state => state.ui.electionModalShowing)
  const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing)
  const getElections = async () => {
   setIsLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`,
        {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setElections(response.data) 
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getElections()
  },[])
  return (
    <>
      <section className='elections'>
        <div className='container elections_container'>
          <header className='elections_header'>
            <h2>Ongoing Elections</h2>
            {isAdmin && <button className="btn primary" onClick={openModal}>Create New Elections</button>}
          </header>
          {isLoading? <Loader/> :<menu className='elections_menu'>
            {
              elections.map(election => <Election key={election._id} {...election}/>)
            }
          </menu>}
        </div>
      </section>
      {electionModalShowing && <AddElectionModal/>}
      {updateElectionModalShowing && <UpdateElectionModal/>}
    </>   
  )
}
export default Elections