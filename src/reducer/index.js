import googleMapConsts from "../constants";

export const GoogleMapInitState = {
  defaultCenter: undefined, // your gps location
  center: undefined, // currenet map center
  restaurantsList: [], // all queried before restaurnts
  nearbyRestaurantsList: [], // only the latest query restaurants
  mapInfo: undefined, // a Obj that is returned by google-map-react
  googleMapRef: undefined // map reference to google map
};

export const googleMapReducer = (state, action) => {
  switch (action.type) {
    case googleMapConsts.SET_DEFAULT_CENTER:
      return {
        ...state,
        defaultCenter: action.payload,
        center: action.payload
      };
    case googleMapConsts.SET_CENTER:
      return { ...state, center: action.payload };
    case googleMapConsts.SET_MAP_INFO:
      return {
        ...state,
        mapInfo: action.payload,
        center: action.payload.center
      };
    case googleMapConsts.SET_GOOGLE_MAP_REF:
      return { ...state, googleMapRef: action.payload };
    case googleMapConsts.PUSH_RESTAURANTS_TO_LIST:
      const newRestaurantArr = [];
      action.payload.forEach(newRestaurant => {
        const isExist =
          state.restaurantsList.filter(
            restaurant => newRestaurant.id === restaurant.id
          ).length > 0;
        if (!isExist) newRestaurantArr.push(newRestaurant);
      });
      return {
        ...state,
        restaurantsList: [...state.restaurantsList, ...newRestaurantArr],
        nearbyRestaurantsList: action.payload
      };
    default:
      return state;
  }
};
