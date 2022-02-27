import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom"

export const Predmeti = () => {
  const [stil, Postavi2]=useState("")
  const [username, Postavi]=useState("")
  axios.get('http://127.0.0.1:8000/username/').then((response) => {
      Postavi(response.data[0].fields.oblik)
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})

    let [lista1, postavi1] = useState([]);
    function evidencija(){
        axios.get('http://127.0.0.1:8000/osoblje1/').then((response) => {
          let lista1=[];
          for (var i=0; i < response.data.length; i++){
            lista1.push({ predmet: response.data[i].ime, profesor: response.data[i].profesor, asistent: response.data[i].asistent});
        } postavi1(lista1);
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      evidencija();
    }, [])

    let [list, postav] = useState([]);
    return (
        <div style={{margin:120}}>
            {lista1.map(obj  => 
            <ul style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12}}>
                <li style={{padding: 4}}>{"Predmet: " + obj.predmet}</li>
                <li style={{padding: 4}}>{"Profesor: " + obj.profesor}</li>
                <li style={{padding: 4}}>{"Asistent: " + obj.asistent}</li>
            </ul>
            )}
            {username == "Šef odsjeka" ? <div>
            <button style={{backgroundColor: stil, margin: 12}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/predmeti/obrisi">Obriši predmet:</Link></button>
            <button style={{margin: 12, backgroundColor: stil}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/predmeti/dodaj">Dodaj predmet:</Link></button></div> : ""}
        </div>
    )
}

export default Predmeti