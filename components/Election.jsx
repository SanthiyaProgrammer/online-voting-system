import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UiActions } from '../store/ui-slice'
import { voteActions } from '../store/vote-slice'

const Election = ({_id:id,title,description,thumbnail}) => {
  const dispatch = useDispatch()
  //close confirm vote modal
      const openUpdateModal = () => {
          dispatch(UiActions.openUpdateElectionModal())
          dispatch(voteActions.changeIdOfElectionToUpdate(id))
      }
  
      const isAdmin = useSelector(state => state?.vote?.currentVoter?.isAdmin)

  return (
    <article className='election'>
        <div className='election_image'>
            <img src={thumbnail} alt={title}/>

        </div>
        <div className='election_info'>
            <Link to={`/elections/${id}`}><h4>{title}</h4></Link>
            <p>{description?.length >100 ? description.substring(0,100)+"..." : description}</p>
            <div className='election_cta'>
              <Link to={`/elections/${id}`} className='btn sm'>view</Link>
              {isAdmin && <button className='btn sm primary' onClick={openUpdateModal}>Edit</button>}
            </div>
        </div>
        
    </article>
  )
}

export default Election