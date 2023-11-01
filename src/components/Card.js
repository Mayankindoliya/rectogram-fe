import React, { useState } from 'react'
import './Card.css'
import moreAction from '../images/more-action.PNG'
// import useSelector from react-Redux
import { useSelector } from 'react-redux'
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';

const Card = (props) => {
   const user = useSelector(state => state.userReducer.user)

   const [commentBox, setCommentBox] = useState(false)
   const [comment, setComment] = useState("")

   const CONFIG_OBJ = {
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
   }

   const submitComment = (postId) => {
      console.log(comment)
   }

   const likeDislikePost = async (postId, type) => {
      console.log(user)
      const request = { "userId": user._id }
      const response = await axios.put(`${API_BASE_URL}/${type}/${postId}`, request, CONFIG_OBJ);
      if (response.status === 200) {
         props.getAllPosts();
      }
   }

   return (
      <div>
         <div className='card shadow-sm'>
            <div className='card-body px-2'>
               <div className='row'>
                  <div className='col-6 d-flex'>
                     <img className='p-2 profile-pic' alt='profile-pic' src='https://plus.unsplash.com/premium_photo-1670596899123-c4c67735d77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' />
                     <div className='mt-2'>
                        <p className='fs-6 fw-bold'>{props.postData.user.fullName}</p>
                        <p className='location'>{props.postData.location}</p>
                     </div>
                  </div>
                  {props.postData.user._id === user._id ? <div className='col-6'>
                     <img onClick={() => props.deletePost(props.postData._id)} style={{ cursor: "pointer" }} className='float-end fs-3 p-2 mt-3' alt='more action' src={moreAction} />
                  </div> : ""}
               </div>
               <div className='row'>
                  <div className='col-12'>
                     <img className='img-fluid p-2' style={{ borderRadius: '15px' }} alt={props.postData.description} src={props.postData.image} />
                  </div>
               </div>
               <div className='row mt-2'>
                  <div className='col-6 d-flex'>
                     <i onClick={() => likeDislikePost(props.postData._id, "like")} className="ps-2 fa-regular fa-heart"></i>
                     <i onClick={() => likeDislikePost(props.postData._id, "unlike")} className="ps-2 fa-solid fa-thumbs-down"></i>
                     <i onClick={() => setCommentBox(true)} className="ps-3 fa-regular fa-comment"></i>
                  </div>
                  <div className='col-6'>
                     <span className='fs-6 pe-2 fw-bold float-end'>{props.postData.likes.length} likes</span>
                  </div>
               </div>
               {commentBox ? <div className='row mb-2'>
                  <div className='col-8'>
                     <textarea onChange={(e)=>setComment(e.target.value)} className='form-control'></textarea>
                  </div>
                  <div className='col-4'>
                     <button className='btn btn-primary' onClick={() => submitComment(props.postData._id)}>submit</button>
                  </div>
               </div> : ""}
               <div className='row'>
                  <div className='col-12'>
                     <span className='p-2 text-muted'>2 Hour ago</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Card