import {hideElement, showElement, isEscapeKey} from './utils.js';
import{currentUser} from './user-profile.js';

import {arrOfSellers,arrOfBuyers} from './filter-contractors.js';
import{onBuyPaymentChange,onReceivingChange} from './modal-buy-validation.js';
import{onSellPaymentChange,onSellReceivingChange} from './modal-sell-validation.js';
console.log(currentUser)
const modalTable = document.querySelector('.users-list__table-body');


const body = document.querySelector('body');


const sellButton = document.querySelector('#btn-sell');
const buyButton = document.querySelector('#btn-buy');
const modalSell = document.querySelector('.modal--sell');
const modalBuy = document.querySelector('.modal--buy');


const userFiatBalance = document.querySelector('#user-fiat-balance');

const modalSellCloseBtn = modalSell.querySelector('.modal__close-btn');
const modalBuyCloseBtn = modalBuy.querySelector('.modal__close-btn');


const modalSellOverlay = modalSell.querySelector('.modal__overlay');
const modalBuyOverlay = modalBuy.querySelector('.modal__overlay');

const modalValidationMessageError = modalBuy.querySelector('.modal__validation-message--error');

const modalValidationMessageSuccess = modalBuy.querySelector('.modal__validation-message--success');

const modalValidationSellMessageError = modalSell.querySelector('.modal__validation-message--error');

const modalValidationSellMessageSuccess = modalSell.querySelector('.modal__validation-message--success');

const modalSellName = modalSell.querySelector('#modal-sell-name');
const modalBuyName = modalBuy.querySelector('#modal-buy-name');
const modalSellExchangeRate = modalSell.querySelector('#transaction-sell-exchange');
const modalBuyExchangeRate = modalBuy.querySelector('#transaction-buy-exchange');

const modalSellLimit = modalSell.querySelector('#transaction-sell-limit');
const modalBuyLimit = modalBuy.querySelector('#transaction-buy-limit');
const modalSellIcon = modalSell.querySelector('#transaction-sell-icon');
const modalBuyIcon = modalBuy.querySelector('#transaction-buy-icon');

const buyIdHiddenInput = modalBuy.querySelector('#contractor-id');
const sellIdHiddenInput = modalSell.querySelector('#contractor-sell-id');
console.log(sellIdHiddenInput)

// buyExchangeRateHiddenInput.value = exchangeRate;
// buySendingCurrencyHiddenInput.value = Currency.RUBLE;
// buyReceivingCurrencyHiddenInput.value = Currency.KEKS;

const buyPaymentInput = modalBuy.querySelector('#buy-payment');
const buyReceivingInput = modalBuy.querySelector('#buy-receiving');

const sellPaymentInput = modalSell.querySelector('#sell-payment');
const sellReceivingInput = modalSell.querySelector('#sell-receiving');

console.log(sellPaymentInput)
console.log(sellReceivingInput)


const buyExchangeRateHiddenInput = modalBuy.querySelector('#exchange-rate');
const sellExchangeRateHiddenInput = modalSell.querySelector('#exchange-rate-sell');
console.log(sellExchangeRateHiddenInput)

const buySendingCurrencyHiddenInput = modalBuy.querySelector('#sending-currency');


const sellSendingCurrencyHiddenInput = modalSell.querySelector('#sending-sell-currency');
console.log(sellSendingCurrencyHiddenInput)
const buyReceivingCurrencyHiddenInput = modalBuy.querySelector('#receiving-currency');
const sellReceivingCurrencyHiddenInput = modalSell.querySelector('#receiving-sell-currency');

console.log(sellReceivingCurrencyHiddenInput)


const modalBuyBankCard = modalBuy.querySelector('#modal-buy-bank-card');
const modalSellBankCard = modalSell.querySelector('#modal-sell-bank-card');
const modalBuySelect = modalBuy.querySelector('#modal-buy-select');

const modalBuyCryptoWallet = modalBuy.querySelector('#modal-buy-crypto-wallet');
console.log(modalBuyCryptoWallet)

const modalSellSelect = modalSell.querySelector('#modal-sell-select');

const Currency = {
  KEKS: 'KEKS',
  RUBLE: 'RUB',
};

const currentPayMethods = [];
const currentPayMethodsSellModal = [];

const selectOptionsArr = [...modalBuySelect.options];
const selectOptionModalSellArr = [...modalSellSelect.options];


const onModalBuySelectChange = (evt) => {

  hideElement(modalValidationMessageSuccess);
  hideElement(modalValidationMessageError);
  if(evt.target.value !== 'Cash in person') {
    const isNecessaryObj = currentPayMethods.find((payObj) => payObj.provider === evt.target.value);
    modalBuyBankCard.value = isNecessaryObj.accountNumber;
  } else {
    modalBuyBankCard.value = '';
  }
};

const onModalSellSelectChange = (evt) => {

  hideElement(modalValidationSellMessageError);
  hideElement(modalValidationSellMessageSuccess);

  if(evt.target.value !== 'Cash in person') {
    const isNecessaryObj = currentPayMethodsSellModal.find((payObj) => payObj.provider === evt.target.value);
    modalSellBankCard.value = isNecessaryObj.accountNumber;
  } else {
    modalSellBankCard.value = '';
  }
};

modalBuySelect.addEventListener('change',onModalBuySelectChange);
modalSellSelect.addEventListener('change',onModalSellSelectChange);

const fillSelectOptions = (arrOfOptions,arrOfMethods) => {
  currentPayMethods.length = 0;
  currentPayMethods.push(...arrOfMethods);
  arrOfOptions.forEach((option) => {
    const isNecessary = arrOfMethods.some((element) => option.value === element.provider);
    if(!isNecessary && option.value !== 'Выберите платёжную систему') {
      option.remove();
    }
  });
};

const fillcryptoWallet = (datum,inputRow) => {
  inputRow.value = datum.wallet.address;
};

const currentDatumOfSeller = [];
const currentDatumOfBuyer = [];
console.log()

const getCurrentDatum = (datum,arr) => {
  arr.length = 0;
  arr.push(datum);
  console.log(datum)
};

const fillSellModal = (evt) => {
  const currentRow = evt.target.closest('.users-list__table-row');
  const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
  getCurrentDatum(currentDatum,currentDatumOfSeller);
  //console.log(currentDatum)
  const {paymentMethods,exchangeRate,id:currentId,userName,minAmount,balance,isVerified} = currentDatum;

    //console.log(currentDatum)
  // console.log(paymentMethods)
  // console.log(currentRow)
  //fillModalBuyBankCard(paymentMethods)

  fillSelectOptions(selectOptionsArr,paymentMethods);

  modalBuyCryptoWallet.value = currentUser[0].wallet.address;

  fillcryptoWallet(currentUser[0],modalBuyCryptoWallet)

  hideElement(modalBuyIcon);

  modalBuyName.textContent = userName;
  modalBuyExchangeRate.textContent = `${exchangeRate} ₽`;
  modalBuyLimit.textContent = `${minAmount} ₽ - ${Math.round(exchangeRate * balance.amount)} ₽`;
  if(isVerified) {
    showElement(modalBuyIcon);
  }
  buyIdHiddenInput.value = currentId;
  buyExchangeRateHiddenInput.value = exchangeRate;
  buySendingCurrencyHiddenInput.value = Currency.RUBLE;
  buyReceivingCurrencyHiddenInput.value = Currency.KEKS;
};

const fillSelectOptionsSellModal = (arrOfOptions,arrOfMethods) => {
  currentPayMethodsSellModal.push(...arrOfMethods);
  // console.log(currentPayMethodsSellModal)
  // console.log(arrOfMethods)
  arrOfOptions.forEach((option) => {
    const isNecessary = arrOfMethods.some((element) => option.value === element.provider);
    if(!isNecessary && option.value !== 'Выберите платёжную систему') {
      option.remove();
    }
  });
};
const modalSellCryptoWallet = modalSell.querySelector('#modal-sell-crypto-wallet');

const fillBuyModal = (evt) => {
  const currentRow = evt.target.closest('.users-list__table-row');
  const currentDatum = arrOfBuyers.find(({id}) => id === currentRow.dataset.rowId);
  getCurrentDatum(currentDatum,currentDatumOfBuyer);
  const {wallet,id:currentId,exchangeRate} = currentDatum;
  // console.log(currentDatum)
  // console.log(wallet)
  // console.log(currentUser[0])
  // console.log(currentRow)
  hideElement(modalSellIcon)
  modalSellName.textContent = currentDatum.userName;
  modalSellExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
  modalSellLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
  if(currentDatum.isVerified) {
    showElement(modalSellIcon);
  }

  fillSelectOptionsSellModal(selectOptionModalSellArr,currentUser[0].paymentMethods)
  modalSellCryptoWallet.value = wallet.address;
  console.log(currentUser[0])

  sellIdHiddenInput.value = currentId;
  sellExchangeRateHiddenInput.value = exchangeRate;
  sellSendingCurrencyHiddenInput.value = Currency.KEKS;
  sellReceivingCurrencyHiddenInput.value = Currency.RUBLE;

}

//console.log(modalBuyExchangeRate.textContent)
const renderModal = (evt) => {
  if (buyButton.classList.contains('is-active')) {
    showElement(modalBuy);
    //здесь заполняю модальное покупка
    fillSellModal(evt);
  }
  if (sellButton.classList.contains('is-active')) {
    showElement(modalSell);
    fillBuyModal(evt);
   // fillModalBuyerCard(evt);
    //здесь заполняю модальное продажа
  }

}

const openModal = (evt) => {
  body.classList.add('scroll-lock');
 // document.addEventListener('keydown',onDocumentKeydownForSell); у нее есть проверь f СВОЁ
 //все листенеры на закрытие открытие
  renderModal(evt);

}

const onModalTableClick = (evt) => {
  const modalTableButton = evt.target.closest('.btn--greenborder');
  if(modalTableButton) {
    openModal(evt);
   // console.log(evt)
  }
};

const modalBuyChangeAllBtn = modalBuy.querySelector('#buy-change-all-btn');
// const onBuyPaymentChange = () => {
//   // buyReceiving.value = (buyPayment.value / modalBuyExchangeRate.textContent);
//   buyReceivingInput.value = buyPaymentInput.value / parseFloat(modalBuyExchangeRate.textContent);
// };

// const onReceivingChange = () => {
//   buyPaymentInput.value = buyReceivingInput.value * parseFloat(modalBuyExchangeRate.textContent);
// };

// const onSellPaymentChange = () => {
//   sellReceivingInput.value = sellPaymentInput.value * parseFloat(modalSellExchangeRate.textContent);
// };

// const onSellReceivingChange = () => {
//   sellPaymentInput.value = sellReceivingInput.value / parseFloat(modalSellExchangeRate.textContent);
// };

sellPaymentInput.addEventListener('input',onSellPaymentChange);
sellReceivingInput.addEventListener('input',onSellReceivingChange);


console.log(currentDatumOfSeller[0])
console.log(currentDatumOfBuyer[0])
//  const validateBuyPayment = (currentDat,currentUs) => (currentDat.balances.amount / currentDat.exchangeRate) <= currentUs.balances.amount;


// pristine.addValidator(modalBuyForm.querySelector('#buy-payment'),/*validateBuyPayment,'У покупател недостаточно средств'*/);


buyPaymentInput.addEventListener('input', onBuyPaymentChange);
buyReceivingInput.addEventListener('input',onReceivingChange);
modalTable.addEventListener('click',onModalTableClick);

const onModalBuyChangeAllBtnClick = () => {
  // const userBalanceElement = document.querySelector('#userFiatBalance');
  buyPaymentInput.value = userFiatBalance.textContent;
  buyReceivingInput.value = (buyPaymentInput.value / modalBuyExchangeRate.textContent);
  // pristineBuyForm.pristine.validate(pointsElement);
  // pristineBuyForm.pristine.validate(paymentElement);
};
modalBuyChangeAllBtn.addEventListener('click', onModalBuyChangeAllBtnClick);

export {currentDatumOfSeller,currentDatumOfBuyer}

// modalTable.addEventListener('click', (evt) => {
//  // evt.preventDefault()
//   // const modalTableButton = evt.target.closest('.btn--greenborder');

//   if(modalTableButton) {
//     if (buyButton.classList.contains('is-active')) {
//       openBuyModal();
//       const currentRow = modalTableButton.closest('.users-list__table-row');


//       const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
//       console.log(currentDatum)
//       hideElement(modalBuyIcon)
//       modalBuyName.textContent = currentDatum.userName;
//       modalBuyExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
//       console.log(parseFloat(modalBuyExchangeRate.textContent))
//       modalBuyLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
//       if(currentDatum.isVerified) {
//         showElement(modalBuyIcon);
//       }
//       sellIdHiddenInput.value = currentDatum.id;
//       //sellExchangeRateHiddenInput.value =
//     }

//     if (sellButton.classList.contains('is-active')){
//       openSellModal();
//       const currentRow = modalTableButton.closest('.users-list__table-row');
//       const currentDatum = arrOfBuyers.find(({id}) => id === currentRow.dataset.rowId);
//       console.log(currentDatum)

//       modalSellName.textContent = currentDatum.userName;
//       modalSellExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
//       modalSellLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
//       if(currentDatum.isVerified) {
//         showElement(modalSellIcon);
//       }
//     }
//   }
// });

/** */

/** modalTable.addEventListener('click', (evt) => {
  const modalTableButton = evt.target.closest('.btn--greenborder');

  if(modalTableButton) {
    if (buyButton.classList.contains('is-active')) {
      openBuyModal();
      const currentRow = modalTableButton.closest('.users-list__table-row');
      console.log(currentRow)
      console.log(arrOfSellers)

      const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
      console.log(currentDatum)
      hideElement(modalSellIcon)
      modalSellName.textContent = currentDatum.userName;
      modalSellExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
      modalSellLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
      if(currentDatum.isVerified) {
        showElement(modalSellIcon);
      }
    }
    else {
      openSellModal();
    }
  }
});
*/

/**
const modalTable = document.querySelector('.users-list__table-body');
// const modalTableButton = document.querySelector('.users-list__table-btn');
const modalTableButtonCell = document.querySelector('.users-list__table-cell')
const body = document.querySelector('body');
console.log(body)

const sellButton = document.querySelector('#btn-sell');
const buyButton = document.querySelector('#btn-buy');
const modalSell = document.querySelector('.modal--sell');
const modalBuy = document.querySelector('.modal--buy');
console.log(modalBuy)
const modalSellCloseBtn = modalSell.querySelector('.modal__close-btn');
const modalBuyCloseBtn = modalBuy.querySelector('.modal__close-btn');


const modalSellOverlay = modalSell.querySelector('.modal__overlay');
const modalBuyOverlay = modalBuy.querySelector('.modal__overlay');

const onDocumentKeydownForSell = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(modalSell);
  }
};

const onDocumentKeydownForBuy = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideElement(modalBuy);
  }
};

const closeSellModal = () => {
  hideElement(modalSell);
  body.classList.remove('scroll-lock');
  document.removeEventListener('keydown',onDocumentKeydownForSell);
  modalSellOverlay.removeEventListener('click',closeSellModal);
  modalSellCloseBtn.removeEventListener('click',closeSellModal);

};

const openSellModal = () => {
  showElement(modalSell);
  body.classList.add('scroll-lock');
  document.addEventListener('keydown',onDocumentKeydownForSell);
  modalSellOverlay.addEventListener('click',closeSellModal);
  modalSellCloseBtn.addEventListener('click',closeSellModal);
};

const closeBuyModal = () => {
  hideElement(modalBuy);
  body.classList.remove('scroll-lock');
  document.removeEventListener('keydown',onDocumentKeydownForBuy);
  modalBuyCloseBtn.removeEventListener('click',closeBuyModal);
  modalBuyOverlay.removeEventListener('click',closeBuyModal);
   //очищ удал
};

const openBuyModal = () => {
  showElement(modalBuy);
  body.classList.add('scroll-lock');
  //document.addEventListener('keydown',onDocumentKeydownForBuy);
  modalBuyOverlay.addEventListener('click',closeBuyModal);
  modalBuyCloseBtn.addEventListener('click',closeBuyModal);
};

const modalSellName = modalSell.querySelector('#modal-sell-name');
const modalBuyName = modalBuy.querySelector('#modal-buy-name');
const modalSellExchangeRate = modalSell.querySelector('#transaction-sell-exchange');
const modalBuyExchangeRate = modalBuy.querySelector('#transaction-buy-exchange');

const modalSellLimit = modalSell.querySelector('#transaction-sell-limit');
const modalBuyLimit = modalBuy.querySelector('#transaction-buy-limit');
const modalSellIcon = modalSell.querySelector('#transaction-sell-icon');
const modalBuyIcon = modalBuy.querySelector('#transaction-buy-icon');

const sellIdHiddenInput = modalBuy.querySelector('.contractor-id');

const buyPayment = modalBuy.querySelector('#buy-payment');

const buyReceiving = modalBuy.querySelector('#buy-receiving');


const sellExchangeRateHiddenInput = modalBuy.querySelector('.exchange-rate');

console.log(modalBuyExchangeRate.textContent)
//console.log(arrOfSellers)
 const onPaymentChange = () => {
  buyReceiving.value = (buyPayment / modalBuyExchangeRate.textContent);
};
buyPayment.addEventListener('input', onPaymentChange);


modalTable.addEventListener('click', (evt) => {
 // evt.preventDefault()
  const modalTableButton = evt.target.closest('.btn--greenborder');

  if(modalTableButton) {
    if (buyButton.classList.contains('is-active')) {
      openBuyModal();
      const currentRow = modalTableButton.closest('.users-list__table-row');


      const currentDatum = arrOfSellers.find(({id}) => id === currentRow.dataset.rowId);
      console.log(currentDatum)
      hideElement(modalBuyIcon)
      modalBuyName.textContent = currentDatum.userName;
      modalBuyExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
      console.log(parseFloat(modalBuyExchangeRate.textContent))
      modalBuyLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
      if(currentDatum.isVerified) {
        showElement(modalBuyIcon);
      }
      sellIdHiddenInput.value = currentDatum.id;
      //sellExchangeRateHiddenInput.value =
    }

    if (sellButton.classList.contains('is-active')){
      openSellModal();
      const currentRow = modalTableButton.closest('.users-list__table-row');
      const currentDatum = arrOfBuyers.find(({id}) => id === currentRow.dataset.rowId);
      console.log(currentDatum)

      modalSellName.textContent = currentDatum.userName;
      modalSellExchangeRate.textContent = `${currentDatum.exchangeRate} ₽`;
      modalSellLimit.textContent = `${currentDatum.minAmount} ₽ - ${Math.round(currentDatum.exchangeRate * currentDatum.balance.amount)} ₽`;
      if(currentDatum.isVerified) {
        showElement(modalSellIcon);
      }
    }
  }
});
 */

//const onDocumentKeydownForSell = (evt) => {
  //   if (isEscapeKey(evt)) {
  //     evt.preventDefault();
  //     hideElement(modalSell);
  //   }
  // };

  // const onDocumentKeydownForBuy = (evt) => {
  //   if (isEscapeKey(evt)) {
  //     evt.preventDefault();
  //     hideElement(modalBuy);
  //   }
  // };

  // const closeSellModal = () => {
  //   hideElement(modalSell);
  //   body.classList.remove('scroll-lock');
  //   document.removeEventListener('keydown',onDocumentKeydownForSell);
  //   modalSellOverlay.removeEventListener('click',closeSellModal);
  //   modalSellCloseBtn.removeEventListener('click',closeSellModal);
  //   /** При закрытии окна все введённые пользователем данные удаляются (поля очищаются). */
  // };

  // const openSellModal = () => {
  //   showElement(modalSell);
  //   body.classList.add('scroll-lock');
  //   document.addEventListener('keydown',onDocumentKeydownForSell);
  //   modalSellOverlay.addEventListener('click',closeSellModal);
  //   modalSellCloseBtn.addEventListener('click',closeSellModal);
  // };

  // const closeBuyModal = () => {
  //   hideElement(modalBuy);
  //   body.classList.remove('scroll-lock');
  //   document.removeEventListener('keydown',onDocumentKeydownForBuy);
  //   modalBuyCloseBtn.removeEventListener('click',closeBuyModal);
  //   modalBuyOverlay.removeEventListener('click',closeBuyModal);
  //    //очищ удал
  // };

  // const openBuyModal = () => {
  //   showElement(modalBuy);
  //   body.classList.add('scroll-lock');
  //   //document.addEventListener('keydown',onDocumentKeydownForBuy);
  //   modalBuyOverlay.addEventListener('click',closeBuyModal);
  //   modalBuyCloseBtn.addEventListener('click',closeBuyModal);
  // };
//console.log(arrOfSellers)
//  const onPaymentChange = () => {
//   buyReceiving.value = (buyPayment / modalBuyExchangeRate.textContent);
// };
// buyPayment.addEventListener('input', onPaymentChange);
// const openModal = () => {

// }
