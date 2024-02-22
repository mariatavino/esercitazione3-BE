// Aggiorna il tuo componente NavbarComponent per includere un campo di input per la ricerca
// NavbarComponent.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaBars, FaSearch } from 'react-icons/fa';

export default function NavbarComponent({ handleSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  }

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='font-weight-bold'>
          <img src='https://icon-library.com/images/icon-for-blog/icon-for-blog-28.jpg' alt='Logo' width={60} className='me-2' />
          EPIPRESS
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Collapse id='navbarSupportedContent' className='justify-content-between mb-1'>
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to='/blog'>
                Blog
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <InputGroup className='flex-basis'>
            <FormControl type='search' placeholder='Search' aria-label='Search' onChange={handleInputChange} value={searchQuery} />
            <Button variant='dark' onClick={handleSearchClick}><FaSearch /></Button>
          </InputGroup>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
