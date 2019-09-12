import React, { useContext, useState } from "react";
import { GoogleMapContext } from "../contex";
import { Restaurant } from "./index";
import classNames from "classnames";
import {
  restaurantSortByRating,
  filterType,
  restaurantSortByPrice,
  restaurantSortByRatingNumber
} from "../lib";

// util func
const orderWithFilter = (filter, restaurantArr) => {
  switch (filter) {
    case filterType.RATING_NUMBER:
      return restaurantSortByRatingNumber(restaurantArr);
    case filterType.RATING:
      return restaurantSortByRating(restaurantArr);
    case filterType.PRICE:
      return restaurantSortByPrice(restaurantArr);
    case filterType.DEFAULT:
    default:
      return restaurantArr;
  }
};
// component
const FilterBar = ({ value, onChange }) => {
  const filterTypeArr = Object.keys(filterType);
  return (
    <div className="restaurant-list__filter">
      <div className="restaurant-list__filter--title">Filter By</div>
      <div className="restaurant-list__filter--options">
        {filterTypeArr.map(filter => {
          return (
            <span
              key={filter}
              onClick={() => onChange(filterType[filter])}
              className={classNames({
                "is-select": filterType[filter] === value
              })}
            >
              {filterType[filter]}
            </span>
          );
        })}
      </div>
    </div>
  );
};
const RestaurantList = () => {
  const [filter, setFilter] = useState(filterType.DEFAULT);
  const contex = useContext(GoogleMapContext);
  const { googleMapState } = contex;
  const { nearbyRestaurantsList } = googleMapState;
  const listsArr = orderWithFilter(filter, nearbyRestaurantsList);
  return (
    <div className="restaurant-list">
      <FilterBar value={filter} onChange={e => setFilter(e)}></FilterBar>
      {listsArr.map(restaurant => {
        return <Restaurant key={restaurant.id} data={restaurant}></Restaurant>;
      })}
    </div>
  );
};

export default RestaurantList;
