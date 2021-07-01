/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import GoogleMapReact from "google-map-react";
import { MapType } from "../../types";
import MapPin from "./MapPin";
import { numberStringUnformatter } from "../../utils/numberStringFormatter";

function Map({ height = "100%", width = "100%", ...props }: MapType) {
  const GoogleAPIKey = props.key || "AIzaSyC6munUy9XhZ5Z5frB4YmnrNvatlZJBytw";
  const minimalRevenueNumber = numberStringUnformatter(props.minimalRevenue);
  const isLowerRevenue = (revenue: number): boolean => {
    return revenue < minimalRevenueNumber;
  };
  return (
    <div style={{ height, width }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GoogleAPIKey,
        }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
      >
        {props.data.map((store) => {
          return (
            <MapPin
              lat={store.latitude}
              lng={store.longitude}
              text={store.name}
              key={store.name}
              lower={isLowerRevenue(store.revenue)}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default Map;
