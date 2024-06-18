import {getDataOfContractors,getDataOfUser} from './api.js';
import {getArrayOfContractors,renderSellers} from './filter-contractors.js';
import {fillUserDatum} from './user-profile.js';

import './modal.js';
import './modal-buy-validation.js';
import './modal-sell-validation.js';


getDataOfContractors()
  .then((allContractors) => {
    getArrayOfContractors(allContractors);
    renderSellers();
});
/*добавит catch c чем? посмотреть!*/

getDataOfUser()
  .then((user) => {
    fillUserDatum(user);
})

// getDataOfContractors()
//   .then((allContractors) => {
//   console.log(allContractors);
// })

console.log(L)
