import reducer, { setOffset, reset, setIsCenter, InitialState } from './baseSlice';

const initialState: InitialState = {
  offset: 0,
  isCenter: false
};

describe('base slice tests', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('base slice actions tests', () => {
    it('Should setting an offset variable', () => {
      expect(reducer(initialState, setOffset(5))).toEqual({ offset: 5, isCenter: false });
    });

    it('Should setting an isCenter variable', () => {
      expect(reducer(initialState, setIsCenter(true))).toEqual({ offset: 0, isCenter: true });
    });

    it('Should reset to initial state', () => {
      const state = { ...initialState, offset: 5, isCenter: true };
      expect(reducer(state, reset())).toEqual({ offset: 0, isCenter: false });
    });
  });
});
