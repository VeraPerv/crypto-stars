const modalSell = document.querySelector('.modal--sell');
const modalValidationSellMessageError = modalSell.querySelector('.modal__validation-message--error');
const modalValidationSellMessageSuccess = modalSell.querySelector('.modal__validation-message--success');
const modalBuy = document.querySelector('.modal--buy');
const modalValidationMessageSuccess = modalBuy.querySelector('.modal__validation-message--success');
const modalValidationMessageError = modalBuy.querySelector('.modal__validation-message--error');

const hideElement = (element) => {
  element.style = 'display:none';
};

const showElement = (element) => {
  element.style = 'display:inherit';
};

const changeActiveClass = (element,toggleElement) => {
  element.classList.toggle('is-active');
  toggleElement.classList.toggle('is-active');
};

const clearElementsContainer = (element) => {
  element.innerHTML = '';
};

const createElement = (container,arrOfPayments,element,...rest) => {
  const fragment = document.createDocumentFragment();
  arrOfPayments.forEach(({provider}) => {
    const paymentListItem = document.createElement(element);
    paymentListItem.classList.add(...rest);
    paymentListItem.textContent = provider;
    fragment.append(paymentListItem);
  });
  container.appendChild(fragment);
};

const checkIsVarified = (element, user) => {
  if (!user.isVerified) {
    element.remove();
  }
};
const checkIsVerified = (element,contractor) => {
  if(!contractor.isVerified) {
    element.remove();
  }
};
const isEscapeKey = (evt) => evt.key === 'Escape';

const getCurrentDatum = (datum,arr) => {
  arr.length = 0;
  arr.push(datum);
};

const Currency = {
  KEKS: 'KEKS',
  RUBLE: 'RUB',
};

const hideSellSuccessErrorMessages = () => {
  hideElement(modalValidationSellMessageError);
  hideElement(modalValidationSellMessageSuccess);
};

const hideSuccessErrorMessages = () => {
  hideElement(modalValidationMessageError);
  hideElement(modalValidationMessageSuccess);
};

export {hideElement,clearElementsContainer,createElement,showElement,changeActiveClass, checkIsVarified,isEscapeKey,hideSellSuccessErrorMessages, hideSuccessErrorMessages,getCurrentDatum,Currency,checkIsVerified };
