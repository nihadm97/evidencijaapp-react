import React from 'react'
import {useState, useEffect} from "react";
import axios from "axios";

const Dodajkorisnika = () => {
    const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})

    const [poruka, setPoruka] = useState('');
    let [lista, postavi] = useState([]);

    function predmeti(){
        axios.get('http://127.0.0.1:8000/osoblje/').then((response) => {
          let lista=[];
          for (var i=0; i < response.data.length; i++){
          lista.push(response.data[i].fields.profesor);
          lista.push(response.data[i].fields.asistent);
        } 
        postavi(lista); 
        }, 
        (error) => {console.log(error)})
        }

    useEffect(() => {
      predmeti();
    }, [])

    const [ime, setInput] = useState('');
    const [prezime, setInput1] = useState('');
    const [oblik, setInput2] = useState('');

    function login(){
      if(ime.length>0 && prezime.length>0){
      axios.post('http://127.0.0.1:8000/upisikorisnika/',{
        ime: ime,
        prezime: prezime,
        oblik: oblik,
      }).then((response) => {
        setPoruka(response.data);
        if(response.data=="Uspješno dodan korisnik"){setTimeout(function() {
          window.open("/home/korisnici", "_self")
    }, 2000);}
      }, (error) => {console.log(error)} )}}
    
    return (
    <div className="container" style = {{marginTop: 120, marginLeft: 90}}>
    <h2 style={{color: stil}}>Forma za dodavanje korisnika</h2><br></br>
    <p>{poruka}</p>
    <form>
    <div className="form-group">
        <label className="form-control" htmlFor="ime">Ime:</label>
        <input className="form-control" id="ime" name="ime" value={ime} onInput={e => setInput(e.target.value)} required />
        <label className="form-control" style={{marginTop: 20}} htmlFor="prezime">Prezime:</label>
        <input className="form-control" id="prezime" name="prezime" value={prezime} onInput={e => setInput1(e.target.value)} required />
        <label className="form-control" style={{marginTop: 20}} htmlFor="oblik">Zvanje:</label>
        <select className="form-control" id="oblik" name="oblik" value={oblik} onInput={e => setInput2(e.target.value)}>
            <option value="Dekan">Dekan</option>
            <option value="Šef odsjeka">Šef odsjeka</option>
            <option value="Profesor">Profesor</option>
            <option value="Asistent">Asistent</option>
        </select>
        <button type="submit" onClick={login} style={{marginTop:20, color: "white", backgroundColor: stil}} className="btn btn-default" >Potvrdi</button>
    </div>
    </form>
    </div>
    )
}

export default Dodajkorisnika
