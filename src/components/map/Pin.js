import React from "react";
import PropTypes from "prop-types";

const Pin = (
  address,
  name,
  numBikesAvailable,
  numDocksAvailable,
  stationId
) => {
  return (
    <div
      style={{
        display: "block",
        width: "10px",
        height: "10px",
        color: "red",
        backgroundColor: "red",
      }}
    ></div>
  );
};

Pin.propTypes = {
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numBikesAvailable: PropTypes.number.isRequired,
  numDocksAvailable: PropTypes.number.isRequired,
  stationId: PropTypes.string.isRequired,
};

export default Pin;
