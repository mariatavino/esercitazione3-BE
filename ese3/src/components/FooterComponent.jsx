import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

export default function FooterComponent() {
  return (
    <footer className='bg-dark text-center text-lg-start text-light'>
      <section className='d-flex justify-content-center p-4 border-bottom'>
        <div className='d-flex '>
          <span className='me-3'>Connettiti ai nostri social networks:</span>
          <a href='https://www.facebook.com/' className='me-4 text-light'>
            <FaFacebookF color='secondary' />
          </a>
          <a href='https://twitter.com/' className='me-4 text-light'>
            <FaTwitter color='secondary' />
          </a>
          <a href='https://www.instagram.com/' className='me-4 text-light'>
            <FaInstagram color='secondary' />
          </a>
          <a href='https://www.linkedin.com/' className='me-4 text-light'>
            <FaLinkedin color='secondary' />
          </a>
        </div>
      </section>

      <section className=''>
        <Container className='text-center text-md-start mt-5'>
          <Row className='mt-3'>
            <Col md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Privacy</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Termini e condizioni
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Politica sulla privacy
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Cookie
                </a>
              </p>
            </Col>

            <Col md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Collaboriamo</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Guest Post
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Diventa Affiliato
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Lavora con noi
                </a>
              </p>
            </Col>
            <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contatti</h6>
              <p>
                <FaHome color='secondary' className='me-2' />
                New York, NY 10012, US
              </p>
              <p>
                <FaEnvelope color='secondary' className='me-3' />
                info@example.com
              </p>
              <p>
                <FaPhone color='secondary' className='me-3' /> + 01 234 567 88
              </p>
              <p>
                <FaPrint color='secondary' className='me-3' /> + 01 234 567 89
              </p>
            </Col>
          </Row>
          <Row className='text-center'>
            <Col className="mb-2">
              <Button
                className="footer-button mt-3"
                variant="secondary"
                style={{ fontWeight: "500" }}
              >
                Codice di Servizio
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mb-5 mt-2 copyright">
              © 1997-2022 NeWP, Inc.
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
}
