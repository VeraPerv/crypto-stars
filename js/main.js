import {getDataOfContractors,getDataOfUser} from './api.js';
import {getArrayOfContractors,renderSellers} from './filter-contractors.js';
import {fillUserDatum,userProfileContainer} from './user-profile.js';

import './modal.js';
//import './modal-buy-validation.js';
//import './modal-sell-validation.js';
import { hideElement,showElement } from './utils.js';
//import './messages.js';
const mainContainer = document.querySelector('#container-list');
const messageError = document.querySelector('#container-error');

getDataOfContractors()
  .then((allContractors) => {
    getArrayOfContractors(allContractors);
    renderSellers();
  })
  .catch(() => {
    hideElement(mainContainer);
    showElement(messageError);
    hideElement(userProfileContainer);
});
/*добавит catch c чем? посмотреть!*/

getDataOfUser()
  .then((user) => {
    fillUserDatum(user);
  })
  .catch(() => {
    hideElement(userProfileContainer);
  });

