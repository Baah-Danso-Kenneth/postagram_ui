import React from 'react'
import Layout from '../components/Layout'  
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '../helpers/axios';
import { Col, Row } from 'react-bootstrap';
import Post from '../components/post/Post';
import CreateComment from '../components/comments/CreateComment';
import Comment from '../components/comments/Comment';


function SinglePost() {
    let {postId} = useParams();
    const post = useSWR(`/post/${postId}/`, fetcher)
    const comments = useSWR(`/post/${postId}/comment/`, fetcher)

  return (
    <Layout hasNavigationBack>
        {post.data? (
            <Row className="justify-content-center">
                <Col sm={8}>
                 <Post   post={post.data} refresh={post.mutate} isSinglePost/>
                 <CreateComment postId={post.data.id} refresh={comments.mutate}/>
            {comments.data &&
              comments.data.results.map((comment, index) => (
                <Comment
                  key={index}
                  postId={post.data.id}
                  comment={comment}
                  refresh={comments.mutate}
                />
              ))}
                 </Col>
            </Row>
        ):(
            <div>Loading ....</div>
        )}
    
    </Layout>
  )
}

export default SinglePost
