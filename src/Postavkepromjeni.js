import React from 'react';
import axios from "axios";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export const Postavkepromjeni = () => {
    const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})

    const [poruka, setPoruka] = useState('');
    const [sifra, setInput] = useState('');
    const [sifra1, setInput1] = useState('');
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    function login(){
        axios.post('http://127.0.0.1:8000/urediprofil/',{
          ime: ime,
          prezime: prezime,
          sifra: sifra,
          sifra1: sifra1
        }).then((response) => {
            setPoruka(response.data);
        if(response.data=="Uspješno spremljene promjene"){setTimeout(function() {
          window.open("/postavke", "_self")
    }, 2000);}
        else {setTimeout(function() {
          document.location.reload()
    }, 2000);}
      }, (error) => {console.log(error)} )}
    return (
        <div>
            <form>
      <div id="forma" style = {{marginTop: 120, marginLeft: 120}}>
      <h2 style={{color: stil}}>Promjena korisničkih informacija:</h2>
      <p>{poruka}</p>
      <div className="form-group">
      <label htmlFor="ime">Novo ime:</label>
      <input type="text" className="form-control" id="ime" value={ime} onInput={e => setIme(e.target.value)} placeholder="Unesite novo ime" name="ime" required />
      </div>
      <div className="form-group">
      <label htmlFor="prezime">Novo prezime:</label>
      <input type="text" className="form-control" id="prezime" value={prezime} onInput={e => setPrezime(e.target.value)} placeholder="Unesite novo prezime" name="prezime" required />
      </div>
      <div className="form-group">
      <label htmlFor="sifra">Password:</label>
      <input type="password" className="form-control" id="sifra" value={sifra} onInput={e => setInput(e.target.value)} placeholder="Unesite novi password" name="sifra" required />
      </div>
      <div className="form-group">
      <label htmlFor="sifra1">Potvrdite password:</label>
      <input type="password" className="form-control" id="sifra1" value={sifra1} onInput={e => setInput1(e.target.value)} placeholder="Unesite ponove novi password" name="sifra1" required />
      </div>
      <button style={{backgroundColor: stil, color: "white"}} className="btn btn-default" onClick = {login}>Spasi</button>
      </div>
      </form>
        </div>
    )
}
export default Postavkepromjeni