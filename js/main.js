/* global _:readonly */
'use strict';

import { getData } from './api.js';
import { initForm } from './form.js';
import { initMap } from './map.js';
import { initFilter } from './filter.js';


const init = (data) => {
  initMap(data);
  initFilter();
}

initForm();
getData(init);
