import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import ProfileDetails from "../components/profile/ProfileDetail";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Post from "../components/post/Post";
import { Row, Col } from "react-bootstrap";

function Profile() {
  const { profileId } = useParams();

  const user = useSWR(`/user/${profileId}/`, fetcher);

  const posts = useSWR(`/post/?author__public_id=${profileId}`, fetcher, {
    refreshInterval: 20000,
  });

  return (
    <Layout hasNavigationBack>
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileDetails user={user.data} /> 
        </Col>
      </Row>
    </Layout>
  );
}

export default Profile;