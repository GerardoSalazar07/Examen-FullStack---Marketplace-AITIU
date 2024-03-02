import axios from "axios";
import {
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_DETAILS_FAIL,
  PRODUCT_ADMIN_DETAILS_REQUEST,
  PRODUCT_ADMIN_DETAILS_RESET,
  PRODUCT_ADMIN_DETAILS_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_RESET,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
} from "../constants/productConstants";

export const adminCreateProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_REQUEST,
    });

    const formData = new FormData();
    formData.append('adviser', product.adviser);
    formData.append('image', product.image);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    
    const { data } = await axios.post(
      "/api/admin/products",
      formData,
      config
    );

    dispatch({
      type: PRODUCT_ADMIN_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response,
    });
  }
}

export const adminListProducts = (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_LIST_REQUEST,
    });
    
    const { data } = await axios.get(
      `/api/admin/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
    );
    
    dispatch({
      type: PRODUCT_ADMIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data,
    });
  }
}

export const adminDetailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_REQUEST,
    });
    
    const { data } = await axios.get(`/api/admin/products/${id}`);
    
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data,
    });
  }
}

export const adminUpdateProduct = (id, product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_UPDATE_REQUEST,
    });

    const formData = new FormData();
    formData.append('adviser', product.adviser);
    formData.append('image', product.image);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    
    const { data } = await axios.put(
      `/api/admin/products/${id}`,
      formData,
      config
    );

    dispatch({
      type: PRODUCT_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PRODUCT_ADMIN_DETAILS_RESET,
      payload: data,
    });

    dispatch({
      type: PRODUCT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.response,
    });
  }
}

export const adminDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_ADMIN_DELETE_REQUEST,
    });
    
    const { data } = await axios.delete(`/api/admin/products/${id}`);

    dispatch({
      type: PRODUCT_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    
    dispatch({
      type: PRODUCT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    
    dispatch({
      type: PRODUCT_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
}
