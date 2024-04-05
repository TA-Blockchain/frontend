import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/assets/css/leaflet.css";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { LayersControl, MapContainer, Marker } from "react-leaflet";
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

import { getMarkerPosition } from "@/lib/helper";
import { DefaultIcon } from "./location-marker";

const { BaseLayer } = LayersControl;

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export default function ReadOnlyMap({ pickedLatlong }: { pickedLatlong: { lat: number; lng: number } }) {
  const [map, setMap] = useState<L.Map | undefined>(undefined);
  const { watch } = useFormContext();
  const markerPosition = getMarkerPosition(watch, pickedLatlong);

  const handleMapCreated = (map: L.Map) => {
    setMap(map);
  };

  // Move map if input is changing
  // TODO Optimize setView calling
  useEffect(() => {
    map?.setView(markerPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, markerPosition.lat, markerPosition.lng]);

  useEffect(() => {
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 200);
  }, []);

  return (
    <div className="space-y-2">
      <MapContainer
        className="min-h-[500px] w-full"
        zoom={14}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        center={pickedLatlong}
      >
        <LayersControl position="bottomleft" collapsed={false}>
          <BaseLayer name="Map">
            <ReactLeafletGoogleLayer googleMapsLoaderConf={{ apiKey }} />
          </BaseLayer>
          <BaseLayer checked name="Satellite">
            <ReactLeafletGoogleLayer googleMapsLoaderConf={{ apiKey }} />
          </BaseLayer>
        </LayersControl>
        <Marker position={markerPosition} icon={DefaultIcon}></Marker>;
      </MapContainer>
    </div>
  );
}
