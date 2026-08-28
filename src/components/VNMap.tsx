"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Map, { Source, Layer, MapRef, MapMouseEvent } from "react-map-gl/mapbox";
import bbox from "@turf/bbox";
import type { Feature, FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

import type { EventItem } from "@/types/event";

type VietnamMapProps = {
  selectedEvent: EventItem | null;
};

// Strip diacritics and lowercase
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Loose match: does the event's location text appear in (or contain)
// the province's name? Good enough for a demo, not geocoding-accurate.
function findMatchingProvince(
  features: Feature[],
  locationText: string
): Feature | undefined {
  const target = normalize(locationText);

  return features.find((feature) => {
    const provinceName = feature.properties?.TinhThanh as string | undefined;
    if (!provinceName) return false;

    const normalizedProvince = normalize(provinceName);
    return (
      normalizedProvince.includes(target) || target.includes(normalizedProvince)
    );
  });
}

export default function VietnamMap({ selectedEvent }: VietnamMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [provinceFeatures, setProvinceFeatures] = useState<Feature[]>([]);

  // Load the GeoJSON once on mount so we can search it in plain JS
  useEffect(() => {
    fetch("/data/provinces.geojson")
      .then((res) => res.json())
      .then((data: FeatureCollection) => setProvinceFeatures(data.features));
  }, []);

  const flyToFeature = useCallback((feature: Feature) => {
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);
    mapRef.current?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 40, duration: 800 }
    );
  }, []);

  const handleProvinceClick = useCallback(
    (e: MapMouseEvent) => {
      const feature = e.features?.[0];
      if (!feature) return;
      flyToFeature(feature);
    },
    [flyToFeature]
  );

  // React to selections coming from the side panel
  useEffect(() => {
    if (!selectedEvent || provinceFeatures.length === 0) return;

    const match = findMatchingProvince(provinceFeatures, selectedEvent.location);

    if (match) {
      flyToFeature(match);
    } else {
      console.warn(
        `No province match found for location: "${selectedEvent.location}"`
      );
    }
  }, [selectedEvent, provinceFeatures, flyToFeature]);

  return (
    <div className="h-full w-full">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        initialViewState={{
          longitude: 106.0,
          latitude: 16.5,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        interactiveLayerIds={["province-fills"]}
        onClick={handleProvinceClick}
        cursor="pointer"
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