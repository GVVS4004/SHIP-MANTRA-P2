import io from "socket.io-client" ;
import './App.css';
import { useEffect } from "react";
import LocationForm from './components/LocationForm'
import {useState} from "react";
const socket = io.connect("http://localhost:5000");


function App() {
  const [clients,setClients]=useState([]);
  useEffect(()=>{socket.on("active clients",(clients)=>{
    setClients(clients);
  })},[socket]);
    const [tabCount, setTabCount] = useState(1);
  
    const handleOpenTab = () => {
      // Open a new tab with a dynamic title
      var newWin=window.open("http://localhost:3000", "_blank");
      // Increment the tab count
      setTabCount(tabCount + 1);
    };
    
  
  return (
    <div className="App">
      <h1>Client</h1>
      <button onClick={handleOpenTab} style={{marginLeft:"70%",display:"block"}}>Open New Tab</button>

      <LocationForm />

      <div className="container"><ul>{clients!=null?clients.map((client)=>{
        return(<li key={client.client_id}>clientID: {client.client_id}  latitude : {client.location.latitude} longitude : {client.location.longitude}</li>)
      }):""}</ul></div>
    </div>
  );
}

export default App;
