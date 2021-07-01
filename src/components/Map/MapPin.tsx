import React from "react";
import { PinnedMapType } from "../../types";
import markerBlue from "../../assets/images/marker-blue.png";
import markerRed from "../../assets/images/marker-red.png";

export default function MapPin({ text, lower = false }: PinnedMapType) {
  const isLower = lower ? markerRed : markerBlue;
  return (
    <div>
      <img src={isLower} alt={text} />
    </div>
  );
}
