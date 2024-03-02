import {
  ADVISER_ADMIN_CREATE_FAIL,
  ADVISER_ADMIN_CREATE_REQUEST,
  ADVISER_ADMIN_CREATE_RESET,
  ADVISER_ADMIN_CREATE_SUCCESS,
  ADVISER_ADMIN_DELETE_FAIL,
  ADVISER_ADMIN_DELETE_REQUEST,
  ADVISER_ADMIN_DELETE_RESET,
  ADVISER_ADMIN_DELETE_SUCCESS,
  ADVISER_ADMIN_DETAILS_FAIL,
  ADVISER_ADMIN_DETAILS_REQUEST,
  ADVISER_ADMIN_DETAILS_RESET,
  ADVISER_ADMIN_DETAILS_SUCCESS,
  ADVISER_ADMIN_LIST_FAIL,
  ADVISER_ADMIN_LIST_REQUEST,
  ADVISER_ADMIN_LIST_RESET,
  ADVISER_ADMIN_LIST_SUCCESS,
  ADVISER_ADMIN_UPDATE_FAIL,
  ADVISER_ADMIN_UPDATE_REQUEST,
  ADVISER_ADMIN_UPDATE_SUCCESS,
} from "../constants/adviserConstants";

export const adminAdviserCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADVISER_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ADVISER_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case ADVISER_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADVISER_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminAdviserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADVISER_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ADVISER_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case ADVISER_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ADVISER_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminAdviserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADVISER_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case ADVISER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case ADVISER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminAdviserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADVISER_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case ADVISER_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        adviserDetails: action.payload,
      };
    case ADVISER_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ADVISER_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminAdviserListReducer = (state = { advisers: [] }, action) => {
  switch (action.type) {
    case ADVISER_ADMIN_LIST_REQUEST:
      return { loading: true };
    case ADVISER_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        advisers: action.payload.advisers,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case ADVISER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADVISER_ADMIN_LIST_RESET:
      return { advisers: [] };
    default:
      return state;
  }
};
