import React, { Component } from "react";
import KorisnikDataService from "../../services/korisnik.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniKorisnika extends Component {

  constructor(props) {
    super(props);

    this.korisnik = this.dohvatiKorisnik();
    this.promjeniKorisnika = this.promjeniKorisnika.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      korisnik: {}
    };
  }


  async dohvatiKorisnika() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await KorisnikDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          korisnik: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniKorisnika(korisnik) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await KorisnikDataService.put(niz[niz.length-1],korisnik);
    if(odgovor.ok){
      window.location.href='/korisnik';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podatci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.promjeniKorisnika({
      ime: podatci.get('ime'),
      prezime: podatci.get('prezime'),
      lozinka: podatci.get('lozinka')
    });
    
  }


  render() {
    
    const {korisnik} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="ime" placeholder="Toni" maxLength={255} defaultValue={korisnik.ime} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="prezime" placeholder="Perić" defaultValue={korisnik.prezime}  required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="korisnicko_ime">
            <Form.Label>Korisnicko_ime</Form.Label>
            <Form.Control type="text" name="korisnicko_ime" placeholder="TM" defaultValue={korisnik.korisnicko_ime}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lozinka">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control type="text" name="lozinka" placeholder="" defaultValue={korisnik.lozinka}  />
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/korisnici`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni korisnika
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}