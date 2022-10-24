import { companyConstants } from '../_constants';
const initialState = { loading: false, Itmallcompanys:{},CompanyDet:{}};
export function companys(state = {}, action) {
  switch (action.type) {
    case companyConstants.GETALLCOMPANY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case companyConstants.GETALLCOMPANY_SUCCESS:
      return {
        ...state,
        loading:false,
        Itmallcompanys: action.lstallcompanys
      };
    case companyConstants.GETALLCOMPANY_FAILURE:
      return { 
        error: action.error
      };
      case companyConstants.GETCOMPANYDET_REQUEST:
        return {
          ...state,
          loading: true
        };
      case companyConstants.GETCOMPANYDET_SUCCESS:
        return {          
        ...state,
          loading:false,
          CompanyDet: action.compdet
        };
      case companyConstants.GETCOMPANYDET_FAILURE:
        return { 
          error: action.error
        };
    default:
      return state
  }
}