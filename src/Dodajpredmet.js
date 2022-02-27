import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

const DodajPredmet = () => {
  const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})

    const [poruka, setPoruka] = useState('');
    let [lista, postavi1] = useState([]);
    const [predmet, setInput1] = useState('');
    const [profesor, setInput2] = useState('');
    const [asistent, setInput3] = useState('');

    function evidencija(){
      axios.get('http://127.0.0.1:8000/korisnici/').then((response) => {
        let lista=[];
        for (var i=0; i < response.data.length; i++){
          lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime});
      } postavi1(lista);
      }, (error) => {console.log(error)})
    }

    useEffect(() => {
      evidencija();
    }, [])

    function login(){
      if(predmet.length>0){
      axios.post('http://127.0.0.1:8000/dodajpredmet/',{
        predmet: predmet,
        profesor: profesor,
        asistent: asistent
      }).then((response) => {
        setPoruka(response.data);
        if(response.data=="Uspješno dodan predmet"){setTimeout(function() {
          window.open("/home/predmeti", "_self")
    }, 2000);}
      }, (error) => {console.log(error)})
    }}

    return (
    <div style = {{marginTop: 120, marginLeft: 120}}>
    <h2 style={{color: stil, marginTop: 40}}>Dodavanje predmeta:</h2>
    <p>{poruka}</p>
    <form>
    <div className="form-group">
      <label className="form-control" htmlFor="predmet">Ime predmeta:</label>
      <input type="text" className="form-control" id="predmet" value={predmet} onInput={e => setInput1(e.target.value)} placeholder="Unesite ime predmeta" name="predmet" required />
      <label className="form-control" style = {{marginTop: 20}} htmlFor="profesor">Odaberite profesora:</label>
        <select className="form-control" id="profesor" name="profesor" value={profesor} onInput={e => setInput2(e.target.value)}>
            {lista.map(obj  => <option value={obj.ime+" "+obj.prezime} selected={obj.ime+" "+obj.prezime}>{obj.ime+" "+obj.prezime}</option> )} </select>
        <label className="form-control" style = {{marginTop: 20}} htmlFor="asistent">Odaberite asistenta:</label>
            <select className="form-control" id="asistent" name="asistent" value={asistent} onInput={e => setInput3(e.target.value)}>
            {lista.map(obj  => <option value={obj.ime+" "+obj.prezime} selected={obj.ime+" "+obj.prezime}>{obj.ime+" "+obj.prezime}</option> )} </select>
        <button style={{marginTop: 20, backgroundColor: stil}} type="submit" className="btn btn-default" onClick = {login}><Link style={{color: "white"}} to="/home/predmeti/dodaj">Spasi</Link></button>
    </div>
    </form>
    </div>
    )
}

export default DodajPredmet
