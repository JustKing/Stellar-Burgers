import { profile } from '../../interfaces/profile';
import reducer, { setUser, resetUser } from './profileSlice';

const initialState: Omit<profile.user, 'password'> = {
  email: '',
  name: '',
  token: ''
};

describe('profile slice tests', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('profile slice actions tests', () => {
    it('Should setting a user', () => {
      expect(reducer(initialState, setUser({ email: 'email', name: 'name', token: 'token' }))).toEqual({
        email: 'email',
        name: 'name',
        token: 'token'
      });
    });

    it('Should reset to initial state', () => {
      const state = {
        email: 'email',
        name: 'name',
        token: 'token'
      };
      expect(reducer(state, resetUser())).toEqual(initialState);
    });
  });
});
