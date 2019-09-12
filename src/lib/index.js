export const priceLevelSerch = level => {
  switch (level) {
    case 0:
      return "Free";
    case 1:
      return "Inexpensive";
    case 2:
      return "Moderate";
    case 3:
      return "Expensive";
    case 4:
      return "Very Expensive";
    default:
      return "NA";
  }
};

// retrun a new array in des order
export const restaurantSortByRating = (restaurantArr = []) => {
  return [...restaurantArr].sort((a, b) => {
    return (b.rating || 0) - (a.rating || 0);
  });
};

// retrun a new array in des order
export const restaurantSortByPrice = (restaurantArr = []) => {
  return [...restaurantArr].sort((a, b) => {
    return (b.price_level || 0) - (a.price_level || 0);
  });
};

// retrun a new array in des order
export const restaurantSortByRatingNumber = (restaurantArr = []) => {
  return [...restaurantArr].sort((a, b) => {
    return (b.user_ratings_total || 0) - (a.user_ratings_total || 0);
  });
};

export const filterType = {
  PRICE: "Price",
  RATING: "Rating",
  RATING_NUMBER: "Total Rating",
  DEFAULT: "None"
};

export const isNearByCurrenetCenter = (nearbyList, restaurant) => {
  return (
    nearbyList.filter(nearbyRestaurant => {
      return nearbyRestaurant.id === restaurant.id;
    }).length > 0
  );
};
