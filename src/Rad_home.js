import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom"

export const Rad_home = () => {
  const [stil, Postavi2]=useState("")
  const [username, postaviUsername] = useState("")
  const [ime, postaviime] = useState("")
  function getusername(){
  axios.get('http://127.0.0.1:8000/username/').then((response) => {
      postaviUsername(response.data[0].fields.oblik);
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      postaviime(response.data[0].fields.ime+ " "+response.data[0].fields.prezime);
      }, (error) => {console.log(error)})}

    let [lista, postavi] = useState([]);
    let [lista1, postavi1] = useState([]);

    function evidencija(){
        axios.get('http://127.0.0.1:8000/radodkuce/').then((response) => {
          let lista=[]; 
          for (var i=0; i < response.data.length; i++){
          if(response.data[i].status == "Odobreno"){
          lista.push(response.data[i].osoblje);}
        } postavi(lista); 
        }, (error) => {console.log(error)})
      }

    axios.get('http://127.0.0.1:8000/radodkuce/').then((response) => {
          let lista1=[]; 
          for (var i=0; i < response.data.length; i++){
          if(response.data[i].osoblje == ime){
          if(response.data[i].status=="Odobreno"){
          lista1.push({datum: response.data[i].datum, oblik: response.data[i].oblik, boja: "green"});}
          if(response.data[i].status=="Odbijeno"){
          lista1.push({datum: response.data[i].datum, oblik: response.data[i].oblik, boja: "red"});} 
          }} postavi1(lista1); 
        }, (error) => {console.log(error)})

      useEffect(() => {
        getusername();
        evidencija();
      }, [])
    console.log(lista1)
    return (
        <div style={{margin: 120}}>
          {username == "Šef odsjeka" || username == "Dekan" ? <div><ul>
            {lista.map(obj  => 
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj}
            </li> )}
            </ul>
            <button style={{backgroundColor: stil, margin: 50}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/kuca/forma">Dodaj rad od kuće:</Link></button>
            <button style={{margin: 20, backgroundColor: stil}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/kuca/odobri">Odobri rad od kuće:</Link></button></div> : 
            <div><ul>
            {lista1.map(obj  => <div>
            <li style={{backgroundColor: obj.boja, borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 12, padding: 10}}>
               {obj.datum}<br></br>{obj.oblik}
            </li>
            </div>
             )} </ul>
            <button style={{backgroundColor: stil, margin: 50}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/kuca/forma">Dodaj rad od kuće:</Link></button></div>}
        </div>
    )
}
export default Rad_home