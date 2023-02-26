import GoogleMapReact from 'google-map-react';
import React, { useCallback, useEffect, useRef } from "react";
function Map(){
    const mapRef = useRef(null);

    const initMap = useCallback(() => {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: 38.195610, lng: 127.773835 },
        zoom: 9,
      });
    }, [mapRef]);
  
    useEffect(() => {
      initMap();
    }, [initMap]);
  
    return (
      <div
        className="map"
        style={{ width: "350px", height: "170px" }}
        ref={mapRef}
      ></div>
    );
}

export default Map