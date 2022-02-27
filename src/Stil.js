import React from 'react'
import {useState} from "react";
import axios from "axios";

const Stil = () => {
  const [stil, Postavi2]=useState("")
    axios.get('http://127.0.0.1:8000/username/').then((response) => {
        if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
        if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
        if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
        }, (error) => {console.log(error)})

    const [oblik, setInput2] = useState('Standardna');

    function login(){
      axios.post('http://127.0.0.1:8000/stil/',{
        oblik: oblik,
      }).then((response) => {
        console.log(response)
      }, (error) => {console.log(error)} )}
    console.log(oblik);

    return (
    <div className="container" style = {{marginTop: 120, marginLeft: 90}}>
    <h2 style={{color: stil}}>Uređivanja stila stranice</h2><br></br>
    <form action="">
        <label className="form-control" htmlFor="oblik">Odaberite stil stranice:</label>
        <select className="form-control" id="oblik" name="oblik" value={oblik} onInput={e => setInput2(e.target.value)}>
            <option value="Standardna">Standardna</option>
            <option value="Tamna">Tamna</option>
            <option value="Svijetla">Svijetla</option>
        </select>
        <button onClick = {login} style={{color: "white", backgroundColor: stil, marginTop:20}} type="submit" className="btn btn-default" >Potvrdi</button>
    </form>
    </div>
    )
}

export default Stil