
import { getData } from './api.js';
import { initForm } from './form.js';
import { setFilterChange } from './filter.js';
import {initMap, addMarkers } from './map.js';

const RERENDER_DELAY = 500;

getData((data) => {
  initMap();
  addMarkers(data);
  setFilterChange(_.debounce(
    () => addMarkers(data),
    RERENDER_DELAY,

  ));
});

initForm();

