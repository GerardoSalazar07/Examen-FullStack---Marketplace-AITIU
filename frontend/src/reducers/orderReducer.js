import {
  ORDER_ADMIN_CREATE_FAIL,
  ORDER_ADMIN_CREATE_REQUEST,
  ORDER_ADMIN_CREATE_RESET,
  ORDER_ADMIN_CREATE_SUCCESS,
  ORDER_ADMIN_DELETE_FAIL,
  ORDER_ADMIN_DELETE_REQUEST,
  ORDER_ADMIN_DELETE_RESET,
  ORDER_ADMIN_DELETE_SUCCESS,
  ORDER_ADMIN_DETAILS_FAIL,
  ORDER_ADMIN_DETAILS_REQUEST,
  ORDER_ADMIN_DETAILS_RESET,
  ORDER_ADMIN_DETAILS_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_RESET,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_UPDATE_FAIL,
  ORDER_ADMIN_UPDATE_REQUEST,
  ORDER_ADMIN_UPDATE_SUCCESS,
} from "../constants/orderConstants";

export const adminOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case ORDER_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export const adminOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ADMIN_LIST_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case ORDER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
}

export const adminOrderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };
    case ORDER_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}

export const adminOrderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case ORDER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const adminOrderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case ORDER_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
}
