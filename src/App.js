import React, { useReducer, useEffect } from "react";
import { GoogleMapContext } from "./contex";
import { googleMapReducer, GoogleMapInitState } from "./reducer";
import { googleMapService } from "./services";
import { googleMapActions } from "./actions";
import MainPage from "./entry/main";

function App() {
  const [googleMapState, googleMapDispatch] = useReducer(
    googleMapReducer,
    GoogleMapInitState
  );
  // get currenet gps location
  useEffect(() => {
    googleMapService
      .getCurrentGPSLocation()
      .then(data => {
        googleMapDispatch(
          googleMapActions.setDefaultCenter({
            lat: data.coords.latitude,
            lng: data.coords.longitude
          })
        );
      })
      .catch(err => alert(err.message));
  }, []);
  return (
    <div className="App">
      <GoogleMapContext.Provider value={{ googleMapState, googleMapDispatch }}>
        <MainPage></MainPage>
      </GoogleMapContext.Provider>
    </div>
  );
}

export default App;
