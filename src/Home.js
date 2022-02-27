//rafc i dodati export default Home
import React from 'react';
import axios from "axios";
import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from "react-router-dom";

export const Home = () => {
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
          lista.push({ predmet: response.data[i].predmet, start: response.data[i].start, oblik: response.data[i].oblik, weekday: response.data[i].weekday});
        } postavi(lista);
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      evidencija();
    }, [])

    return <div style={{margin: 120}}>
        {lista.map(obj  => 
            <ul style={{borderRadius: "10px", border: "solid lightgray 1px",  listStyleType: 'none', width: "30%", float: "left", margin: 12}}>
                <li style={{padding: 4}}>{obj.predmet}</li>
                <li style={{padding: 4}}>{obj.oblik}</li>
                <li style={{padding: 4}}>{obj.weekday}</li>
                <li style={{padding: 4}}>{obj.start.substring(0, 5)}</li>
            <button style={{backgroundColor: stil}} type="submit" className="btn btn-default" ><Link style={{color: "white"}} to="/home/Prikaz">Prikaz predmeta:</Link></button>
            </ul> )}
    </div>
        
}

export default Home
