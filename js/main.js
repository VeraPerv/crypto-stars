import {getDataOfContractors,getDataOfUser} from './api.js';
import {getArrayOfContractors,renderSellers} from './filter-contractors.js';
//import './user-profile.js';
import {TypeOfContractors} from './constance.js';
import {fillUserDatum} from './user-profile.js';
//import './map.js';
import './modal.js';
import './validation.js';


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
