import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
// import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { ORDER_ADMIN_DELETE_RESET, ORDER_ADMIN_LIST_RESET } from "../../../../constants/orderConstants";
import { adminListOrders } from "../../../../actions/orderActions";

//import Empty from "../../../components/Admin/Empty";
//import SearchBox from "../../../components/SearchBox";
//import Paginate from "../../../components/Paginate";
import Loader from "../../../../components/Loader";
import Delete from "./Delete";

export function OrderList() {
  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;
  const sort = useParams().sort;
  const order = useParams().order;
  // const [keywordSearch, setKeywordSearch] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [prevSearch, setPrevSearch] = useState(false);
  // const [sortName, setSortName] = useState("");
  // const [sortSkuTrep, setSortSkuTrep] = useState("");
  // const [sortBrand, setSortBrand] = useState("");
  // const [sortCountInStock, setSortCountInStock] = useState("");
  // const [countView, setCountView] = useState(10);
  // const [search, setSearch] = useState("");
  const [countView] = useState(10);
  const [search] = useState("");

  const [viewModal, setViewModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const adminOrderList = useSelector((state) => state.adminOrderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    success,
    orders,
    // page,
    // pages,
  } = adminOrderList;

  const [listArticle, setListArticle] = useState(orders ? orders : []);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  
  // const submitSearch = () => {
  //   dispatch({ type: ORDER_ADMIN_LIST_RESET });
  //   setPrevSearch(true);
  //   if (keywordSearch.trim()) {
  //     navigate(`/admin/orders/search/${keywordSearch}`);
  //   }
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     submitSearch();
  //   }
  // };

  // const submitSort = (field) => {
  //   dispatch({ type: ORDER_ADMIN_LIST_RESET });
    
  //   var newSort = "";
  //   var newOrder = "";

  //   switch (field) {
  //     case "name":
  //       newSort = field;
  //       newOrder = sortName === "descending" ? "ascending" : "descending";
  //       setSortBrand("");
  //       setSortCountInStock("");
  //       setSortSkuTrep("");
  //       setSortName(newOrder);
  //       break;
  //     case "skuTrep":
  //       newSort = field;
  //       newOrder = sortSkuTrep === "descending" ? "ascending" : "descending";
  //       setSortBrand("");
  //       setSortCountInStock("");
  //       setSortSkuTrep(newOrder);
  //       setSortName("");
  //       break;
  //     case "brand":
  //       newSort = field;
  //       newOrder = sortBrand === "descending" ? "ascending" : "descending";
  //       setSortBrand(newOrder);
  //       setSortCountInStock("");
  //       setSortSkuTrep("");
  //       setSortName("");
  //       break;
  //     case "countInStock":
  //       newSort = field;
  //       newOrder =
  //         sortCountInStock === "descending" ? "ascending" : "descending";
  //       setSortBrand("");
  //       setSortCountInStock(newOrder);
  //       setSortSkuTrep("");
  //       setSortName("");
  //       break;
  //     default:
  //       break;
  //   }

  //   if (keyword) {
  //     navigate(
  //       `/admin/orders/search/${keyword}/sort/${newSort}/order/${newOrder}`
  //     );
  //   } else {
  //     navigate(`/admin/orders/sort/${newSort}/order/${newOrder}`);
  //   }
  // };

  const newSize = (size) => {
    setPageSize(size);
    dispatch({ type: ORDER_ADMIN_LIST_RESET });
    navigate(`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes`);
  };

  // const redirect = "/login";
  useEffect(() => {
    let newArray = orders;
    if (search.length > 0) {
      //funcion de busqueda
      newArray = orders.filter((element) =>
        element.name.toLowerCase().includes(search)
      );
    }
    
    if (!success && !errorOrders) {
      dispatch(adminListOrders(keyword, pageNumber, pageSize, sort, order));
    }

    if (id) {
      var link = document.location.href.split("/");
      if (link[link.length - 1] === "eliminar") {
        actionOpenDeleteModal();
      }
    } else {
      setViewModal(false);
      dispatch({
        type: ORDER_ADMIN_DELETE_RESET,
      });
    }

    setListArticle(newArray);
  }, [countView, pageNumber, pageSize, search, order, keyword, sort, orders, success, errorOrders, id, dispatch]);

  const actionOpenDeleteModal = () => {
    setViewModal("delete");
  };

  const ORDER_STATUS = {
    "Pending": "Pendiente",
    "In process": "En Proceso",
    "Sent": "Enviado",
    "Delivered": "Entregado"
  }
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {viewModal !== false && viewModal === "delete" && (
        <Delete closeAction={() => setViewModal(false)} id={id} />
      )}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <div className="flex items-center">
            <Typography variant="h6" color="white">
              Órdenes
            </Typography>

            <div className="flex w-full flex-wrap items-center justify-end  gap-3">
              {userInfo && userInfo.userType === "Admin" && 
              <Link to={`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes/crear`} className="justify-end">
                <Button variant="gradient" color="white">
                  Crear
                </Button>
              </Link>}
              <span>Mostrar:</span>
              <select
                name="pageSize"
                id="pageSize"
                className="h-8 w-12 rounded-md p-1 text-xs text-black shadow-sm"
                value={pageSize}
                onChange={(e) => newSize(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {loadingOrders ? (
            <div className="flex w-full justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Fecha", "Producto", "Paquetería", "Número de Rastreo", "Estatus", ""].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {listArticle?.map(
                    (
                      {
                        _id,
                        createdAt,
                        product,
                        shippingCompany,
                        trackingNumber,
                        status,
                      },
                      key
                    ) => {
                      const className = `py-3 px-5 ${
                        key === listArticle.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;
                      return (
                        <tr key={_id}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {`${(new Date(createdAt)).getDate().toString().padStart(2, '0')}-${((new Date(createdAt)).getMonth() + 1).toString().padStart(2, '0')}-${(new Date(createdAt)).getFullYear()} ${(new Date(createdAt)).getHours().toString().padStart(2, '0')}:${(new Date(createdAt)).getMinutes().toString().padStart(2, '0')} ${(new Date(createdAt)).getHours() >= 12 ? 'PM' : 'AM'}`}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {product.name}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {shippingCompany ? shippingCompany : ""}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {trackingNumber ? trackingNumber : ""}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-semibold"
                                >
                                  {ORDER_STATUS[status]}
                                </Typography>
                              </div>
                            </div>
                          </td>

                          <td className={className}>
                            <Link to={`/${userInfo && userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes/${_id}/editar`}>
                              <Typography
                                as="a"
                                href="#"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-blue-500"
                              >
                                Editar
                              </Typography>
                            </Link>
                            {userInfo && userInfo.userType === "Admin" && 
                            <Link to={`/${userInfo.userType === "Admin" ? 'admin' : 'adviser'}/ordenes/${_id}/eliminar`}>
                              <Typography
                                as="a"
                                className="text-xs font-semibold text-blue-gray-600 hover:text-red-500"
                              >
                                Eliminar
                              </Typography>
                            </Link>
                            }
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default OrderList;
