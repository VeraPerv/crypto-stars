import {getDataOfContractors,getDataOfUser} from './api.js';
import {getArrayOfContractors,renderSellers} from './filter-contractors.js';
import {fillUserDatum,userProfileContainer} from './user-profile.js';
import { onModalTableClick } from './modal.js';
import { hideElement,showElement } from './utils.js';

const mainContainer = document.querySelector('#container-list');
const messageError = document.querySelector('#container-error');
const modalTable = document.querySelector('.users-list__table-body');

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


getDataOfUser()
  .then((user) => {
    fillUserDatum(user);
  })
  .catch(() => {
    hideElement(userProfileContainer);
  });

modalTable.addEventListener('click',onModalTableClick);
