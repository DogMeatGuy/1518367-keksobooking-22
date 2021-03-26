const HousingMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const numberOfRooms = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

const HousungPriceValue = {
  MIDDLE: 'middle',
  LOW: 'low',
  HIGH: 'high',
};

const MapGeo = {
  LAT: 35.68950,
  LNG: 139.69171,
}

const IconSize = {
  WIDTH: 52,
  HEIGHT: 52,
};

const IconAnchor = {
  WIDTH: 26,
  HEIGHT: 52,
};

export { HousingMinPrice, HousungPriceValue, MapGeo, IconSize, IconAnchor, numberOfRooms };
