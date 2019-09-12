const googleMapService = {
  getCurrentGPSLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject({ message: "No GPS position" });
      }
    });
  },
  getAppropriateQueryRaius(nw, center) {
    return this.Km2Meters((nw.lat - center.lat) * this.KmPerLat);
  },
  queryNearbyRestaurant(mapInfo, mapref) {
    const request = {
      location: mapInfo.center,
      radius:
        this.getAppropriateQueryRaius(mapInfo.bounds.nw, mapInfo.center) ||
        "500",
      type: ["restaurant"]
    };
    const service = new window.google.maps.places.PlacesService(mapref);
    return new Promise((resolve, reject) => {
      const callback = (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject({
            message: `Search restaurant nearby Fail with status: ${status}`
          });
        }
      };
      service.nearbySearch(request, callback);
    });
  },
  defaultZoom: 17,
  KmPerLat: 110.574,
  KmPerLng(lat) {
    return 111.32 * Math.cos(lat);
  },
  Km2Meters(Km) {
    return 1000 * Km;
  }
};

export default googleMapService;
