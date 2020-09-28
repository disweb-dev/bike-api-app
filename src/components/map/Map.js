import React, { useState, useEffect } from "react";
import axios from "axios"

import GoogleMapReact from "google-map-react";

import Pin from "./Pin";

import mapStyle from "../../misc/mapStyle";

const combinedStationsAvailabilityData = (
  stationsToFetch,
  availabilityToFetch
) => {
  console.log(stationsToFetch)
  return stationsToFetch.map((station, index) => {
    return { ...availabilityToFetch[index], ...station };
  });
};


const Map = () => {

  const [stations, setStations] = useState([])

  useEffect(async () => {
    const responseStations = await axios.get(`https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`)
    const responseAvailability = await axios.get(`https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`)

    const combinedStations = combinedStationsAvailabilityData(responseStations.data.data.stations, responseAvailability.data.data.stations)
    setStations(combinedStations)
  }, [])

  const pins = stations.map(
    (
      {
        address,
        name,
        lat,
        lon,
        num_bikes_available,
        num_docks_available,
        station_id,
      },
      index
    ) => {
      return (
        <Pin
          key={index}
          lat={lat}
          lng={lon}
          address={address}
          name={name}
          numBikesAvailable={num_bikes_available}
          numDocksAvailable={num_docks_available}
          stationId={station_id}
        />
      );
    }
  );

  const mapOptions = {
    styles: mapStyle,
  };

  return (
    <div style={{ height: "100vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{
          lat: parseFloat(process.env.REACT_APP_MAP_LAT),
          lng: parseFloat(process.env.REACT_APP_MAP_LNG),
        }}
        defaultZoom={parseInt(process.env.REACT_APP_MAP_ZOOM)}
        options={mapOptions}
      >
        {pins}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
