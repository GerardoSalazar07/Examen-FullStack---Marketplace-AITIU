import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

import { adminListProducts } from "../../../../actions/productActions";
import { adminDetailsOrder, adminUpdateOrder } from "../../../../actions/orderActions";
import { getLoginData } from "../../../../actions/userActions";

import { Input, InputSelect } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import Loader from "../../../../components/Loader";

import { useMaterialTailwindController } from "../../../../context";

export function OrderEdit() {
  const [order, setOrder] = useState({
    product: "",
    status: "Pending",
    shippingCompany: "",
    trackingNumber: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [controller] = useMaterialTailwindController();
  const { sidenavColor } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;
  const { userInfo } = userLogin;

  const adminOrderDetails = useSelector((state) => state.adminOrderDetails);
  const {
    // loading: loadingDetails,
    // error: errorDetails,
    orderDetails,
  } = adminOrderDetails;

  const adminOrderUpdate = useSelector((state) => state.adminOrderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    messageUpdate,
  } = adminOrderUpdate;
  
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
    dispatch(adminUpdateOrder(id, order));
  };

  const redirect = "/login";
  useEffect(() => {
    if (messageUpdate) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin" && userInfo.userType !== "Adviser") {
      navigate(redirect);
    } else if (id && (!orderDetails || orderDetails._id !== id)) {
      dispatch(adminDetailsOrder(id));
    }

    if (orderDetails) {
      setOrder(orderDetails);
    }
  }, [id, userInfo, messageUpdate, orderDetails, dispatch, navigate]);

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
          <h2 className="text-palette-primary text-xl font-bold">Editar Órden</h2>
          <form
            className="mt-3 grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col gap-3">
              {userInfo.userType === "Admin" &&
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
              }
              <Input
                title="Paquetería"
                name="shippingCompany"
                type="text"
                value={order.shippingCompany}
                setValue={handleChange}
              />
              <Input
                title="Número de rastreo"
                name="trackingNumber"
                type="text"
                value={order.trackingNumber}
                setValue={handleChange}
              />
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
                {errorUpdate && (
                  <Alert title="Ocurrio un error" text={errorUpdate} />
                )}
              </div>
              <div className="col-span-full flex justify-center text-center">
                <Button
                  type="onSubmit"
                  color={sidenavColor}
                  className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                  fullWidth
                >
                  {loadingUpdate && (
                    <img
                      src="/assets/loader.svg"
                      className="my-auto mr-3 h-6 w-6"
                      alt=""
                    />
                  )}
                  {loadingUpdate ? "Modificando..." : "Modificar"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default OrderEdit;
