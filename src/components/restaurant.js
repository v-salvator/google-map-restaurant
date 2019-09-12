import React from "react";
import { priceLevelSerch, filterType } from "../lib";

const Label = ({ title, value }) => {
  return (
    <div className="restaurant__detail--label">
      <span>{`${title}:`}</span>
      <span>{value}</span>
    </div>
  );
};
const RestaurantImage = ({ url }) => {
  return (
    <div
      className="restaurant__image"
      style={{
        backgroundImage: `url(${url}})`
      }}
    ></div>
  );
};
const Restaurant = props => {
  const { data } = props;
  return (
    <div className="restaurant">
      <RestaurantImage
        url={data.photos ? data.photos[0].getUrl() : ""}
      ></RestaurantImage>
      <div className="restaurant__detail">
        <div className="restaurant__detail--title">{data.name}</div>
        <div className="restaurant__detail--info">
          <Label
            title={filterType.PRICE}
            value={priceLevelSerch(data.price_level)}
          ></Label>
          <Label title={filterType.RATING} value={data.rating}></Label>
          <Label
            title={filterType.RATING_NUMBER}
            value={data.user_ratings_total}
          ></Label>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
