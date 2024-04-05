import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { GoogleProvider, SearchControl } from "leaflet-geosearch";
import { useFormContext } from "react-hook-form";
import { LayersControl, MapContainer } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

import { getMarkerPosition } from "@/lib/helper";
import { LocationMarker } from "./location-marker";
import { MapContext } from "./use-map";

const { BaseLayer } = LayersControl;

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export type LatLong = {
  lat: number;
  lng: number;
};

export default function Map({ children }: { children: React.ReactNode }) {
  const [map, setMap] = useState<L.Map | undefined>(undefined);

  const mapRef = useRef() as MutableRefObject<L.Map>;

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { watch } = useFormContext();
  const markerPosition = getMarkerPosition(watch);

  const handleMapCreated = (map: L.Map) => {
    setMap(map);

    if (map) {
      const provider = new GoogleProvider({
        apiKey,
        params: {
          key: "",
          language: "id",
          region: "id",
        },
      });

      map.addControl(
        // @ts-ignore
        new SearchControl({
          provider: provider,
          style: "bar",
          showMarker: false,
          showPopup: false,
          searchLabel: "Search (Won't work due to no API Key)",
        })
      );
    }
  };

  const handleUseCurrent = () => {
    if (mapRef) {
      mapRef.current?.locate();
    }
  };

  // Move map if input is changing
  // TODO Optimize setView calling
  useEffect(() => {
    if (isDragging) return;

    mapRef.current?.setView(markerPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, map, markerPosition.lat, markerPosition.lng]);

  const distance: string = ((mapRef.current?.distance(markerPosition, pickedLatlong) ?? 0) / 1000).toFixed(3);

  return (
    <MapContext.Provider value={{ handleUseCurrent }}>
      {children}
      <div className="space-y-2">
        <MapContainer
          className="h-80 w-full"
          zoom={14}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          center={pickedLatlong}
          ref={mapRef}
        >
          <LayersControl position="bottomleft" collapsed={false}>
            <BaseLayer name="Map">
              <ReactLeafletGoogleLayer googleMapsLoaderConf={{ apiKey }} />
            </BaseLayer>
            <BaseLayer checked name="Satellite">
              <ReactLeafletGoogleLayer googleMapsLoaderConf={{ apiKey }} />
            </BaseLayer>
          </LayersControl>
          <LocationMarker setIsDragging={setIsDragging} />
        </MapContainer>
        {/* <Button type="button" onClick={handleUseCurrent}>
          Use GPS location
        </Button> */}
        <div className="space-y-1">
          <p className="font-medium">Distance to Monas: {distance}km</p>
        </div>
      </div>
    </MapContext.Provider>
  );
}

// Monas latlong
const pickedLatlong: LatLong = {
  lat: -6.1754,
  lng: 106.8272,
};
