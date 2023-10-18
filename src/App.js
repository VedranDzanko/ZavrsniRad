import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './components/nadzornaploca.component';
import Korisnici from './components/korisnik/korisnik.component';
import DodajKorisnika from './components/korisnik/dodajkorisnika.component';
import PromjeniKorisnika from './components/korisnik/promjenikorisnika.component';


export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
        <Route path='/smjerovi' element={<Smjerovi />} />
        <Route path="/smjerovi/dodaj" element={<DodajSmjer />} />
        <Route path="/smjerovi/:sifra" element={<PromjeniSmjer />} />
        <Route path="/polaznici" element={<Polaznici />} />
        <Route path="/polaznici/dodaj" element={<DodajPolaznik />} />
        <Route path="/polaznici/:sifra" element={<PromjeniPolaznik />} />
        <Route path="/grupe" element={<Grupe />} />
        <Route path="/grupe/dodaj" element={<DodajGrupa />} />
        <Route path="/grupe/:sifra" element={<PromjeniGrupa />} />
      </Routes>
     
    </Router>
  );
}
