import React, {Component} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Container } from 'semantic-ui-react'

const mapStyles = {
  width: '90%',
  height: '90%',
};

const EventMap = props => {  
  return(
    <div>
      {
        props.data.length > 0 && props.data[0].lat !== '' ?
          <Map
            google={props.google}
            zoom={8}
            style={mapStyles}
            initialCenter={{ lat: props.data[0].lat, lng: props.data[0].long}}
          >
            {/* {() => this.displayMarkers()} */}
            {/* <Marker position={{ lat: 48.00, lng: -122.00}} /> */}
            {
              props.data.map((data, i) => {
                return <Marker key={i} id={i} position={{
                  lat: data.lat,
                  lng: data.long
                }}
                onClick={() => props.onClick(i, data)} 
                label={data.name}
                ></Marker>
              })
            }
          </Map>
        : null
      }
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAZAMH3V01G3WxbAHjw8SmCrrnHzuEns6E'
})(EventMap);