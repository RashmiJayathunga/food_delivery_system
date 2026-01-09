import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DeliveryLocation.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const user = JSON.parse(localStorage.getItem("user"));

// AWS Location (from .env)
const AWS_REGION = import.meta.env.VITE_AWS_REGION;
const MAP_NAME = import.meta.env.VITE_AWS_MAP_NAME;
const API_KEY = import.meta.env.VITE_AWS_MAP_API_KEY;


// Store location
const STORE_COORDS = [79.965982, 6.912412]; // [lng, lat]

function DeliveryLocation() {
  const navigate = useNavigate();
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://maps.geo.${AWS_REGION}.amazonaws.com/maps/v0/maps/${MAP_NAME}/style-descriptor?key=${API_KEY}`,
      center: STORE_COORDS,
      zoom: 14,
    });

    mapRef.current.addControl(
      new maplibregl.NavigationControl(),
      "top-left"
    );

    // Store marker
    new maplibregl.Marker({ color: "orange" })
      .setLngLat(STORE_COORDS)
      .setPopup(new maplibregl.Popup().setText("Store Location"))
      .addTo(mapRef.current);

    // Click to select delivery location
    mapRef.current.on("click", (e) => {
      const coords = [e.lngLat.lng, e.lngLat.lat];

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new maplibregl.Marker({ color: "red" })
        .setLngLat(coords)
        .setPopup(new maplibregl.Popup().setText("Your Delivery Location"))
        .addTo(mapRef.current);

      setLocation(`${coords[1].toFixed(6)}, ${coords[0].toFixed(6)}`);
    });

    return () => mapRef.current.remove();
  }, []);

  // Use current location
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [
          position.coords.longitude,
          position.coords.latitude,
        ];

        mapRef.current.flyTo({ center: coords, zoom: 15 });

        if (markerRef.current) {
          markerRef.current.remove();
        }

        markerRef.current = new maplibregl.Marker({ color: "red" })
          .setLngLat(coords)
          .setPopup(new maplibregl.Popup().setText("Your Delivery Location"))
          .addTo(mapRef.current);

        setLocation(`${coords[1].toFixed(6)}, ${coords[0].toFixed(6)}`);
      },
      () => alert("Unable to fetch location")
    );
  };

  const handlePlaceOrder = () => {
    if (!location) {
      alert("Please select your delivery location!");
      return;
    }

    alert(`Order placed!\nDelivery location: ${location}`);
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">🍔</span>
          <span className="logo-text">
            Food <strong>Delivery</strong>
          </span>
        </div>
        <div className="auth-buttons">
          <span className="user-name">
            Hi, {user?.fullName || "Guest"}
          </span>
          <button onClick={() => navigate("/cart")}>
            ⬅ Back to Cart
          </button>
        </div>
      </header>

      <div className="delivery-page">
        <h1>Delivery Details</h1>

        <div className="delivery-card">
          <p>Select your delivery location:</p>

          <input
            type="text"
            value={location}
            readOnly
            placeholder="Click on map or use current location"
          />

          <div className="deliveryButton">
            <button onClick={handleCurrentLocation}>
              Use My Current Location
            </button>
            <button onClick={handlePlaceOrder}>Place Order</button>
            <button onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </div>

        <div
          ref={mapContainer}
          className="map-container"
        />
      </div>
    </>
  );
}

export default DeliveryLocation;
