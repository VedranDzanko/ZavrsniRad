import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajKorisnika extends Component {

  constructor(props) {
    super(props);
    this.dodajKorisnika = this.dodajKorisnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async dodajKorisnika(korisnik) {
    const odgovor = await KorisnikDataService.post(korisnik);
    if(odgovor.ok){
      // routing na smjerovi
      window.location.href='/korisnici';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podatci = new FormData(e.target);

    this.dodajKorisnik({
      ime: podatci.get('ime'),
      prezime: podatci.get('prezime'),
      korisnicko_ime: podatci.get('korisnicko_ime'),
      lozinka:podatci.get('lozinka')
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" placeholder="Toni" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" placeholder="Perić" required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="korisnicko_ime">
            <Form.Label>Korisnicko_ime</Form.Label>
            <Form.Control type="text" name="korisnicko_ime" placeholder="TP" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lozinka">
            <Form.Label>lozinka</Form.Label>
            <Form.Control type="text" name="lozinka" placeholder=""/>
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/korisnici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj korisnika
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}