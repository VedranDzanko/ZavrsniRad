import React, { Component } from "react";
import ZadatakDataService from "../../services/zadatak.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromijeniZadatak extends Component {

  constructor(props) {
    super(props);

    this.zadatak = this.dohvatiZadatak();
    this.PromijeniZadatak= this.PromijeniZadatak.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      zadatak: {}
    };
  }


  async dohvatiZadatak() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
   await ZadatakDataService.getByID(niz[niz.length-1])
      .then(response => {
        this.setState({
          kategorija:response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async PromijeniZadatak(sifra, zadatak) {
    const odgovor =  await ZadatakDataService.put(sifra,zadatak);
    if(odgovor.ok){
      window.location.href='/zadatak';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }


  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
 

    this.PromijeniZadatak(podaci.get('sifra'),{
      naziv: podaci.get('naziv'),
     
    });
    
  }


  render() {
    
    const { zadatak} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        
        <Form.Group >
            <Form.Control type="text" name="sifra" defaultValue={zadatak.sifra} hidden/>
          </Form.Group>

        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="" maxLength={255} defaultValue={zadatak.naziv} required/>
          </Form.Group>



          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/zadatak`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promijeni zadatak
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}