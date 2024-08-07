import {hideElement,showElement,changeActiveClass,createElement,clearElementsContainer} from './utils.js';
import {fillBuyModal} from './modal-buy.js';

const listButton = document.querySelector('#btn-list');
const mapButton = document.querySelector('#btn-map');
const listOfContractors = document.querySelector('.users-list');
const mapContainer = document.querySelector('#map-container');
const baloonTemplate = document.querySelector('#map-baloon__template').content.querySelector('.user-card');

const checkedContractorsButton = document.querySelector('#checked-users');
const sellButton = document.querySelector('#btn-sell');
const buyButton = document.querySelector('#btn-buy');

const START_COORDINATE = {
  lat: 59.92749,
  lng: 30.31127,
};

const ZOOM = 10;

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const map = L.map('map-canvas')
  .on('load', () => {
    showElement(mapContainer);
  })
  .setView(START_COORDINATE, ZOOM)
  .invalidateSize(false);


if(listButton.classList.contains('is-active')) {
  hideElement(mapContainer);
}

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const iconConfig = {
  url: './img/pin.svg',
  width: 36,
  height: 46,
  anchorX: 18,
  anchorY: 36,
};

const verifiedIconsConfig = {
  url: './img/pin-verified.svg',
  width: 36,
  height: 46,
  anchorX: 18,
  anchorY: 36,
};

const pinIcons = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const verifiedIcons = L.icon({
  iconUrl: verifiedIconsConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const markerGroup = L.layerGroup().addTo(map);

export const createBaloon = (datum) => {
  const {isVerified,userName,balance,exchangeRate,minAmount,paymentMethods} = datum;
  const cardElement = baloonTemplate.cloneNode(true);
  const baloonMark = cardElement.querySelector('.user-card__mark');
  const baloonName = cardElement.querySelector('.user-card__name');
  const baloonCurrency = cardElement.querySelector('#user-currency');
  const baloonExchange = cardElement.querySelector('#user-exchange');
  const baloonCashLimit = cardElement.querySelector('#user__cash-limit');
  const baloonPayContainer = cardElement.querySelector('.user-card__badges-list');
  const mapChangeBtn = cardElement.querySelector('.user-card__change-btn');
  console.log(cardElement);

  if(!isVerified) {
    baloonMark.style = 'display: none';
  }

  baloonName.textContent = userName;
  baloonCurrency.textContent = balance.currency;
  baloonExchange.textContent = exchangeRate;
  baloonCashLimit.textContent = `${minAmount} ₽ - ${Math.round(exchangeRate * balance.amount)} ₽`;
  clearElementsContainer(baloonPayContainer);
  createElement(baloonPayContainer,paymentMethods,'li','users-list__badges-item','badge');

  const onMapChangeBtn = (evt) => {
    console.log(datum);
   // fillBuyModal(evt)
  }
  mapChangeBtn.addEventListener('click',onMapChangeBtn);
  return cardElement;
};

const createMarker = (datum) => {
  const {lat,lng} = datum.coords;
  const {isVerified} = datum;
  const getIcon = () => {
    if(isVerified) {
      return verifiedIcons;
    }
    return pinIcons;
  };
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: getIcon(),
  });
  marker.addTo(markerGroup)
    .bindPopup(createBaloon(datum));
  if(markerGroup.isPopupOpen()) {
    console.log('dfdf')
  }
};

const createMarkers = (arrOfAllSellers) => {
  const filteredArrOfCashHavers = arrOfAllSellers.filter((seller) => seller.coords);
  const filterVerifiedCashHavers = filteredArrOfCashHavers.filter((seller) => seller.isVerified);

  if(checkedContractorsButton.checked) {
    markerGroup.clearLayers();
    filterVerifiedCashHavers.forEach((datum) => {
      createMarker(datum);
    });
  } else {
    filteredArrOfCashHavers.forEach((datum) => {
      createMarker(datum);
    });
  }
};

mapButton.addEventListener('click',() => {
  hideElement(listOfContractors);
  showElement(mapContainer);
  sellButton.setAttribute('disabled','');
  buyButton.classList.add('is-active');
  sellButton.classList.remove('is-active');
  map.setView(START_COORDINATE, ZOOM);
  changeActiveClass(listButton,mapButton);
});

listButton.addEventListener('click',() => {
  sellButton.removeAttribute('disabled');
  hideElement(mapContainer);
  showElement(listOfContractors);
  changeActiveClass(mapButton,listButton);
  map.closePopup();
});





export {createMarkers,map};
