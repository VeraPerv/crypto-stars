import {BASE_URL,Route,Method,ErrorText} from './constance.js';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        console.log('ноу респонс');
        throw new Error(errorText);
      }
      console.log('респонс');
      return response.json();
    })
    .catch(() => {
      console.log('кетч');
      throw new Error(errorText);
    });

const getDataOfContractors = () => load(Route.GET_DATA_CONTRACTORS, ErrorText.GET_DATA);

const getDataOfUser = () => load(Route.GET_DATA_USERS, ErrorText.GET_DATA);

export const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);
//,unBlockSubmitBtn
export {getDataOfContractors,getDataOfUser};
