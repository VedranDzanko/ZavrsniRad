import React, { Component } from "react";
import KategorijaDataService from "../../services/kategorija.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';


export default class Kategorija extends Component {
  constructor(props) {
    super(props);
    this.dohvatiKategoriju = this.dohvatiKategoriju.bind(this);

    this.state = {
      kategorija: [],
      prikaziModal: false,
      zatvoriUspjesnoModal: false
    };
  }



  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });
  otvoriUspjesnoModal = () => this.setState({ prikaziUspjesnoModal: true });
  zatvoriUspjesnoModal = () => this.setState({ prikaziUspjesnoModal: false });
  

  componentDidMount() {
    this.dohvatiKategoriju();
  }
  dohvatiKategoriju() {
    KategorijaDataService.getAll()
      .then(response => {
        this.setState({
          kategorija: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiKategoriju(sifra){
    
    const odgovor = await KategorijaDataService.delete(sifra);
    
    if(odgovor.ok){
     this.dohvatiKategoriju();
     this.otvoriUspjesnoModal();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const { kategorija} = this.state;

    return (

    <Container>
      <a href="/kategorija/dodaj" className="btn btn-success gumb">Dodaj novu kategoriju</a>
    <Row>
      { kategorija && kategorija.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.naslov}  </Card.Title>
                  
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/clanovi/${p.šifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiKategoriju(p.šifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>


      <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Kategoriju nije moguce obrisati jer je u zadatku!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>

           

            
      <Modal show={this.state.prikaziUspjesnoModal} onHide={this.zatvoriUspjesnoModal}>
              <Modal.Header closeButton>
                <Modal.Title>Uspješno brisanje</Modal.Title>
              </Modal.Header>
              <Modal.Body>Kategorija uspjesno obrisana!!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriUspjesnoModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}