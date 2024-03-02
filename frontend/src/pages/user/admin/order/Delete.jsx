import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";

import { adminDeleteOrder, adminDetailsOrder } from "../../../../actions/orderActions";
import { getLoginData } from "../../../../actions/userActions";

import Loader from "../../../../components/Loader";

export function OrderDelete({ closeAction, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  // const { loading, error, userInfo } = userLogin;
  const { loading, userInfo } = userLogin;

  const adminOrderDetails = useSelector((state) => state.adminOrderDetails);
  const {
    loading: loadingDetails,
    // error: errorDetails,
    orderDetails,
  } = adminOrderDetails;

  const adminOrderDelete = useSelector((state) => state.adminOrderDelete);
  const {
    loading: loadingDelete,
    // error: errorDelete,
    message,
  } = adminOrderDelete;

  const redirect = "/login";
  useEffect(() => {
    if ((id && !orderDetails) || (id && orderDetails._id !== id)) {
      dispatch(adminDetailsOrder(id));
    }

    if (!userInfo) {
      dispatch(getLoginData());
    } else if (userInfo.userType !== "Admin") {
      navigate(redirect);
    }

    if (message) {
      navigate(`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes`);
    }
  }, [id, orderDetails, message, userInfo, dispatch, navigate]);

  const submitHandler = () => {
    dispatch(adminDeleteOrder(id));
  };

  const closeHandler = () => {
    navigate(`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes`);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/30">
        {loading || loadingDetails ? (
          <Loader />
        ) : (
          <div className="relative max-h-[90%]  w-11/12 overflow-hidden rounded-md bg-white shadow lg:w-1/2 2xl:w-2/6">
            <div className="flex w-full items-center justify-between rounded-t-md bg-blue-gray-800 p-2 px-4 text-white">
              <h2 className="text-2xl  text-white">Eliminar Órden</h2>
              <button
                type="button"
                onClick={closeHandler}
                className="text-2xl font-bold hover:text-red-600"
              >
                <MdClose />
              </button>
            </div>
            <form
              className="flex flex-col gap-2 "
              onSubmit={(e) => {
                e.preventDefault();
                submitHandler();
              }}
            >
              <div className="flex flex-col justify-center gap-3">
                <div className="my-3 flex justify-center">
                  <AiOutlineWarning className="h-24 w-24 fill-red-600" />
                </div>
                <div className="my-3 flex justify-center">
                  ¿Seguro que deseas eliminar esta órden?
                </div>

                <div className="mt-6 flex justify-center text-center">
                  <button className="mb-6 flex rounded-full bg-red-300 p-2 px-4 text-lg text-gray-300 hover:bg-red-900 hover:text-white hover:shadow-2xl">
                    {loadingDelete && (
                      <img
                        src="/assets/loader.svg"
                        className="my-auto mr-3 h-6 w-6"
                        alt=""
                      />
                    )}
                    {loadingDelete ? "Eliminando..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderDelete;
