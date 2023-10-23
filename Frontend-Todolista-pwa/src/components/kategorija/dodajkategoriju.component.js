import React, { Component } from "react";
import KategorijaDataService from "../../services/kategorija.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class DodajKategoriju extends Component {

  constructor(props) {
    super(props);
    this.DodajKategoriju = this.dodajKategoriju.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async dodajKategoriju(kategorija) {
    const odgovor = await KategorijaDataService.post(kategorija);
    if(odgovor.ok){
      
      window.location.href='/kategorija';
    }else{
      
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    e.preventDefault();
    const podatci = new FormData(e.target);

    this.dodajKategoriju({
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
              <Link className="btn btn-danger gumb" to={`/kategorija`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Dodaj kategoriju
            </Button>
            </Col>
          </Row>
         
          
        </Form>


      
    </Container>
    );
  }
}