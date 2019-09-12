import googleMapConsts from "../constants";

export const googleMapActions = {
  setDefaultCenter(centerObj) {
    return { type: googleMapConsts.SET_DEFAULT_CENTER, payload: centerObj };
  },
  setCenter(centerObj) {
    return { type: googleMapConsts.SET_CENTER, payload: centerObj };
  },
  setMapInfo(mapInfo) {
    return { type: googleMapConsts.SET_MAP_INFO, payload: mapInfo };
  },
  setGoogleMapRef(map) {
    return { type: googleMapConsts.SET_GOOGLE_MAP_REF, payload: map };
  },
  pushRestaurant2List(restaurantLists) {
    return {
      type: googleMapConsts.PUSH_RESTAURANTS_TO_LIST,
      payload: restaurantLists
    };
  }
};
