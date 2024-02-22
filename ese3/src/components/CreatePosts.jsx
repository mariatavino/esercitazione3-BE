import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Pagination,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate da react-router-dom
import { token } from '../dati/dati'; // Importa il token per le chiamate API
import axios from 'axios';
import NavbarComponent from "./NavbarComponent";

export default function PostList({ searchQuery }) {
  const [posts, setPosts] = useState([]); // Stato per memorizzare i post
  const [users, setUsers] = useState([]); // Stato per memorizzare gli utenti
  const [categories, setCategories] = useState([]); // Stato per memorizzare le categorie
  const [commentsCount, setCommentsCount] = useState({}); // Stato per memorizzare il numero di commenti per post
  const [likedPosts, setLikedPosts] = useState([]); // Stato per memorizzare i post che sono stati "liked"
  const [dislikedPosts, setDislikedPosts] = useState([]); // Stato per memorizzare i post che sono stati "disliked"
  const [currentPage, setCurrentPage] = useState(1); // Stato per memorizzare la pagina corrente della paginazione
  const [postsPerPage] = useState(7); // Numero di post per pagina

  useEffect(() => {
    fetchPosts(); // Carica i post all'avvio
    fetchUsers(); // Carica gli utenti all'avvio
    fetchCategories(); // Carica le categorie all'avvio
  }, []);

  // Inizializza useNavigate
  const history = useNavigate();

  // Funzione per aprire il post completo in una nuova pagina
  function openPost(postId) {
    // Utilizza history.push per reindirizzare l'utente alla pagina del post
    history(`/blog/${postId}`);
  }

  // Funzione per recuperare i post
  async function fetchPosts() {
    try {
      const response = await axios.get(token + 'posts'); // Effettua una chiamata API per ottenere i post
      setPosts(response.data); // Imposta i post nello stato
      // Ottieni il numero di commenti per ogni post
      await Promise.all(response.data.map(async (post) => {
        try {
          const commentResponse = await axios.get(`${token}comments?post=${post.id}`); // Ottieni i commenti relativi a questo post
          const numberOfComments = commentResponse.data.length; // Calcola il numero di commenti
          // Aggiorna lo stato dei commenti per questo post
          setCommentsCount(prevState => ({
            ...prevState,
            [post.id]: numberOfComments
          }));
        } catch (error) {
          console.error('Errore nella chiamata API per ottenere i commenti', error);
        }
      }));
    } catch (error) {
      console.error('Errore nella chiamata API', error);
      setPosts([]); // Se c'è un errore, imposta i post a un array vuoto
    }
  }

  // Funzione per recuperare gli utenti
  async function fetchUsers() {
    try {
      const response = await axios.get(token + 'users'); // Effettua una chiamata API per ottenere gli utenti
      setUsers(response.data); // Imposta gli utenti nello stato
    } catch (error) {
      console.error('Errore nella chiamata API', error);
      setUsers([]); // Se c'è un errore, imposta gli utenti a un array vuoto
    }
  }

  // Funzione per recuperare le categorie
  async function fetchCategories() {
    try {
      const response = await axios.get(token + 'categories'); // Effettua una chiamata API per ottenere le categorie
      setCategories(response.data); // Imposta le categorie nello stato
    } catch (error) {
      console.error('Errore nella chiamata API', error);
      setCategories([]); // Se c'è un errore, imposta le categorie a un array vuoto
    }
  }

  // Funzione per ottenere un utente in base all'ID
  function getUserById(authorId) {
    return users.find(user => user.id === authorId);
  }

  // Funzione per ottenere una categoria in base all'ID
  function getCategoryById(categoryId) {
    return categories.find(category => category.id === categoryId);
  }

  // Funzione per gestire il like di un post
  function handleLike(postId) {
    setLikedPosts(prevLikedPosts => {
      if (prevLikedPosts.includes(postId)) {
        return prevLikedPosts.filter(id => id !== postId); // Rimuovi il like se è già stato messo
      } else {
        setDislikedPosts(prevDislikedPosts => prevDislikedPosts.filter(id => id !== postId)); // Rimuovi il dislike
        return [...prevLikedPosts, postId]; // Aggiungi il like
      }
    });
  }

  // Funzione per verificare se un post è stato "liked"
  function isLiked(postId) {
    return likedPosts.includes(postId);
  }

  // Funzione per gestire il dislike di un post
  function handleDislike(postId) {
    setDislikedPosts(prevDislikedPosts => {
      if (prevDislikedPosts.includes(postId)) {
        return prevDislikedPosts.filter(id => id !== postId); // Rimuovi il dislike se è già stato messo
      } else {
        setLikedPosts(prevLikedPosts => prevLikedPosts.filter(id => id !== postId)); // Rimuovi il like
        return [...prevDislikedPosts, postId]; // Aggiungi il dislike
      }
    });
  }

  // Funzione per verificare se un post è stato "disliked"
  function isDisliked(postId) {
    return dislikedPosts.includes(postId);
  }

  // Calcola gli indici dei post da visualizzare nella pagina corrente
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Array.isArray(posts) && posts.slice(indexOfFirstPost, indexOfLastPost);

  // Funzione per cambiare pagina nella paginazione
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container>
    <NavbarComponent/>
    <Container className="py-5">
      <Card className="d-flex" style={{ width: "100%" }}>
        <Card.Body>
          <Table hover responsive className="text-center">
            <thead>
              <tr>
                <th></th>
                <th>Titolo</th>
                <th>Autore</th>
                <th>Categoria</th>
                <th>Commenti</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {/* Mappa sui post correnti e mostra ciascun post */}
              {currentPosts.map(post => (
                <tr key={post.id}>
                  <td>
                    {/* Pulsanti per like e dislike */}
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="p-1 m-0 waves-effect"
                      onClick={() => handleLike(post.id)}
                    >
                      <span className="value">{isLiked(post.id) ? 1 : 0}</span>
                      <i className="fas fa-thumbs-up ms-1"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="p-1 m-0 waves-effect mx-1"
                      onClick={() => handleDislike(post.id)}
                    >
                      <span className="value">{isDisliked(post.id) ? 1 : 0}</span>
                      <i className="fas fa-thumbs-down ms-1"></i>
                    </Button>
                  </td>
                  {/* Aggiungi un gestore di eventi al titolo del post per aprire il post completo in una nuova pagina */}
                  <td onClick={() => openPost(post.id)} style={{ cursor: "pointer" }}>{post.title.rendered}</td> {/* Titolo del post */}
                  <td>{getUserById(post.author)?.name}</td> {/* Nome dell'autore del post */}
                  <td>{getCategoryById(post.categories[0])?.name}</td> {/* Nome della categoria del post */}
                  <td>{commentsCount[post.id]}</td> {/* Numero di commenti del post */}
                  <td>{/* Aggiungi azioni qui, come link al post completo */}</td> {/* Azioni aggiuntive */}
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Paginazione */}
          <div className="d-flex justify-content-center">
            <nav className="my-3 pt-2">
              <Pagination className="mb-0">
                {/* Pulsante per la pagina precedente */}
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {/* Mappa sui numeri delle pagine */}
                {[...Array(Math.ceil(posts.length / postsPerPage))].map((_, index) => (
                  <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
                {/* Pulsante per la pagina successiva */}
                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                />
              </Pagination>
            </nav>
          </div>
        </Card.Body>
      </Card>
    </Container>
    </Container>
  );
}
