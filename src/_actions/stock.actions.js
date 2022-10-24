import { stockConstants } from '../_constants';
import { stockService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const stockActions = {
    login,
    logout,
    register,
    getAll,
    getById,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));       

        stockService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: stockConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: stockConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: stockConstants.LOGIN_FAILURE, error } }
}

function logout() {
    stockService.logout();
    return { type: stockConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        stockService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: stockConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: stockConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: stockConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        stockService.getById()
            .then(
                stockdet => dispatch(success(stockdet)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: stockConstants.GETSTKDET_REQUEST } }
    function success(stockdet) { return { type: stockConstants.GETSTKDET_SUCCESS, stockdet } }
    function failure(error) { return { type: stockConstants.GETSTKDET_FAILURE, error } }
}

function getById(cmpId,startDate,endDate) {
    debugger;
    return dispatch => {
        dispatch(request());

        stockService.getById(cmpId,startDate,endDate)
            .then(
                stockdet => dispatch(success(stockdet)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: stockConstants.GETSTKDET_REQUEST } }
    function success(stockdet) { return { type: stockConstants.GETSTKDET_SUCCESS, stockdet } }
    function failure(error) { return { type: stockConstants.GETSTKDET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        stockService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: stockConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: stockConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: stockConstants.DELETE_FAILURE, id, error } }
}