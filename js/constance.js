const BASE_URL = 'https://cryptostar.grading.htmlacademy.pro';

const Route = {
  GET_DATA_USERS: '/user',
  GET_DATA_CONTRACTORS: '/contractors',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: 'Не удалось отправить данные'
};

const TypeOfContractors = {
  BUYER: 'buyer',
  SELLER: 'seller'
};

const errorMessage = {
  KEKS: 'Не менее одного кекса',
  PASSWORD: 'Неверный пароль',
  PAYCARD: 'Выберите способ оплаты'
};

const PASSWORD = '180712';

export {BASE_URL,Route,Method,ErrorText,TypeOfContractors,errorMessage,PASSWORD};
