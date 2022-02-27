import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Registracija from "./Registracija";
import Header from "./Header"
import Prijava from "./Prijava";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Zaboravljena from './Zaboravljena_lozinka';
import Evidencija from './Evidencija_nastave';
import Evidencija_home from "./Evidencija_home";
import Kuca from './Rad_od_kuće';
import Prikaz_predmeta from './Prikaz_predmeta';
import Rad_home from './Rad_home';
import Odobrirad from './Odobrirad';
import Predmeti from './Predmeti';
import Obrisipredmet from './Obrisipredmet';
import DodajPredmet from './Dodajpredmet';
import Korisnici from "./Korisnici"
import Dodajkorisnika from './Dodajkorisnika';
import Stil from './Stil';
import Postavke from './Postavke';
import Postavkepromjeni from './Postavkepromjeni';

function App() {
  return (
<div className="container">
  <Router>
    <Route path="/home" ><Sidebar /></Route>
    <Route path="/home" ><Header /></Route>
    <Route exact path="/"><Prijava/></Route>
    <Route exact path="/registracija"><Registracija /></Route>
    <Route exact path="/home"><Home /></Route>
    <Route exact path="/home/Prikaz"><Prikaz_predmeta /></Route>
    <Route exact path="/zaboravljena"><Zaboravljena /></Route>
    <Route exact path="/home/evidencija/forma"><Evidencija /></Route>
    <Route exact path="/home/evidencija"><Evidencija_home /></Route>
    <Route exact path="/home/kuca/forma"><Kuca /></Route>
    <Route exact path="/home/kuca/odobri"><Odobrirad /></Route>
    <Route exact path="/home/kuca"><Rad_home /></Route>
    <Route exact path="/home/predmeti/obrisi"><Obrisipredmet /></Route>
    <Route exact path="/home/predmeti/dodaj"><DodajPredmet /></Route>
    <Route exact path="/home/predmeti"><Predmeti /></Route>
    <Route exact path="/home/korisnici/forma"><Dodajkorisnika /></Route>
    <Route exact path="/home/korisnici"><Korisnici /></Route>
    <Route exact path="/home/stil"><Stil /></Route>
    <Route exact path="/home/postavke/promjeni"><Postavkepromjeni /></Route>
    <Route exact path="/home/postavke"><Postavke /></Route>
  </Router>
</div>
  );
}

export default App;
