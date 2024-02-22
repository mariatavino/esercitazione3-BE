import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { token } from "../dati/dati";
import {Container} from 'react-bootstrap';
import NavbarComponent from "./NavbarComponent";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`${token}posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Errore nella chiamata API per ottenere il post', error);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
<Container>
    <NavbarComponent/>
    <div>
      <h1>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </div>
</Container>
  );
}