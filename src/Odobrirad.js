import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom"

export const Odobrirad = () => {
  const [stil, Postavi2]=useState("")
  axios.get('http://127.0.0.1:8000/username/').then((response) => {
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})

    let [lista, postavi] = useState([]);

    function evidencija(){
        axios.get('http://127.0.0.1:8000/radodkuce/').then((response) => {
          let lista=[]; 
          for (var i=0; i < response.data.length; i++){
          if(response.data[i].status == "Nije obrađeno"){
          lista.push({osoblje: response.data[i].osoblje, datum: response.data[i].datum, oblik: response.data[i].oblik});     }
        } postavi(lista); 
        }, (error) => {console.log(error)})
      console.log(lista);
      }
    useEffect(() => {
      evidencija();
    }, [])

    const [poruka, setPoruka] = useState("Nije obrađeno");
    
    return (
        <div style={{margin: 120}}>
            <ul>
            {lista.map(obj  => 
            <li style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', margin: 20, padding: 20}}>{obj.osoblje}<br></br>{obj.datum}<br></br>{obj.oblik}
            <div style={{marginTop: 20}}>  
               <input onClick={() => setPoruka("Odobreno")} checked={poruka === "Odobreno"} type="radio" name="Obrada" id="selection" style={{margin: 10 }}/> 
               <label htmlFor="selection">Odobri</label>
               <input onClick={() => setPoruka("Odbijeno")} checked={poruka === "Odbijeno"} type="radio" name="Obrada" id="selection" style={{margin: 10 }}/> 
               <label htmlFor="selection">Odbij</label> 
               </div> 
               <button style={{backgroundColor: stil}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/kuca">Potvrdi</Link></button>
            </li> )} </ul>
        </div>
    )
}

export default Odobrirad