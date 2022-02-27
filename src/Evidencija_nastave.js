import React from 'react'
import axios from "axios";
import {useState, useEffect} from "react";

const Evidencija = () => {
  const [stil, Postavi2]=useState("")
  axios.get('http://127.0.0.1:8000/username/').then((response) => {
      if(response.data[0].fields.stil=="Standardna") {Postavi2("#DB3D44");}
      if(response.data[0].fields.stil=="Tamna") {Postavi2("#000000");}
      if(response.data[0].fields.stil=="Svijetla") {Postavi2("#ffb6c1");}
      }, (error) => {console.log(error)})

    const [poruka, setPoruka] = useState('');
    let [lista, postavi] = useState([]);

    function predmeti(){
        axios.get('http://127.0.0.1:8000/osoblje1/').then((response) => {
          let lista=[];
          for (var i=0; i < response.data.length; i++){
          lista.push(response.data[i].ime);
        } postavi(lista);
        }, (error) => {console.log(error)})
      }

    useEffect(() => {
      predmeti();
    }, [])

    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0,10);
    const [predmet, setInput] = useState("Analiza 1");
    const [datum, setInput1] = useState('');
    const [oblik, setInput2] = useState('Predavanje');
    const [start, setInput3] = useState('');
    const [end, setInput4] = useState('');
    const [broj, setInput5] = useState('');

    function login(){
      axios.post('http://127.0.0.1:8000/evidencija/',{
        predmet: predmet,
        datum: datum,
        oblik: oblik,
        start: start,
        end: end,
        broj: broj
      }).then((response) => {
        setPoruka(response.data);
        if(response.data=="Upisana evidencija"){setTimeout(function() {
          window.open("/home/evidencija", "_self")
      }, 2000);}  
      }, (error) => {console.log(error)} )}

    return (
        <div className="container" style = {{marginTop: 80, marginLeft: 90}}>
        <h2 style={{color: stil}}>Evidencija održane nastave</h2><br></br>
        <form>
        <div className="form-group">
                <label className="form-control" htmlFor="predmet">Predmet:</label>
                <select className="form-control" id="predmet" name="predmet" 
                value={predmet} onInput={e => setInput(e.target.value)}>
                {lista.map(obj  => 
                <option value={obj} selected={obj}>{obj}</option>
                )} </select>
                </div>
                <div className="form-group">
                <label className="form-control" htmlFor="date">Datum:</label>
                <input type="date" defaultValue={date} className="form-control" id="date" 
                onInput={e => setInput1(e.target.value)} placeholder="Unesite datum" name="date" required />
                </div>
                <div className="form-group">
                <label className="form-control" htmlFor="oblik">Oblik nastave:</label>
                <select className="form-control" id="oblik" name="oblik" value={oblik} onInput={e => setInput2(e.target.value)}>
                    <option value="Predavanje">Predavanja</option>
                    <option value="Vježbe">Vježbe</option>
                    <option value="Predavanje i vježbe">Predavanja i vježbe</option>
                    <option value="Laboratorijske vježbe">Laboratorijske vježbe</option>
                    <option value="Auditorne vježbe">Auditorne vježbe</option>
                </select>
                </div>
                <div className="form-group">
                <label className="form-control" for="start">Unesite vrijeme početka časa:</label>
                <input type="time" className="form-control" id="start" name="start" value={start} 
                onInput={e => setInput3(e.target.value)}required />
                </div>
                <div className="form-group">
                <label className="form-control" htmlFor="end">Unesite vrijeme kraja časa:</label>
                <input type="time" className="form-control" id="end" name="end" value={end} 
                onInput={e => setInput4(e.target.value)}required />
                </div>
                <div className="form-group">
                <label className="form-control" htmlFor="attendance">Unesite broj prisutnih učenika:</label>
                <input type="number" className="form-control" id="attendance" value={broj} 
                onInput={e => setInput5(e.target.value)} name="attendance" required />
                </div>
                <button onClick = {login} style={{color: "white", backgroundColor: stil}} type="submit" className="btn btn-default" >Spasi</button>
                <p>{poruka}</p>
        </form>
        </div>
    )
}

export default Evidencija
