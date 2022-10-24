import { companyConstants } from '../_constants';
import { companyService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const companyActions = {
    getAll,
    getById
};


function getAll() {
    return dispatch => {
        dispatch(request());

        companyService.getAll()
            .then(
                lstallcompanys => dispatch(success(lstallcompanys)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: companyConstants.GETALLCOMPANY_REQUEST } }
    function success(lstallcompanys) { return { type: companyConstants.GETALLCOMPANY_SUCCESS,lstallcompanys} }
    function failure(error) { return { type: companyConstants.GETALLCOMPANY_FAILURE, error } }
}
function getById(cmpId) {
    debugger;
    return dispatch => {
        dispatch(request());

        companyService.getById(cmpId)
            .then(
                compdet => dispatch(success(compdet)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: companyConstants.GETCOMPANYDET_REQUEST } }
    function success(compdet) { return { type: companyConstants.GETCOMPANYDET_SUCCESS, compdet } }
    function failure(error) { return { type: companyConstants.GETCOMPANYDET_FAILURE, error } }
}