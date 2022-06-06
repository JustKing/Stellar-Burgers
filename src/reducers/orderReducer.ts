import { order } from '../interfaces/order';

const initialState: order.order = { name: '', number: 0, error: '' };

const reducer = (state: order.order, action: order.context.actions): order.order => {
  switch (action.type) {
    case 'set':
      return { name: action.payload.name, number: action.payload.number, error: '' };
    case 'set-error':
      return { ...initialState, error: action.payload };
    case 'reset': {
      return initialState;
    }
    default:
      throw new Error(`Wrong type of action`);
  }
};

export { initialState, reducer };
