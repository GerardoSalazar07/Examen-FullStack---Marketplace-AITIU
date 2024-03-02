import { UserGroupIcon, TagIcon, TruckIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { AdviserList, AdviserCreate, AdviserEdit, ProductList, ProductCreate, ProductEdit, OrderList, OrderCreate, OrderEdit } from "./pages/user/admin";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    userType: "Adviser",
    layout: "adviser",
    pages: [
      {
        icon: <TruckIcon {...icon} />,
        name: "Ordenes",
        path: "/ordenes",
        isList: false,
        element: <OrderList />,
        subpages: [
          {
            icon: <TruckIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <OrderEdit />,
            hide: true,
          },
        ],
      },
    ],
  },

  {
    title: "CRUD",
    userType: "Admin",
    layout: "admin",
    pages: [
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Proveedores",
        path: "/proveedores",
        isList: true,
        element: <AdviserList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <AdviserCreate />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <AdviserEdit />,
            hide: true,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <AdviserList />,
            hide: true,
          },
        ],
      },

      {
        icon: <TagIcon {...icon} />,
        name: "Productos",
        path: "/productos",
        isList: true,
        element: <ProductList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <ProductCreate />,
          },
          {
            icon: <TagIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <ProductEdit />,
            hide: true,
          },
          {
            icon: <TagIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <ProductList />,
            hide: true,
          },
        ],
      },

      {
        icon: <TruckIcon {...icon} />,
        name: "Ordenes",
        path: "/ordenes",
        isList: false,
        element: <OrderList />,
        subpages: [
          {
            icon: <PlusCircleIcon {...icon} />,
            name: "Crear",
            path: "/crear",
            element: <OrderCreate />,
          },
          {
            icon: <TruckIcon {...icon} />,
            name: "Editar",
            path: "/:id/editar",
            element: <OrderEdit />,
            hide: true,
          },
          {
            icon: <TruckIcon {...icon} />,
            name: "Eliminar",
            path: "/:id/eliminar",
            element: <OrderList />,
            hide: true,
          },
        ],
      },
    ],
  },
];

export default routes;
