let orders = [];

function placeOrder(order){
    if(!order)
        return null;
    order.orderId = Math.floor((Math.random() * 10000) + 1); // this should not be done hear
    orders.push(order);
}

function getOrders(){
    return orders;
}

export{
    placeOrder, getOrders
};