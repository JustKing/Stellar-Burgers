import { BASE_URL } from '../../constants';

export const getUserInfo = (token: string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      authorization: `Bearer ${token}`
    }
  });
};
