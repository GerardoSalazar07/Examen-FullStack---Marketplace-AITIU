import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { adminListProducts } from "../../actions/productActions";
import { adminCreateOrder } from "../../actions/orderActions";

import Alert from "../../components/alerts/Alert";
import Loader from "../../components/Loader";

import Logo from "../../assets/AitiuLogo.png";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const createOrder = () => {
    dispatch(adminCreateOrder({
      product: product._id
    }));
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {/* <img className="h-64 w-full object-cover" src={require(`./images/${product.image}`).default} alt={product.name} /> */}
      <img className="h-64 w-full object-cover" src={product.image || "https://placehold.co/600x400"} alt={product.name} />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-2">${product.price}</p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={createOrder}>Comprar</button>
      </div>
    </div>
  );
}

const ShopScreen = () => {
  const dispatch = useDispatch();

  const adminProductList = useSelector((state) => state.adminProductList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    success,
    products,
  } = adminProductList;
  console.log(products)

  useEffect(() => {
    if (!success && !errorProducts) {
      dispatch(adminListProducts());
    }
  }, [success, errorProducts, dispatch]);

  const adminOrderCreate = useSelector((state) => state.adminOrderCreate);
  const {
    loading: loadingCreateOrder,
    error: errorCreateOrder,
  } = adminOrderCreate;

  return (
    <>
      {loadingProducts || loadingCreateOrder ? (
        <div className="flex w-full h-[calc(100vh-107px)] justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex">
          <div className="mx-auto mt-16 w-full max-w-sm lg:max-w-5xl">
            <div>
              <div className="flex justify-center">
                <img className="h-auto w-40" src={Logo} alt="Your Company" />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-semibold mb-4 text-center">Tienda</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="mt-3 flex justify-center">
                {errorCreateOrder && (
                  <Alert title="Error al registrar la compra" text={errorCreateOrder} />
                )}
              </div>
              <div className="mt-8 flex justify-center">
                <Link to="/" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg">
                  Regresar al Incio
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopScreen;
