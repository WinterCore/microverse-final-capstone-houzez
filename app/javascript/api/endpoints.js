export const API_URL = 'http://localhost:3000/api';

export const LOGIN = () => ({ method: 'POST', url: '/login' });

export const GET_HOUSES = () => ({ method: 'GET', url: '/houses' });
export const GET_HOUSE = id => ({ method: 'GET', url: `/houses/${id}` });
export const GET_HOUSE_TYPES = () => ({ method: 'GET', url: '/house_types' });
export const FAVOURITE_HOUSE = (id) => ({ method: 'POST', url: `/houses/${id}/favourite` });
export const UNFAVOURITE_HOUSE = (id) => ({ method: 'POST', url: `/houses/${id}/unfavourite` });
