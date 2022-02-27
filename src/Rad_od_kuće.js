import React from 'react'
import {useState, useEffect} from "react";
import axios from "axios";

const Kuca = () => {
  const [stil, Postavi2]=useState("")
  let [username, postaviUsername] = useState("")
  let [ime, postaviIme] = useState("")
  axios.get('http://127.0.0.1:8000/username/').then((response) => {
      postaviUsername(response.data[0].fields.oblik);
      if(username != "Šef odsjeka" && username != "Dekan") {setInput(ime)}
      postaviIme(response.data[0].fields.ime + " " + response.data[0].fields.prezime);
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})

    const [poruka, setPoruka] = useState('');
    let [lista, postavi] = useState([]);

    function predmeti(){
        axios.get('http://127.0.0.1:8000/korisnici/').then((response) => {
          let lista=[];
          for (var i=0; i < response.data.length; i++){
          lista.push({ime: response.data[i].fields.ime, prezime: response.data[i].fields.prezime});
        } postavi(lista); 
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      predmeti();
    }, [])

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);

    const [osoblje, setInput] = useState('');
    const [datum, setInput1] = useState('');
    const [oblik, setInput2] = useState('');

    function login(){
      axios.post('http://127.0.0.1:8000/kuca/',{
        osoblje: osoblje,
        datum: datum,
        oblik: oblik,
      }).then((response) => {
        setPoruka(response.data);
        if(response.data=="Uspješno poslan zahtjev za rad od kuće"){setTimeout(function() {
          window.open("/home/kuca", "_self")
    }, 2000);}
      }, (error) => {console.log(error)} )}
    console.log(osoblje);
    return (
      <div className="container" style = {{marginTop: 120, marginLeft: 90}}>
      <h2 style={{color: stil}}>Forma za dodavanje rada od kuće</h2><br></br>
      <p>{poruka}</p>
      <form action="">
      <div className="form-group">
      {username == "Šef odsjeka" ? <div>
      <label className="form-control" htmlFor="osoblje">Osoblje:</label>
      <select className="form-control" id="osoblje" name="osoblje" value={osoblje} onInput={e => setInput(e.target.value)}>
        {lista.map(obj  => 
        <option value={obj.ime+" "+obj.prezime} selected={obj.ime+" "+obj.prezime}>{obj.ime+" "+obj.prezime}</option>
        )} </select></div> : ""}
      </div>
      <div className="form-group">
      <label className="form-control" htmlFor="date">Datum:</label>
      <input type="date" defaultValue={date} className="form-control" id="date" onInput={e => setInput1(e.target.value)} placeholder="Unesite datum" name="date"  required />
      </div>
      <div className="form-group">
      <label className="form-control" htmlFor="oblik">Oblik nastave:</label>
      <select className="form-control" id="oblik" name="oblik" value={oblik} onInput={e => setInput2(e.target.value)}>
            <option value="Priprema ispita">Priprema ispita</option>
            <option value="Ispravljanje ispita">Ispravljanje ispita</option>
            <option value="NI rad">NI rad</option>
            <option value="Disertacija">Rad na disertaciji</option>
            <option value="Online konsultacija">Online konsultacije</option>
            <option value="Ostalo">Ostalo</option>
      </select>
      </div>
      <button onClick = {login} style={{color: "white", backgroundColor: stil}} type="submit" className="btn btn-default" >Potvrdi</button>
      </form>
      </div>
    )
}

export default Kuca
