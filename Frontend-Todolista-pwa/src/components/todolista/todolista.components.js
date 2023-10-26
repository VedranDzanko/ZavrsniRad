import React, { Component } from "react";
import TodolistaDataService from "../../services/todolista.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';


export default class Todolista extends Component {
  constructor(props) {
    super(props);
    this.dohvatiTodolistu = this.dohvatiTodolistu.bind(this);

    this.state = {
      todolista: [],
      prikaziModal: false,
      zatvoriUspjesnoModal: false
    };
  }



  otvoriModal = () => this.setState({ prikaziModal: true });
  zatvoriModal = () => this.setState({ prikaziModal: false });
  otvoriUspjesnoModal = () => this.setState({ prikaziUspjesnoModal: true });
  zatvoriUspjesnoModal = () => this.setState({ prikaziUspjesnoModal: false });
  

  componentDidMount() {
    this.dohvatiTodolistu();
  }
  dohvatiTodolistu() {
    TodolistaDataService.getAll()
      .then(response => {
        this.setState({
          todolista: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async obrisiTodolistu(sifra){
    
    const odgovor = await TodolistaDataService.delete(sifra);
    
    if(odgovor.ok){
     this.dohvatiTodolistu();
     this.otvoriUspjesnoModal();
    }else{
     // alert(odgovor.poruka);
      this.otvoriModal();
    }
    
   }

  render() {
    const {todolista} = this.state;

    return (

    <Container>
      <a href="/todolista/dodaj" className="btn btn-success gumb">Dodaj novu TodoListu</a>
    <Row>
      { todolista && todolista.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.naslov}  </Card.Title>
                  
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/naziv/${p.šifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiTodolistu(p.šifra)}><FaTrash /></Button>
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
              <Modal.Body>TodoListu nije moguće obrisati jer je u zadatku!</Modal.Body>
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
              <Modal.Body>TodoLista uspješno obrisana!!</Modal.Body>
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