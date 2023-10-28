import React, { Component } from "react";
import ZadatakDataService from "../../services/zadatak.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajZadatak extends Component {

  constructor(props) {
    super(props);
    this.DodajZadatak = this.dodajZadatak.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async dodajZadatak(zadatak) {
    const odgovor = await ZadatakDataService.post(zadatak);
    if(odgovor.ok){
      
      window.location.href='/zadatak';
    }else{
      
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podatci = new FormData(e.target);

    this.dodajZadatak({
      naziv: podatci.get('naziv'),
      
      sifra:podatci.get('sifra')
    });
    
  }


  render() { 
    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


          <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="" maxLength={255} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="sifra">
            <Form.Label>Sifra</Form.Label>
            <Form.Control type="text" name="sifra" placeholder="" />
          </Form.Group>

          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/naziv`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj zadatak
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}