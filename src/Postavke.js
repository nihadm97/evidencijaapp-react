import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom"

export const Postavke = () => {
   const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})

    let [lista, postavi] = useState([]);

    function evidencija(){
        axios.get('http://127.0.0.1:8000/postavke/').then((response) => {
          let lista=[]; 
          for (var i=0; i < response.data.length; i++){
          lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime,  
            korisničko_ime: response.data[i].fields.ime_korisnika, status: response.data[i].fields.status, oblik: response.data[i].fields.oblik});   
        } postavi(lista); 
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      evidencija();
    }, [])

    return (
        <div style={{marginTop: 100, marginLeft: 250,  width: "50%"}}>
          <h2 style={{color: stil, margin: 52}}>Osnovni podaci o korisniku</h2>
            {lista.map(obj  => 
            <ul>
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.ime}
            </li>
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.prezime}
            </li>
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.korisničko_ime}
            </li>
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.status}
            </li>
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.oblik}
            </li>
            </ul>
            )}
            <button style={{backgroundColor: stil, margin: 50}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/postavke/promjeni">Promijeni</Link></button>
        </div>
    )
}

export default Postavke