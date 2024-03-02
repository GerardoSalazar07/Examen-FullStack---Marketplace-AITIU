import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminCreateAdviser } from "../../../../actions/adviserActions";
import { getLoginData } from "../../../../actions/userActions";

import { Input } from "../../../../components/elements/Inputs";

import Alert from "../../../../components/alerts/Alert";
import { ADVISER_ADMIN_CREATE_RESET } from "../../../../constants/adviserConstants";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Switch,
} from "@material-tailwind/react";
import { useMaterialTailwindController } from "../../../../context";

export function AdviserCreate() {
  const [adviser, setAdviser] = useState({
    name: "",
    tradename: "",
    rfc: "",
    email: "",
    phone: "",
    developments: [],
    fiscalAddress: {
      address: "",
      district: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
    },
    payment: {
      cuenta: "",
      banco: "",
      comision: "",
      salario: "",
    },
  });
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [controller, setController] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const adminAdviserCreate = useSelector((state) => state.adminAdviserCreate);
  const {
    loading: loadingCreateAdviser,
    error: errorCreateAdviser,
    message: messageCreateAdviser,
  } = adminAdviserCreate;
  const adminDevelopmentsList = useSelector(
    (state) => state.adminDevelopmentsList
  );

  const handleChange = (e) =>
    setAdviser((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.value,
            }
          : e.target.value,
    }));

  const handleChangeCheckbox = (e) =>
    setAdviser((prevState) => ({
      ...prevState,
      [e.target.name.split(".")[0]]:
        e.target.name.split(".").length === 2
          ? {
              ...prevState[e.target.name.split(".")[0]],
              [e.target.name.split(".")[1]]: e.target.checked,
            }
          : e.target.checked,
    }));

  const submitHandler = () => {
    dispatch(adminCreateAdviser(adviser, password));
  };
  const redirect = "/login";
  useEffect(() => {
    if (messageCreateAdviser) {
      dispatch({ type: ADVISER_ADMIN_CREATE_RESET });
      navigate("/admin/proveedores");
    }
    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    }
  }, [userInfo, messageCreateAdviser]);
  return (
    <div className="bg-slate-50 p-4">
      <h2 className="text-palette-primary text-xl font-bold">Agregar Asesor</h2>
      <form
        className="mt-3 grid gap-6 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <div className="flex flex-col gap-3">
          <Typography className="text-lg font-semibold  hover:text-gray-800">
            Dato general
          </Typography>
          <Input
            title="Nombre"
            name="name"
            type="text"
            required={true}
            value={adviser.name}
            setValue={handleChange}
          />
          <Input
            title="Nombre comercial"
            name="tradename"
            type="text"
            required={true}
            value={adviser.tradename}
            setValue={handleChange}
          />
          <Input
            title="RFC"
            name="rfc"
            type="text"
            required={true}
            value={adviser.rfc}
            setValue={handleChange}
          />
          <Input
            title="Telefono"
            name="phone"
            type="text"
            required={true}
            value={adviser.phone}
            setValue={handleChange}
          />
          <Input
            title="Correo electronico"
            name="email"
            type="email"
            required={true}
            value={adviser.email}
            setValue={handleChange}
          />
          <Input
            title="Contraseña"
            name="password"
            type="password"
            required={true}
            value={password}
            setValue={(e) => setPassword(e.target.value)}
          />

          <Typography className="text-lg font-semibold  hover:text-gray-800">
            Pago
          </Typography>
          <Input
            title="Cuenta"
            name="payment.cuenta"
            type="text"
            required={true}
            value={adviser.payment?.cuenta}
            setValue={handleChange}
          />

          <Input
            title="Banco"
            name="payment.banco"
            type="text"
            required={true}
            value={adviser.payment?.banco}
            setValue={handleChange}
          />

          <Input
            title="Comision"
            name="payment.comision"
            type="text"
            required={true}
            value={adviser.payment?.comision}
            setValue={handleChange}
          />
          <Input
            title="Salario"
            name="payment.salario"
            type="text"
            required={true}
            value={adviser.payment?.salario}
            setValue={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Typography className="text-lg font-semibold  hover:text-gray-800">
            Direccion Fiscal
          </Typography>
          <Input
            title="Calle y numero"
            name="fiscalAddress.address"
            type="text"
            required={true}
            value={adviser.fiscalAddress?.address}
            setValue={handleChange}
          />
          <Input
            title="Colonia"
            name="fiscalAddress.district"
            type="text"
            required={true}
            value={adviser.fiscalAddress?.district}
            setValue={handleChange}
          />
          <Input
            title="Codigo postal"
            name="fiscalAddress.postalCode"
            type="text"
            required={true}
            value={adviser.fiscalAddress?.postalCode}
            setValue={handleChange}
          />
          <Input
            title="Ciudad"
            name="fiscalAddress.city"
            type="text"
            required={true}
            value={adviser.fiscalAddress?.city}
            setValue={handleChange}
          />
          <Input
            title="Estado"
            name="fiscalAddress.state"
            type="text"
            required={true}
            value={adviser.fiscalAddress?.state}
            setValue={handleChange}
          />
          <Input
            title="Pais"
            name="fiscalAddress.country"
            type="text"
            required={true}
            value={adviser.fiscalAddress?.country}
            setValue={handleChange}
          />
        </div>

        <div className="col-span-full">
          <div className="col-span-full mt-3 flex justify-center text-center">
            {errorCreateAdviser && (
              <Alert title="Informacion incompleta" text={errorCreateAdviser} />
            )}
          </div>
          <div className="col-span-full flex justify-center text-center">
            <Button
              type="onSubmit"
              color={sidenavColor}
              className="mt-6 flex justify-center rounded-md p-2 px-4 text-center text-lg font-normal text-white hover:bg-opacity-90"
              fullWidth
            >
              {loadingCreateAdviser && (
                <img
                  src="/assets/loader.svg"
                  className="my-auto mr-3 h-6 w-6"
                />
              )}
              {loadingCreateAdviser ? "Creando..." : "Crear"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdviserCreate;
