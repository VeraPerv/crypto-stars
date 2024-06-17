const checkedContractorsButton = document.querySelector('#checked-users');

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
export const checkIsVerified = (element,contractor) => {
  if(!contractor.isVerified) {
    element.remove();
  }
};
const isEscapeKey = (evt) => evt.key === 'Escape';

export {hideElement,clearElementsContainer,createElement,showElement,changeActiveClass, checkIsVarified,isEscapeKey};

//,checkVerification
// const changeActiveClass = (element) => element.classList.toggle('is-active');
