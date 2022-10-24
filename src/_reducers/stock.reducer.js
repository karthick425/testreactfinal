import { stockConstants } from '../_constants';
const initialState = { loading: false, items:{}};
export function stockdetails(state = initialState, action) {
  switch (action.type) {
    case stockConstants.GETSTKDET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case stockConstants.GETSTKDET_SUCCESS:
      return {
        items: action.stockdet
      };
    case stockConstants.GETSTKDET_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}