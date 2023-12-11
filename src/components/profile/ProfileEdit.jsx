import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import Layout from '../Layout'
import ProfileUpdate from './ProfileUpdate'
import { fetcher } from '../../helpers/axios'
import {Row, Col} from 'react-bootstrap';


function ProfileEdit() {
    const {profileId} = useParams()
    const profile = useSWR(`/user/${profileId}/`, fetcher)
  return (
    <Layout hasNavigationBack>
    {profile.data ? (
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileUpdate profile={profile.data} />
        </Col>
      </Row>
    ) : (
      <div>Loading...</div>
    )}
  </Layout>
  )
}

export default ProfileEdit
