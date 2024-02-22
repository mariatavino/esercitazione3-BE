import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import he from 'he';
import { token } from '../dati/dati'; // Importa il token per le chiamate API
import NavbarComponent from './NavbarComponent'; // Importa il componente NavbarComponent

export default function HomePostsComponent() {
    const [posts, setPosts] = useState([]); // Stato per memorizzare i post
    const [filteredPosts, setFilteredPosts] = useState([]); // Stato per memorizzare i post filtrati
    const [searchTerm, setSearchTerm] = useState(''); // Stato per memorizzare il termine di ricerca

    useEffect(() => {
        fetchPosts(); // Carica i post all'avvio del componente
    }, [])

    // Funzione per recuperare i post
    async function fetchPosts() {
        try {
            const response = await axios.get(token + 'posts?_embed'); // Effettua una chiamata API per ottenere i post
            setPosts(response.data); // Imposta i post nello stato
            setFilteredPosts(response.data); // Imposta i post filtrati allo stesso valore iniziale
        } catch (error) {
            console.error('Errore nella chiamata API per ottenere i post', error);
            setPosts([]); // Se c'è un errore, imposta i post a un array vuoto
            setFilteredPosts([]); // Se c'è un errore, imposta i post filtrati a un array vuoto
        }
    }

    // Funzione per convertire HTML in testo
    function htmlToText(htmlString) {
        return htmlString.replace(/<[^>]+>/g, ''); // Rimuove tutti i tag HTML
    }

    // Funzione per gestire il cambio nel campo di input di ricerca
    function handleSearchChange(event) {
        setSearchTerm(event.target.value); // Aggiorna lo stato searchTerm con il nuovo valore inserito dall'utente
    }

    // Funzione per gestire la ricerca dei post
    function handleSearch(searchQuery) {
        setSearchTerm(searchQuery); // Imposta lo stato searchTerm con il termine di ricerca
        // Filtra i post in base al termine di ricerca
        const filtered = posts.filter(post =>
            post.title.rendered.toLowerCase().includes(searchQuery.toLowerCase()) ||
            htmlToText(he.decode(post.excerpt.rendered)).toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered); // Imposta i post filtrati nello stato
    }

    return (
        <Container>
            <NavbarComponent handleSearch={handleSearch} /> {/* Passa la funzione di ricerca al componente NavbarComponent */}
            <div className="row py-5">
                {/* Mappa sui post filtrati e mostra ciascun post */}
                {filteredPosts.map(post => (
                    <div className="col-md-4 mb-4" key={post.id}>
                        <Card>
                            {/* Mostra l'immagine in primo piano del post se disponibile */}
                            {post._embedded && post._embedded['wp:featuredmedia'] && (
                                <Card.Img variant="top" src={post._embedded['wp:featuredmedia'][0].source_url} />
                            )}
                            <Card.Body>
                                {/* Titolo del post */}
                                <Card.Title>{post.title.rendered}</Card.Title>
                                {/* Estratto del post, convertito in testo */}
                                <Card.Text>
                                    {htmlToText(he.decode(post.excerpt.rendered))}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </Container>
    )
}
