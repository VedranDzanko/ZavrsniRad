import React, { Component } from "react";
import TodolistaDataService from "../../services/todolista.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromijeniTodolistu extends Component {

  constructor(props) {
    super(props);

    this.kategorija = this.dohvatiTodolistu();
    this.PromijeniKategoriju= this.PromijeniTodolistu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      kategorija: {}
    };
  }


  async dohvatiKategoriju() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
   await KategorijaDataService.getByID(niz[niz.length-1])
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

  async PromijeniKategoriju(sifra, kategorija) {
    const odgovor =  await KategorijaDataService.put(sifra,kategorija);
    if(odgovor.ok){
      window.location.href='/kategorija';
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
 

    this.PromijeniKategoriju(podaci.get('sifra'),{
      naziv: podaci.get('naziv'),
     
    });
    
  }


  render() {
    
    const { kategorija} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>

        
        <Form.Group >
            <Form.Control type="text" name="sifra" defaultValue={kategorija.sifra} hidden/>
          </Form.Group>

        <Form.Group className="mb-3" controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" placeholder="" maxLength={255} defaultValue={kategorija.naziv} required/>
          </Form.Group>



          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/kategorija`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promijeni kategoriju
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}