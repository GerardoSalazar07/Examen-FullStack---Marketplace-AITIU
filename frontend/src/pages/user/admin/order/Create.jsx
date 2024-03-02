import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

import { ORDER_ADMIN_CREATE_RESET } from "../../../../constants/orderConstants";
import { adminListProducts } from "../../../../actions/productActions";
import { adminCreateOrder } from "../../../../actions/orderActions";
import { getLoginData } from "../../../../actions/userActions";

import { InputSelect } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import Loader from "../../../../components/Loader";

import { useMaterialTailwindController } from "../../../../context";

export function OrderCreate() {
  const [order, setOrder] = useState({
    product: "",
    status: "Pending",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [controller] = useMaterialTailwindController();
  const { sidenavColor } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;
  const { userInfo } = userLogin;

  const adminOrderCreate = useSelector((state) => state.adminOrderCreate);
  const {
    loading: loadingCreateOrder,
    error: errorCreateOrder,
    message: messageCreateOrder,
  } = adminOrderCreate;
  
  // const adminDevelopmentsList = useSelector(
  //   (state) => state.adminDevelopmentsList
  // );

  const handleChange = (e) =>
    setOrder((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));

  const submitHandler = () => {
    dispatch(adminCreateOrder(order));
  };
  
  const redirect = "/login";
  useEffect(() => {
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    }

    if (messageCreateOrder) {
      dispatch({ type: ORDER_ADMIN_CREATE_RESET });
      navigate(`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes`);
    }
  }, [userInfo, messageCreateOrder, dispatch, navigate]);

  const adminProductList = useSelector((state) => state.adminProductList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    success,
    products,
  } = adminProductList;

  useEffect(() => {
    if (!success && !errorProducts) {
      dispatch(adminListProducts());
    }
  }, [success, errorProducts, dispatch]);

  return (
    <>
      {loadingProducts ? (
        <div className="flex w-full h-[calc(100vh-107px)] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="bg-slate-50 p-4">
          <h2 className="text-palette-primary text-xl font-bold">Agregar Órden</h2>
          <form
            className="mt-3 grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col gap-3">
              <InputSelect
                title="Producto"
                name="product"
                type="text"
                required={true}
                value={order.product}
                setValue={handleChange}
              >
                <option value={""}>Selecciona una opción</option>
                {products?.map(({ _id, name }) => (
                  <option key={_id} value={_id}>{name}</option>
                ))}
              </InputSelect>
            </div>
            
            <div className="flex flex-col gap-3">
              <InputSelect
                title="Estatus"
                name="status"
                type="text"
                value={order.status}
                setValue={handleChange}
              >
                <option value={"Pending"}>Pendiente</option>
                <option value={"In process"}>En Proceso</option>
                <option value={"Sent"}>Enviado</option>
                <option value={"Delivered"}>Entregado</option>
              </InputSelect>
            </div>

            <div className="col-span-full">
              <div className="col-span-full mt-3 flex justify-center text-center">
                {errorCreateOrder && (
                  <Alert title="Informacion incompleta" text={errorCreateOrder} />
                )}
              </div>
              <div className="col-span-full flex justify-center text-center">
                <Button
                  type="onSubmit"
                  color={sidenavColor}
                  className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                  fullWidth
                >
                  {loadingCreateOrder && (
                    <img
                      src="/assets/loader.svg"
                      className="my-auto mr-3 h-6 w-6"
                      alt=""
                    />
                  )}
                  {loadingCreateOrder ? "Creando..." : "Crear"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default OrderCreate;
