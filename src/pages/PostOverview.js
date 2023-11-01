import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { API_BASE_URL } from '../../src/config';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostOverview = () => {
    // State to store all posts
    const [allposts, setAllposts] = useState([]);

    const CONFIG_OBJ = {
        headers: {
            //"Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }

    // Function to get all posts from the server
    const getAllPosts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allposts`);  // Sending a GET request to the server

        if (response.status === 200) {
            // If the request is successful (status code 200), set the posts in the state
            setAllposts(response.data)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'some error occured while getting all posts'
            })
        }
    }

    // deletePost functionality
    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
        if (response.status === 200) {
            getAllPosts();
        }
    }

    // Use the effect hook to call getAllPosts when the component mounts
    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className='container mt-md-5 mt-sm-3'>
            <div className='row'>
                {allposts.map((post) => {
                    return (
                        <div className='col-md-4 mb-2'key={post._id}>
                            <Card postData={post} deletePost={deletePost} getAllPosts={getAllPosts}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PostOverview