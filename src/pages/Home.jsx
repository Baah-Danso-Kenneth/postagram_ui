import React from 'react'
import Layout from '../components/Layout'
import { getUser } from '../hooks/user.action'
import { Row, Col, Image } from 'react-bootstrap';
import { randomAvatar } from '../utils';
import CreatePost from '../components/post/CreatePost';
import { fetcher } from '../helpers/axios';
import useSWR from 'swr'
import Post from '../components/post/Post';


function Home() {
  const posts = useSWR("/post/", fetcher,{
    refreshInterval:10000,
  })
  const user = getUser();

  if(!user){
    return <div>Loading</div>
  }

  return (
    <Layout>
       <Row className='justify-content-evenly'>
         <Col sm={7}>
          <Row className='border rounded align-items-center'>
            <Col>
             <Image
               src={randomAvatar()}
               roundedCircle
               width={52}
               height={52}
               />
            </Col>

            <Col sm={10} className='flex-grow-1'>
            <CreatePost refresh={posts.mutate}/>
            </Col>
          </Row>

          <Row className='my-4'>
             {posts.data?.results.map((post,index)=>{
              return(
                <Post key={index} post={post} 
                refresh={posts.mutate}/>
              )
             })}
          </Row>
         </Col>
       </Row>
    </Layout>
  )
}

export default Home
