
import {openBuyModal,fillSellModal} from './modal-sell.js';
import {openSellModal,fillBuyModal} from'./modal-buy.js';

const body = document.querySelector('body');
const sellButton = document.querySelector('#btn-sell');
const buyButton = document.querySelector('#btn-buy');

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

const onModalTableClick = (evt) => {
  const modalTableButton = evt.target.closest('.btn--greenborder');
  if(modalTableButton) {
    renderModal(evt);
  }
};

export {onModalTableClick};
