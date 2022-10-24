import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { stockdetails } from './stock.reducer';
import { companys } from './company.reducer';


const rootReducer = combineReducers({
  authentication,
  alert,
  stockdetails,
  companys
});

export default rootReducer;