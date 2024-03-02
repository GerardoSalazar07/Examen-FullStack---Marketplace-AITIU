import axios from "axios";
import {
  ADVISER_ADMIN_CREATE_FAIL,
  ADVISER_ADMIN_CREATE_REQUEST,
  ADVISER_ADMIN_CREATE_SUCCESS,
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
  ADVISER_ADMIN_DELETE_FAIL,
  ADVISER_ADMIN_DELETE_REQUEST,
  ADVISER_ADMIN_DELETE_SUCCESS,
} from "../constants/adviserConstants";

export const adminListAdvisers =
  (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADVISER_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/advisers?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
      );
      dispatch({
        type: ADVISER_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADVISER_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminDetailsAdviser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADVISER_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/advisers/${id}`);
    dispatch({
      type: ADVISER_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADVISER_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminCreateAdviser = (adviser, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADVISER_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/admin/advisers",
      { adviser, password },
      config
    );

    dispatch({
      type: ADVISER_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ADVISER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: ADVISER_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteAdviser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADVISER_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/advisers/${id}`);

    dispatch({
      type: ADVISER_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ADVISER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADVISER_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdateAdviser =
  (id, adviser, password) => async (dispatch) => {
    try {
      dispatch({
        type: ADVISER_ADMIN_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/admin/advisers/${id}`,
        { adviser, password },
        config
      );
      dispatch({
        type: ADVISER_ADMIN_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: ADVISER_ADMIN_DETAILS_RESET,
        payload: data,
      });
      dispatch({
        type: ADVISER_ADMIN_LIST_RESET,
      });
    } catch (error) {
      dispatch({
        type: ADVISER_ADMIN_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };
