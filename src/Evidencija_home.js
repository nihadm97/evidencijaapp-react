import React from 'react'
import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';

export const Evidencija_home = () => {
    const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})
    let [lista, postavi] = useState([]);

    function evidencija(){
        axios.get('http://127.0.0.1:8000/pocetna/').then((response) => {
          let lista=[]; 
          for (var i=0; i < response.data.length; i++){
          lista.push({ predmet: response.data[i].predmet, start: response.data[i].start, oblik: response.data[i].oblik, end: response.data[i].end, broj: response.data[i].broj});
        } postavi(lista);
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      evidencija();
    }, [])

    return (
      <div style={{margin: 120}}>
            {lista.map(obj  => 
            <ul style={{border: "solid lightgray 1px",  listStyleType: 'none',  borderRadius: "10px"}}>
                <li  style={{padding: 5}}>{"Predmet: " + obj.predmet}</li>
                <li style={{padding: 5}}>{"Oblik nastave: " + obj.oblik}</li>
                <li style={{padding: 5}}>{"Početak časa: " + obj.start.substring(0, 5)}</li>
                <li style={{padding: 5}}>{"Kraj časa: " + obj.end.substring(0, 5)}</li>
                <li style={{padding: 5}}>{"Broj prisutnih učenika: " + obj.broj}</li>
            </ul> )}
        <button className="btn btn-default" style={{color: "white", backgroundColor: stil}} type="submit">
        <Link to="/home/evidencija/forma" style= {{color: "white"}}>Dodaj evidenciju</Link></button><br></br>
      </div>
    )
}
export default Evidencija_home