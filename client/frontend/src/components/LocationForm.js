import React, { useState,useEffect } from 'react';

import Map from './Map';
import io from "socket.io-client" ;
const socket = io.connect("http://localhost:5000");

const LocationForm = () => {
  const [lat, setLatitude] = useState("");
  const [lon, setLongitude] = useState("");
  const [curClient,setCurClient]=useState("")
  const handleLocationSelected = (selectedLocation) => {
    setLatitude(selectedLocation.lat);
    setLongitude(selectedLocation.lng);
  };
  
  useEffect(()=>{socket.on("active clients",(clients)=>{
    const locations=[]
    clients.map((client)=>{
      locations.push({id:client.client_id,latitude:client.location.latitude,longitude:client.location.longitude});
    })
  })},[socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the location to the server via the "send location" event.
    socket.emit("send location", { client_id:socket.id,latitude:lat, longitude:lon });
    setCurClient(socket.id);
    // Clear the form
    setLatitude("");
    setLongitude("");
  };
  return (
    <div>
      {/* form to submit the location details of a client */}
      <form onSubmit={handleSubmit}>
      <label>
        Latitude:
        <input type="number" value={lat} onChange={(e) => setLatitude(e.target.value)} />
      </label>
      <br />
      <label>
        Longitude:
        <input type="number" value={lon} onChange={(e) => setLongitude(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
      <h2>Enter a location:</h2>
      {/* Map component used to render a Google map and the markers on it. */}
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.SECRET_KEY}`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        onLocationSelected={handleLocationSelected}
        curClient={curClient}
      />
    </div>
  );
};

export default LocationForm;

