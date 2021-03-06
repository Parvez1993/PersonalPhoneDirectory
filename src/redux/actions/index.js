import * as ActionTypes from "./type";

export const setuser = (user) => {
  return {
    type: ActionTypes.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};

export const removeUser = () => {
  return {
    type: ActionTypes.REMOVE_USER,
  };
};
