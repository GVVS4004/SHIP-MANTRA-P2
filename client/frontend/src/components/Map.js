import React, { useEffect, useState } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import io from "socket.io-client" ;
const socket = io.connect("http://localhost:5000");



const Map = withScriptjs(
  withGoogleMap((props) => {
    // useState to store the active client locations and the current client location.
    const [locations,setLocations]=useState([]);
    const [clientLocation, setClientLocation] = useState({ lat: null, lng: null });
    // handleMapClick function to which sets the location on the map when clicked on it
    const handleMapClick = (event) => {
      setClientLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      props.onLocationSelected({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    };
    // useEffect react hook to re render whenever there is a change in the socket dependency.
    useEffect(()=>{socket.on("active clients",(clients)=>{
      const locations=[]
      clients.map((client)=>{
        locations.push({id:client.client_id,latitude:client.location.latitude,longitude:client.location.longitude});
      })
      setLocations(locations);
    })},[socket]);

    


    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: 17.498155839056587, lng: 78.59267364028875 }} onClick={handleMapClick}>
        {/* Marker to mark the clients locations on the map */}
        {clientLocation.lat !== null && <Marker position={clientLocation} icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'/> }
        {locations.length!==0?locations.map((locate) => (
          locate.id===props.curClient?
          <Marker
            key={locate.id}
            position={{ lat:locate.latitude, lng: locate.longitude }}
            icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'
          />:<Marker 
          key={locate.id}
          position={{ lat: locate.latitude, lng: locate.longitude }}
          />
        )):""}
        
      </GoogleMap>
    );
  })
);

export default Map;


