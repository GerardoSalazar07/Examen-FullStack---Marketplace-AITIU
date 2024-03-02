import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/AitiuLogo.png";

const HomeScreen = () => {
  return (
    <>
      <div className="flex">
        <div className="mx-auto mt-16 w-full max-w-sm lg:max-w-5xl">
          <div>
            <div className="flex justify-center">
              <img className="h-auto w-40" src={Logo} alt="AITIU Marketplace" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold mb-4 text-center">¡Bienvenido a AITIU Marketplace!</h2>
            <p className="text-lg text-gray-700 text-center mb-6">Descubre una nueva experiencia de compra online con nosotros.</p>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Acerca de AITIU</h3>
                <p className="text-gray-700">En AITIU, nos esforzamos por ofrecer la mejor selección de productos y una experiencia de compra excepcional para nuestros clientes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Nuestros Valores</h3>
                <p className="text-gray-700">Nos comprometemos a la calidad, la integridad y la satisfacción del cliente en todo lo que hacemos.</p>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-x-5">
              <Link to="/shop" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg">
                Ir a la Tienda
              </Link>
              <Link to="/login" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg">
                Ingresar
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="text-3xl font-semibold text-center">¡Únete a nuestra comunidad!</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
