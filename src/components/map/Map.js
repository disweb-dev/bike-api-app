import React from "react";
import GoogleMapReact from "google-map-react";

import Pin from "./Pin";

import mapStyle from "../../misc/mapStyle";

// FOR DEV ONLY
import stationsStatic from "../../misc/stationsStatic.json";
import availabilityStatic from "../../misc/availabilityStatic.json";

// TO BE MOVED TO WHERE DATA IS FETCHED
const combinedStationsAvailabilityData = (
  stations = stationsStatic.data.stations,
  availability = availabilityStatic.data.stations
) => {
  return stations.map((station, index) => {
    return { ...availability[index], ...station };
  });
};

const Map = () => {
  const pins = combinedStationsAvailabilityData().map(
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
