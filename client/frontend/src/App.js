import io from "socket.io-client" ;
import './App.css';
import { useEffect } from "react";
import LocationForm from './components/LocationForm'
import {useState} from "react";
const socket = io.connect("http://localhost:5000");


function App() {
  const [clients,setClients]=useState([]);
  useEffect(()=>{socket.on("clients active",(clients)=>{
    setClients(clients);
  })},[socket]);

  return (
    <div className="App">
      <LocationForm />
      <div className="container"><ul>{clients!=null?clients.map((client)=>{
        return(<li key={client.client_id}>clientID: {client.client_id}  latitude : {client.location.latitude} longitude : {client.location.longitude}</li>)
      }):""}</ul></div>
    </div>
  );
}

export default App;
