
import { getData } from './api.js';
import { initForm } from './form.js';
import { initMap } from './map.js';


getData((data) => {
  initMap(data);
})

initForm();

