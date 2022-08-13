import { order } from '../../interfaces/order';
import reducer, { setOrderDetail, setOrderDetailError, resetOrderDetail } from './orderDetailSlice';

const initialState: { detail: order.order } = {
  detail: {
    name: '',
    number: -1,
    error: ''
  }
};

describe('order detail slice tests', () => {
  it('Should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });
  describe('order detail slice actions tests', () => {
    it('Should setting an order detail', () => {
      expect(reducer(initialState, setOrderDetail({ name: 'test', number: 1 }))).toEqual({
        detail: {
          name: 'test',
          number: 1,
          error: ''
        }
      });
    });
    it('Should setting an error', () => {
      expect(reducer(initialState, setOrderDetailError('error'))).toEqual({
        detail: {
          name: '',
          number: -1,
          error: 'error'
        }
      });
    });
    it('Should reset to initial state', () => {
      const state = { detail: { ...initialState.detail, name: 'test', number: 50 } };
      expect(reducer(state, resetOrderDetail())).toEqual(initialState);
    });
  });
});
