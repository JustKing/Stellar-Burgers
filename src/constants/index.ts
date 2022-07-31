const TABS = [
  {
    type: 'bun',
    title: 'Булки'
  },
  {
    type: 'sauce',
    title: 'Соусы'
  },
  {
    type: 'main',
    title: 'Начинки'
  }
];

const STATUSES = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан'
};

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ORDERS_WSS = 'wss://norma.nomoreparties.space/orders';

export { TABS, STATUSES, BASE_URL, ORDERS_WSS };
