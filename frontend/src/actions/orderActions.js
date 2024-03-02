import axios from "axios";
import {
  ORDER_ADMIN_CREATE_FAIL,
  ORDER_ADMIN_CREATE_REQUEST,
  ORDER_ADMIN_CREATE_SUCCESS,
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
  ORDER_ADMIN_DELETE_FAIL,
  ORDER_ADMIN_DELETE_REQUEST,
  ORDER_ADMIN_DELETE_SUCCESS,
} from "../constants/orderConstants";

export const adminCreateOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/admin/orders",
      { order },
      config
    );

    dispatch({
      type: ORDER_ADMIN_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ORDER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response,
    });
  }
}

export const adminListOrders = (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `/api/admin/orders?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
    );

    dispatch({
      type: ORDER_ADMIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data,
    });
  }
}

export const adminDetailsOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/admin/orders/${id}`);
    
    dispatch({
      type: ORDER_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data,
    });
  }
}

export const adminUpdateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/orders/${id}`,
      { order },
      config
    );

    dispatch({
      type: ORDER_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ORDER_ADMIN_DETAILS_RESET,
      payload: data,
    });

    dispatch({
      type: ORDER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response,
    });
  }
};

export const adminDeleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/admin/orders/${id}`);

    dispatch({
      type: ORDER_ADMIN_DELETE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ORDER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    
    dispatch({
      type: ORDER_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
}
