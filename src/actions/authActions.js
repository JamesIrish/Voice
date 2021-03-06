import * as types from "./actionTypes";
import AuthApi from "../api/AuthApi";
import UserApi from "../api/UserApi";

export function clearRedirect() {
  return { type: types.CLEAR_REDIRECTION };
}

export function createUserSuccess(info) {
  return { type: types.CREATE_USER_SUCCESS, info: info };
}
export function createUserError(error) {
  return { type: types.CREATE_USER_ERROR, error: error };
}
export function createUser(newUser) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return UserApi.createUser(newUser)
      .then(info => dispatch(createUserSuccess(info)))
      .catch(error => dispatch(createUserError(error)));
  };
}

export function signInSuccess(auth, redirect) {
  if (redirect) return { type: types.SIGN_IN_SUCCESS, auth: auth, redirect: redirect };
  return { type: types.SIGN_IN_SUCCESS, auth: auth };
}
export function signInError(error) {
  return { type: types.SIGN_IN_ERROR, error: error };
}

export function signInUser(credentials, redirect) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return AuthApi.authenticateUser(credentials)
      .then(auth => dispatch(signInSuccess(auth, redirect)))
      .catch(error => dispatch(signInError(error)));
  };
}
export function signInAdUser() {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return AuthApi.authenticateUserAd()
      .then(auth => dispatch(signInSuccess(auth)))
      .catch(error => dispatch(signInError(error)));
  };
}

export function signOutSuccess() {
  return { type: types.SIGN_OUT_SUCCESS};
}
export function signOutError(error) {
  return { type: types.SIGN_OUT_ERROR, error: error };
}

export function signOutUser(userId) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return AuthApi.signOut(userId)
      .then(() => dispatch(signOutSuccess()))
      .catch(error => dispatch(signOutError(error)));
  };
}

export function refreshTokenSuccess(auth) {
  return { type: types.REFRESH_TOKEN_SUCCESS, auth: auth };
}
export function refreshTokenError(error) {
  return { type: types.REFRESH_TOKEN_ERROR, error: error };
}

export function refreshToken(userId, refreshToken) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return AuthApi.getAccessToken(userId, refreshToken)
      .then(auth => dispatch(refreshTokenSuccess(auth)))
      .catch(error => dispatch(refreshTokenError(error)));
  };
}

export function forgottenComplete() {
  return { type: types.FORGOTTEN_COMPLETE };
}

export function forgotten(email) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return AuthApi.forgotten(email)
      .then(() => dispatch(forgottenComplete()))
      .catch(() => dispatch(forgottenComplete()));
  };
}

export function checkPasswordResetTokenSuccess(info) {
  return { type: types.CHECK_PASSWORD_RESET_TOKEN_SUCCESS, info: info };
}
export function checkPasswordResetTokenError(error) {
  return { type: types.CHECK_PASSWORD_RESET_TOKEN_ERROR, error: error };
}

export function checkPasswordResetToken(resetPasswordToken) {
  return function(dispatch) {
    return AuthApi.checkPasswordResetToken(resetPasswordToken)
      .then(info => dispatch(checkPasswordResetTokenSuccess(info)))
      .catch(error => dispatch(checkPasswordResetTokenError(error)));
  };
}

export function resetComplete(info) {
  return { type: types.PASSWORD_RESET_COMPLETE, info: info };
}
export function resetError(error) {
  return { type: types.PASSWORD_RESET_ERROR, error: error };
}
export function resetPassword(passwordResetToken, newPassword) {
  return function(dispatch) {
    dispatch({ type: types.AUTH_LOADING });
    return AuthApi.resetPassword(passwordResetToken, newPassword)
      .then(info => dispatch(resetComplete(info)))
      .catch(error => dispatch(resetError(error)));
  };
}
