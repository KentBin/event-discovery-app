"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapGL, { Source, Layer, MapRef, MapMouseEvent } from "react-map-gl/mapbox";
import bbox from "@turf/bbox";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point } from "@turf/helpers";
import type { Feature, FeatureCollection, Point, Polygon, MultiPolygon } from "geojson";
import type { GeoJSONSource } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { events, type EventItem } from "@/types/event";

type VietnamMapProps = {
  selectedEvent: EventItem | null;
};

const INITIAL_VIEW = { longitude: 106.0, latitude: 16.5, zoom: 5 };

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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

// Pick random coordinates that actually fall inside the polygon
function randomPointsInPolygon(
  feature: Feature,
  count: number
): [number, number][] {
  const [minLng, minLat, maxLng, maxLat] = bbox(feature);
  const results: [number, number][] = [];
  let attempts = 0;
  const maxAttempts = count * 300;

  while (results.length < count && attempts < maxAttempts) {
    attempts++;
    const lng = minLng + Math.random() * (maxLng - minLng);
    const lat = minLat + Math.random() * (maxLat - minLat);
    const candidate = point([lng, lat]);

    if (booleanPointInPolygon(candidate, feature as Feature<Polygon | MultiPolygon>)) {
      results.push([lng, lat]);
    }
  }

  // Pad thin province with whatever we found so we never crash
  while (results.length < count && results.length > 0) {
    results.push(results[0]);
  }

  return results;
}

// Group events by their matched province, then scatter each group's
// points across that province's real shape
function buildEventPoints(
  provinceFeatures: Feature[],
  eventList: EventItem[]
): FeatureCollection<Point> {
  const groups = new Map<string, { province: Feature; items: EventItem[] }>();

  eventList.forEach((event) => {
    const province = findMatchingProvince(provinceFeatures, event.location);
    if (!province) {
      console.warn(`No province match for event pin: "${event.location}"`);
      return;
    }
    const key = String(province.properties?.Ma);
    const group = groups.get(key);
    if (group) {
      group.items.push(event);
    } else {
      groups.set(key, { province, items: [event] });
    }
  });

  const pointFeatures: Feature<Point>[] = [];

  groups.forEach(({ province, items }) => {
    const coords = randomPointsInPolygon(province, items.length);
    items.forEach((event, i) => {
      pointFeatures.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: coords[i] },
        properties: {
          eventId: event.id,
          title: event.title,
        },
      });
    });
  });

  return { type: "FeatureCollection", features: pointFeatures };
}

export default function VietnamMap({ selectedEvent }: VietnamMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [provinceFeatures, setProvinceFeatures] = useState<Feature[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetch("/data/provinces.geojson")
      .then((res) => res.json())
      .then((data: FeatureCollection) => setProvinceFeatures(data.features));
  }, []);

  // Recomputed whenever the province shapes finish loading
  const eventPoints = useMemo(
    () => buildEventPoints(provinceFeatures, events),
    [provinceFeatures]
  );

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

  const applyHighlight = useCallback(
    (id: string | null) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      provinceFeatures.forEach((feature) => {
        const featureId = feature.properties?.Ma as string | undefined;
        if (!featureId) return;

        map.setFeatureState(
          { source: "provinces", id: featureId },
          {
            selected: featureId === id,
            dimmed: id !== null && featureId !== id,
          }
        );
      });
    },
    [provinceFeatures]
  );

  useEffect(() => {
    applyHighlight(selectedProvinceId);
  }, [selectedProvinceId, applyHighlight]);

  const handleProvinceClick = useCallback(
    (e: MapMouseEvent) => {
      // Only treat this as a province click-to-zoom if we didn't hit a pin
      const hitMarker = e.features?.some(
        (f) => f.layer?.id !== "province-fills"
      );
      if (hitMarker) return;

      const feature = e.features?.[0];
      if (!feature) return;
      setSelectedProvinceId(String(feature.properties?.Ma));
      flyToFeature(feature);
    },
    [flyToFeature]
  );

  // Clicking a cluster bubble zooms in until it splits apart
  const handleClusterClick = useCallback((e: MapMouseEvent) => {
    const feature = e.features?.[0];
    const map = mapRef.current?.getMap();
    if (!feature || !map) return;

    const clusterId = feature.properties?.cluster_id;
    const source = map.getSource("event-points") as GeoJSONSource;

    source.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !feature.geometry || feature.geometry.type !== "Point") return;
      map.easeTo({
        center: feature.geometry.coordinates as [number, number],
        zoom: zoom ?? map.getZoom() + 2,
        duration: 500,
      });
    });
  }, []);

  useEffect(() => {
    if (!selectedEvent) {
      setSelectedProvinceId(null);
      mapRef.current?.flyTo({
        center: [INITIAL_VIEW.longitude, INITIAL_VIEW.latitude],
        zoom: INITIAL_VIEW.zoom,
        duration: 800,
      });
      return;
    }

    if (provinceFeatures.length === 0) return;

    const match = findMatchingProvince(provinceFeatures, selectedEvent.location);
    if (match) {
      setSelectedProvinceId(String(match.properties?.Ma));
      flyToFeature(match);
    } else {
      console.warn(
        `No province match found for location: "${selectedEvent.location}"`
      );
    }
  }, [selectedEvent, provinceFeatures, flyToFeature]);

  return (
    <div className="h-full w-full">
      <MapGL
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        initialViewState={INITIAL_VIEW}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        interactiveLayerIds={["province-fills", "clusters", "unclustered-point"]}
        onClick={(e) => {
          const clusterHit = e.features?.find((f) => f.layer?.id === "clusters");
          if (clusterHit) {
            handleClusterClick(e);
            return;
          }
          handleProvinceClick(e);
        }}
        cursor="pointer"
      >
        <Source
          id="provinces"
          type="geojson"
          data="/data/provinces.geojson"
          promoteId="Ma"
        >
          <Layer
            id="province-fills"
            type="fill"
            paint={{
              "fill-color": "#3a1015",
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "selected"], false],
                0.9,
                ["boolean", ["feature-state", "dimmed"], false],
                0.05,
                0.75,
              ],
            }}
          />
          <Layer
            id="province-borders"
            type="line"
            paint={{
              "line-color": "#f0c419",
              "line-width": [
                "case",
                ["boolean", ["feature-state", "selected"], false],
                2,
                1,
              ],
              "line-opacity": [
                "case",
                ["boolean", ["feature-state", "dimmed"], false],
                0.1,
                1,
              ],
            }}
          />
        </Source>

        <Source
          id="event-points"
          type="geojson"
          data={eventPoints}
          cluster={true}
          clusterMaxZoom={9}
          clusterRadius={35}
        >
          {/* Cluster bubbles (2+ nearby events) */}
          <Layer
            id="clusters"
            type="circle"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "#e2572b",
              "circle-radius": ["step", ["get", "point_count"], 16, 5, 20, 10, 26],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#101214",
            }}
          />
          {/* Number label on top of each cluster bubble */}
          <Layer
            id="cluster-count"
            type="symbol"
            filter={["has", "point_count"]}
            layout={{
              "text-field": ["get", "point_count_abbreviated"],
              "text-size": 13,
              "text-font": ["DIN Pro Bold", "Arial Unicode MS Bold"],
            }}
            paint={{ "text-color": "#ffffff" }}
          />
          {/* Individual event pins (not part of a cluster) */}
          <Layer
            id="unclustered-point"
            type="circle"
            filter={["!", ["has", "point_count"]]}
            paint={{
              "circle-color": "#f0c419",
              "circle-radius": 7,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#101214",
            }}
          />
        </Source>
      </MapGL>
    </div>
  );
}