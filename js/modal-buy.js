import {arrOfBuyers} from './filter-contractors.js';
import {getCurrentDatum,hideElement,showElement,Currency, isEscapeKey,hideSellSuccessErrorMessages } from './utils.js';
import{currentUser} from './user-profile.js';
import{onSellPaymentChange,onSellReceivingChange,pristine} from './modal-sell-validation.js';


const body = document.querySelector('body');
const modalSell = document.querySelector('.modal--sell');
const modalSellName = modalSell.querySelector('#modal-sell-name');
const modalSellExchangeRate = modalSell.querySelector('#transaction-sell-exchange');

const modalSellIcon = modalSell.querySelector('#transaction-sell-icon');
const modalSellLimit = modalSell.querySelector('#transaction-sell-limit');
const modalSellSelect = modalSell.querySelector('#modal-sell-select');
const modalSellCryptoWallet = modalSell.querySelector('#modal-sell-crypto-wallet');

const sellIdHiddenInput = modalSell.querySelector('#contractor-sell-id');
const sellExchangeRateHiddenInput = modalSell.querySelector('#exchange-rate-sell');
const sellSendingCurrencyHiddenInput = modalSell.querySelector('#sending-sell-currency');
const sellReceivingCurrencyHiddenInput = modalSell.querySelector('#receiving-sell-currency');

const modalSellForm = document.querySelector('.modal-sell');
const modalSellCloseBtn = modalSell.querySelector('.modal__close-btn');
const modalSellOverlay = modalSell.querySelector('.modal__overlay');
const modalSellBankCard = modalSell.querySelector('#modal-sell-bank-card');

const sellPaymentInput = modalSell.querySelector('#sell-payment');
const sellReceivingInput = modalSell.querySelector('#sell-receiving');
const currentDatumOfBuyer = [];
const currentPayMethodsSellModal = [];
const selectOptionModalSellArr = [...modalSellSelect.options];

const resetSellFormValidation = () => {
  hideSellSuccessErrorMessages();
  modalSellForm.reset();
  pristine.reset();
};

const onDocumentKeydownForSell = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(modalSell);
    resetSellFormValidation();
  }
};

const closeSellModal = () => {
  body.classList.remove('scroll-lock');
  hideElement(modalSell);
  document.removeEventListener('keydown',onDocumentKeydownForSell);
  modalSellOverlay.removeEventListener('click',closeSellModal);
  modalSellCloseBtn.removeEventListener('click',closeSellModal);
  resetSellFormValidation();
};

const openSellModal = () => {
  body.classList.add('scroll-lock');
  showElement(modalSell);
  document.addEventListener('keydown',onDocumentKeydownForSell);
  modalSellOverlay.addEventListener('click',closeSellModal);
  modalSellCloseBtn.addEventListener('click',closeSellModal);
};

const onModalSellSelectChange = (evt) => {
  hideSellSuccessErrorMessages();

  if(evt.target.value !== 'Cash in person') {
    const isNecessaryObj = currentPayMethodsSellModal.find((payObj) => payObj.provider === evt.target.value);
    modalSellBankCard.value = isNecessaryObj.accountNumber;
  } else {
    modalSellBankCard.value = '';
  }
};

const fillSelectOptionsSellModal = (arrOfOptions,arrOfMethods) => {
  currentPayMethodsSellModal.push(...arrOfMethods);

  arrOfOptions.forEach((option) => {
    const isNecessary = arrOfMethods.some((element) => option.value === element.provider);
    if(!isNecessary && option.value !== 'Выберите платёжную систему') {
      option.remove();
    }
  });
};

const fillBuyModal = (evt) => {
  const currentRow = evt.target.closest('.users-list__table-row');
  const currentDatum = arrOfBuyers.find(({id}) => id === currentRow.dataset.rowId);
  const user = currentUser[0];
  const {wallet,id:currentId,exchangeRate} = currentDatum;

  getCurrentDatum(currentDatum,currentDatumOfBuyer);
  hideElement(modalSellIcon);
  modalSellName.textContent = currentDatum.userName;
  modalSellExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
  modalSellLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
  if(currentDatum.isVerified) {
    showElement(modalSellIcon);
  }

  fillSelectOptionsSellModal(selectOptionModalSellArr,user.paymentMethods);
  modalSellCryptoWallet.value = wallet.address;
  sellIdHiddenInput.value = currentId;
  sellExchangeRateHiddenInput.value = exchangeRate;
  sellSendingCurrencyHiddenInput.value = Currency.KEKS;
  sellReceivingCurrencyHiddenInput.value = Currency.RUBLE;
};
sellPaymentInput.addEventListener('input',onSellPaymentChange);
sellReceivingInput.addEventListener('input',onSellReceivingChange);

modalSellSelect.addEventListener('change',onModalSellSelectChange);

export {currentDatumOfBuyer,openSellModal,fillBuyModal};
