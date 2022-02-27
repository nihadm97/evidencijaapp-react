import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom"

export const Korisnici = () => {
  const [stil, Postavi2]=useState("")
  axios.get('http://127.0.0.1:8000/username/').then((response) => {
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})

    let [lista, postavi] = useState([]);
    function evidencija(){
        axios.get('http://127.0.0.1:8000/korisnici/').then((response) => {
          let lista=[]; 
          for (var i=0; i < response.data.length; i++){
          if(response.data[i].fields.status=="Aktivan"){
          lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime, boja: "green"});}
          if(response.data[i].fields.status=="Nije aktivan"){
          lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime, boja: "red"});
          }
          if(response.data[i].fields.status=="Na bolovanju"){
          lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime, boja: "orange"});
          }
          if(response.data[i].fields.status=="Na odmoru"){
            lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime, boja: "yellow"});
          }   
        } postavi(lista); 
        }, (error) => {console.log(error)})
      }
    useEffect(() => {
      evidencija();
    }, [])
    console.log(lista);
    return (
        <div style={{margin: 120}}>
            <ul>
            {lista.map(obj  => 
            <li style={{backgroundColor: obj.boja, borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.ime + " " + obj.prezime}
            </li> )} </ul>
            <button style={{backgroundColor: stil, margin: 50}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/korisnici/forma">Dodaj korisnika</Link></button>
        </div>
    )
}

export default Korisnici