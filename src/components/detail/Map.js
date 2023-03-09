import React, { useCallback, useEffect, useRef,useState } from "react";
import divisionData from "../../data/divisionData";
function Map({id}){
  const [map, setMap] = useState(null);
  const ref = useRef();
  
  useEffect(()=>{
      const newMap = new window.google.maps.Map(ref.current, {
          center : { lat:divisionData[id].lat, lng: divisionData[id].lon},
          zoom : 11,
      });
      const marker = new window.google.maps.Marker({
        position: { lat:divisionData[id].lat, lng: divisionData[id].lon},
        map: newMap,
      });     
      console.log(id)    
      setMap(newMap);
  },[])
    return (
      <div
        className="map"
        style={{ width: "100%", height: "100%" }}
        ref={ref}
      ></div>
    );
}

export default Map