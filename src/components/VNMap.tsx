"use client";

import Map, { Source, Layer } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function VietnamMap() {
  return (
    <div className="h-full w-full">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        initialViewState={{
          longitude: 106.0,
          latitude: 16.5,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <Source id="provinces" type="geojson" data="/data/provinces.geojson">
          <Layer
            id="province-fills"
            type="fill"
            paint={{
              "fill-color": "#3a1015",
              "fill-opacity": 0.75,
            }}
          />
          <Layer
            id="province-borders"
            type="line"
            paint={{
              "line-color": "#f0c419",
              "line-width": 1,
            }}
          />
        </Source>
      </Map>
    </div>
  );
}