
import {openBuyModal,fillSellModal} from './modal-sell.js';
import {openSellModal,fillBuyModal} from'./modal-buy.js';


const modalTable = document.querySelector('.users-list__table-body');


const body = document.querySelector('body');


const sellButton = document.querySelector('#btn-sell');
const buyButton = document.querySelector('#btn-buy');

const userFiatBalance = document.querySelector('#user-fiat-balance');

//console.log(modalBuyExchangeRate.textContent)
const renderModal = (evt) => {
  body.classList.add('scroll-lock');/**добавила */
  if (buyButton.classList.contains('is-active')) {
    openBuyModal();
    fillSellModal(evt);
  }
  if (sellButton.classList.contains('is-active')) {
    openSellModal();
    fillBuyModal(evt);
  }
};

// const onBaloonCardClick = (evt) => {
//   const baloonButton = evt.target.closest('.user-card__change-btn');
//   if(baloonButton) {
//     console.log('балун кнопка')
//   }
// }

const onModalTableClick = (evt) => {
  const modalTableButton = evt.target.closest('.btn--greenborder');
  if(modalTableButton) {
    renderModal(evt);
  }
};


modalTable.addEventListener('click',onModalTableClick);

const onModalBuyChangeAllBtnClick = () => {
  // const userBalanceElement = document.querySelector('#userFiatBalance');
  /**никуда не перенесла, т.к. обмен всего */
  // buyPaymentInput.value = userFiatBalance.textContent;
  // buyReceivingInput.value = (buyPaymentInput.value / modalBuyExchangeRate.textContent);

    /**никуда не перенесла, т.к. обмен всего */
  // pristineBuyForm.pristine.validate(pointsElement);
  // pristineBuyForm.pristine.validate(paymentElement);
};
