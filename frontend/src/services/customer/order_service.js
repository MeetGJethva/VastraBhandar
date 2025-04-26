import { apiDelete, apiGet, apiPost } from "../backend_service/apiservice";
import API_ENDPOINTS from "../backend_service/constants";

let orders = [];

async function placeOrder(order, user = {}) {
  if (!order) return null;

  orders.push(order);
  // order.orderId = Math.floor((Math.random() * 10000) + 1); // this should not be done hear
  const response = await apiPost(
    API_ENDPOINTS.ORDER.ADD,
    order,
    {},
    user.email,
    user.plainPassword
  );
  if (response.status === 201) {
    console.log("rsponse");
    console.dir(response);
    return response.data;
  } else {
    throw new Error(
      response.message || response.error || "An unknown error occurred"
    );
  }
}

async function getOrders(user) {
  const response = await apiGet(
    API_ENDPOINTS.ORDER.GET_BY_ID + `/${user.email}`,
    {},
    {},
    user.email,
    user.plainPassword
  );
  // console.dir(response)
  if (response.status === 200) {
    return response.data;
  } else {
    throw Error(response.message || response.error);
  }
}

async function cancleOrder(orderId, user) {
  const response = await apiDelete(
    API_ENDPOINTS.ORDER.DELETE + `/${orderId}`,
    {},
    user.email,
    user.plainPassword
  );

  if (response.status === 204) {
    return;
  } else {
    throw Error(
      response.message || response.error || "An unknown error occurred"
    );
  }
}

export { placeOrder, getOrders, cancleOrder };
