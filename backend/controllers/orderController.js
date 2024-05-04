import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';



// @desc Create New Order
// @route POST /api/orders
// @access Private
const addOrderItems= asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
        return;
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                
                    ...x,
                    product : x._id,
                    _id: undefined    

                })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }

});

// @desc Get Logged in users orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders= asyncHandler(async (req, res) => {

    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);

});


// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email');


    if (order) {
        res.status(201).json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

});


// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {

    res.send('update order to paid');

});


// @desc Update order to deliveered
// @route GET /api/orders/:id/pay/deliver
// @access Private
const updateOrderToDeliver = asyncHandler(async (req, res) => {

    res.send('update order to delivered');

});


// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {

    res.send('get all orders');

});


export { 
         addOrderItems,
         getMyOrders,
         getOrderById,
         updateOrderToPaid,
         updateOrderToDeliver, 
         getOrders 
        };