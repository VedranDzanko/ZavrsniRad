import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import Kategorija from './components/kategorija/kategorija.component';
import DodajKategoriju from './components/kategorija/dodajkategoriju.component';
import PromjeniKategoriju from './components/kategorija/promjenikategoriju.component';
import Korisnici from './components/korisnik/korisnici.component';
import DodajKorisnika from './components/korisnik/dodajkorisnika.component';
import PromjeniKorisnika from './components/korisnik/promjenikorisnika.component';
import Zadatak from './components/zadatak/zadatak.component';
import DodajZadatak from './components/zadatak/dodajzadatak.component';
import PromjeniZadatak from './components/zadatak/promjenizadatak.component';
import NadzornaPloca from './components/nadzornaploca.component';


export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        
        <Route path='/kategorija' element={<Kategorija />} />
        <Route path="/kategorija/dodaj" element={<DodajKategoriju />} />
        <Route path="/kategorija/:sifra" element={<PromjeniKategoriju />} />
        <Route path="/korisnici" element={<Korisnici />} />
        <Route path="/korisnici/dodaj" element={<DodajKorisnika />} />
        <Route path="/korisnici/:sifra" element={<PromjeniKorisnika />} />
        <Route path="/zadatak" element={<Zadatak />} />
        <Route path="/zadatak/dodaj" element={<DodajZadatak />} />
        <Route path="/zadatak/:sifra" element={<PromjeniZadatak />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca />} />
      </Routes>
     
    </Router>
  );
}
