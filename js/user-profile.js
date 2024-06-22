const userCryptoBalance = document.querySelector('#user-crypto-balance');
const userFiatBalance = document.querySelector('#user-fiat-balance');
const userProfileName = document.querySelector('#user-profile__name');
export const userProfileContainer = document.querySelector('.user-profile');
const currentUser = [];

const getCurrentUser = (user) => {
  currentUser.length = 0;
  currentUser.push(user);
};

const fillUserDatum = (user) => {
  getCurrentUser(user);
  const {balances,userName} = user;
  const keksBalance = balances.find((balance) => balance.currency === 'KEKS');
  const userAmount = balances.find((balance) => balance.currency === 'RUB');

  userProfileName.textContent = userName;
  userCryptoBalance.textContent = keksBalance.amount;
  userFiatBalance.textContent = userAmount.amount;
};

export {fillUserDatum,currentUser};
