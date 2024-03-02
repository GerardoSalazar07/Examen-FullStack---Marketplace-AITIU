import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

import { PRODUCT_ADMIN_CREATE_RESET } from "../../../../constants/productConstants";
import { adminListAdvisers } from "../../../../actions/adviserActions";
import { adminCreateProduct } from "../../../../actions/productActions";
import { getLoginData } from "../../../../actions/userActions";

import { Input, InputSelect, InputFile } from "../../../../components/elements/Inputs";
import Alert from "../../../../components/alerts/Alert";
import Loader from "../../../../components/Loader";

import { useMaterialTailwindController } from "../../../../context";

export function ProductCreate() {
  const [product, setProduct] = useState({
    adviser: "",
    image: null,
    name: "",
    category: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [controller] = useMaterialTailwindController();
  const { sidenavColor } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;
  const { userInfo } = userLogin;

  const adminProductCreate = useSelector((state) => state.adminProductCreate);
  const {
    loading: loadingCreateProduct,
    error: errorCreateProduct,
    message: messageCreateProduct,
  } = adminProductCreate;

  // const adminDevelopmentsList = useSelector(
  //   (state) => state.adminDevelopmentsList
  // );

  const handleChange = (e) =>
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));
  
  const handleFileChange = (file) =>
    setProduct((prevState) => ({
      ...prevState,
      image: file,
    }));

  const submitHandler = () => {
    dispatch(adminCreateProduct(product));
  };

  const redirect = "/login";
  useEffect(() => {
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    }

    if (messageCreateProduct) {
      dispatch({ type: PRODUCT_ADMIN_CREATE_RESET });
      navigate(`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/productos`);
    }
  }, [userInfo, messageCreateProduct, dispatch, navigate]);

  const adminAdviserList = useSelector((state) => state.adminAdviserList);
  const {
    loading: loadingAdvisers,
    error: errorAdvisers,
    success,
    advisers,
  } = adminAdviserList;

  useEffect(() => {
    if (!success && !errorAdvisers) {
      dispatch(adminListAdvisers());
    }
  }, [success, errorAdvisers, dispatch]);

  return (
    <>
      {loadingAdvisers ? (
        <div className="flex w-full h-[calc(100vh-107px)] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="bg-slate-50 p-4">
          <h2 className="text-palette-primary text-xl font-bold">Agregar Producto</h2>
          <form
            className="mt-3 grid gap-6 md:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <div className="flex flex-col gap-3">
              <InputSelect
                title="Proveedor"
                name="adviser"
                type="text"
                required={true}
                value={product.adviser}
                setValue={handleChange}
              >
                <option value={""}>Selecciona una opción</option>
                {advisers?.map(({ _id, name }) => (
                  <option key={_id} value={_id}>{name}</option>
                ))}
              </InputSelect>
              <InputFile
                title="Imagen"
                name="image"
                type="text"
                value={product.image}
                setValue={handleFileChange}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Input
                title="Nombre"
                name="name"
                type="text"
                required={true}
                value={product.name}
                setValue={handleChange}
              />
              <Input
                title="Descripción"
                name="description"
                type="text"
                value={product.description}
                setValue={handleChange}
              />
              <Input
                title="Categoria"
                name="category"
                type="text"
                value={product.category}
                setValue={handleChange}
              />
              <Input
                title="Precio"
                name="price"
                type="text"
                required={true}
                value={product.price}
                setValue={handleChange}
              />
            </div>

            <div className="col-span-full">
              <div className="col-span-full mt-3 flex justify-center text-center">
                {errorCreateProduct && (
                  <Alert title="Informacion incompleta" text={errorCreateProduct} />
                )}
              </div>
              <div className="col-span-full flex justify-center text-center">
                <Button
                  type="onSubmit"
                  color={sidenavColor}
                  className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
                  fullWidth
                >
                  {loadingCreateProduct && (
                    <img
                      src="/assets/loader.svg"
                      className="my-auto mr-3 h-6 w-6"
                      alt=""
                    />
                  )}
                  {loadingCreateProduct ? "Creando..." : "Crear"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ProductCreate;
