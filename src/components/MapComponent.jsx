import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Set default icon for markers (Leaflet's marker icon requires manual setup)
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
// });

const MapComponent = ({ profile }) => {
  return (
    <MapContainer
      center={[profile.lat, profile.lng]}
      zoom={15}
      style={{ height: "400px", width: "100%", borderRadius: "10px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[profile.lat, profile.lng]}>
        <Popup>
          <h1 className=" font-semibold">{profile.name}</h1>
          <h1 className="text-xs">{profile.description}</h1>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
