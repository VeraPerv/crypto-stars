import {TypeOfContractors} from './constance.js';
import {
  hideElement,
  clearElementsContainer,
  createElement,
  showElement,
  changeActiveClass,
  checkIsVerified
} from './utils.js';
import {map} from './map.js';
import {createMarkers} from './map.js';

const contractorsTable = document.querySelector('.users-list__table-body');
const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
const checkedContractorsButton = document.querySelector('#checked-users');

const sellButton = document.querySelector('#btn-sell');
const buyButton = document.querySelector('#btn-buy');


export const arrOfSellers = [];
export const arrOfBuyers = [];

// checkedContractorsButton.addEventListener('click',oncheckedContractorsButton);
const getArrayOfContractors = (arrOfAllContractors) => {
  //console.log(arrOfAllContractors)
  arrOfAllContractors.forEach((contractor) => {
    if (contractor.status === TypeOfContractors.SELLER) {
      arrOfSellers.push(contractor);
    } else {
      arrOfBuyers.push(contractor);
    }
  });
};

const fillContractorData = (element, contractor) => {
  const {
    userName,
    balance,
    exchangeRate,
    isVerified
  } = contractor;
  const verificationMark = element.querySelector('.users-list__svg');
  const contractorsName = element.querySelector('#user-name');
  const contractorsCurrency = element.querySelector('#currency');
  const contractorsExchangeRate = element.querySelector('#exchange-rate');
  hideElement(verificationMark);

  if (isVerified) {
    showElement(verificationMark);
  }

  contractorsName.textContent = userName;
  contractorsCurrency.textContent = balance.currency;
  contractorsExchangeRate.textContent = exchangeRate;
};


export const renderSellers = () => {
  const fragment = document.createDocumentFragment();
  arrOfSellers.forEach((contractor) => {
    const {
      paymentMethods,
      minAmount,
      exchangeRate,
      balance,
      id
    } = contractor;

    const row = tableRowTemplate.cloneNode(true);
    row.dataset.rowId = id;

    const contractorsCashLimit = row.querySelector('#cash-limit');
    /**ul где все названия банков в лишках */
    const paySystemsContainer = row.querySelector('#pay-system');

    fillContractorData(row, contractor);

    contractorsCashLimit.textContent = `${minAmount} ₽ - ${Math.round(exchangeRate * balance.amount)} ₽`;

    clearElementsContainer(paySystemsContainer);
    createElement(paySystemsContainer, paymentMethods, 'li', 'users-list__badges-item', 'badge');

    fragment.appendChild(row);
    contractorsTable.appendChild(fragment);

    if (checkedContractorsButton.checked) {
      checkIsVerified(row, contractor);
    }
  });
  createMarkers(arrOfSellers);
};

const renderBuyers = () => {
  //ПОКАЗ ЛИСТА БАЙЕРОВ
  arrOfBuyers.forEach((buyer) => {
    const {
      minAmount,
      balance,
      id
    } = buyer;
    const row = tableRowTemplate.cloneNode(true);
    row.dataset.rowId = id;
    const contractorsCashLimit = row.querySelector('#cash-limit');
    const paySystemsContainer = row.querySelector('#pay-system');
    clearElementsContainer(paySystemsContainer);

    contractorsCashLimit.textContent =
      `${minAmount} - ${balance.amount} ₽`;
    fillContractorData(row, buyer);
    contractorsTable.appendChild(row);

    if (checkedContractorsButton.checked) {
      checkIsVerified(row, buyer);
    }
  });
};

const oncheckedContractorsButton = () => {

  map.closePopup();
  clearElementsContainer(contractorsTable);
  if (sellButton.classList.contains('is-active')) {
    renderBuyers();
  } else {
    renderSellers();
  }
};

checkedContractorsButton.addEventListener('change', oncheckedContractorsButton);

// console.log(arrOfSellers)
// console.log(arrOfBuyers)

sellButton.addEventListener('click', () => {

  clearElementsContainer(contractorsTable);
  renderBuyers();
  changeActiveClass(sellButton, buyButton);
});

buyButton.addEventListener('click', () => {

  clearElementsContainer(contractorsTable);
  renderSellers();
  changeActiveClass(sellButton, buyButton);
});


export {getArrayOfContractors};
