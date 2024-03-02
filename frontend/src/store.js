import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
  userVerifyStatusReducer,
} from "./reducers/userReducer";

import {
  adminAdviserCreateReducer,
  adminAdviserDetailsReducer,
  adminAdviserUpdateReducer,
  adminAdviserDeleteReducer,
  adminAdviserListReducer,
} from "./reducers/adviserReducer";

import {
  adminProductCreateReducer,
  adminProductDetailsReducer,
  adminProductUpdateReducer,
  adminProductDeleteReducer,
  adminProductListReducer,
} from "./reducers/productReducer";

import {
  adminOrderCreateReducer,
  adminOrderDetailsReducer,
  adminOrderUpdateReducer,
  adminOrderDeleteReducer,
  adminOrderListReducer,
} from "./reducers/orderReducer";

const reducers = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyStatus: userVerifyStatusReducer,
  userVerify: userVerifyReducer,

  // ADVISER
  adminAdviserCreate: adminAdviserCreateReducer,
  adminAdviserDetails: adminAdviserDetailsReducer,
  adminAdviserUpdate: adminAdviserUpdateReducer,
  adminAdviserDelete: adminAdviserDeleteReducer,
  adminAdviserList: adminAdviserListReducer,
  
  // PRODUCT
  adminProductCreate: adminProductCreateReducer,
  adminProductDetails: adminProductDetailsReducer,
  adminProductUpdate: adminProductUpdateReducer,
  adminProductDelete: adminProductDeleteReducer,
  adminProductList: adminProductListReducer,
  
  // ORDER
  adminOrderCreate: adminOrderCreateReducer,
  adminOrderDetails: adminOrderDetailsReducer,
  adminOrderUpdate: adminOrderUpdateReducer,
  adminOrderDelete: adminOrderDeleteReducer,
  adminOrderList: adminOrderListReducer,
});

const initialState = {
  userLogin: { userInfo: {} },
};

const middleware = [thunk];

const store = configureStore(
  { reducer: reducers },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
