import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

const Obrisipredmet = () => {
  const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})

    const [lista, postavi] = useState([]);
    const [poruka, postaviPoruku] = useState("");
    const [predmet, setInput] = useState("");

    function predmeti(){
        axios.get('http://127.0.0.1:8000/predmeti/').then((response) => {
          let lista=[];
          for (var i=0; i < response.data.length; i++){
          lista.push(response.data[i].fields.ime);
        } postavi(lista);
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      predmeti();
    }, [])

    function login(){
        axios.post('http://127.0.0.1:8000/obrisipredmet/',{
          predmet: predmet,
        }).then((response) => {
          postaviPoruku(response.data);
          if(response.data=="Predmet je uspješno obrisan"){setTimeout(function() {
            window.open("/home/predmeti", "_self")
      }, 2000);}
        }, (error) => {console.log(error)})
    }

    return (
      <form>
      <div style = {{marginTop: 120, marginLeft: 120}}>
      <h2 style={{color: stil}}>Odaberite predmet koji želite obrisati:</h2>
      <p>{poruka}</p>
     <label className="form-control" htmlFor="predmet">Predmet:</label>
            <select className="form-control" id="predmet" name="predmet" value={predmet} onInput={e => setInput(e.target.value)}>
            {lista.map(obj  => 
            <option value={obj} selected={obj}>{obj}</option>
            )} </select>
      <button style={{color: "white", backgroundColor: stil, marginTop: 20}} type="submit" className="btn btn-default"  onClick = {login}>Obriši predmet</button>
      </div>
      </form>
    )
}

export default Obrisipredmet
