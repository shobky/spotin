const Order = require('../model/order.model')


// add new order

const addOrder = async (req, res) => {
    const { customerName, cart, cartTotal, checkedIn, tickets, subTotal, status, timeSpent, ticketsPrice } = req.body

    const order = new Order({
        customerName,
        cart,
        cartTotal,
        checkedIn,
        tickets,
        ticketsPrice,
        subTotal,
        status,
        timeSpent
    })

    try {
        await order.save()
    } catch (err) {
        console.log(err)
    }
    return res.status(200).json({ order })
}

// get all orders

const getOrders = async (req, res, next) => {

    const { start, end } = req.params
    try {
        const orders = await Order.find({
            $or: [
                { status: 'open' },
                { createdAt: { $gte: start, $lte: end } }
            ]
        });
        
        res.status(200).json({ orders })

    } catch (err) {
        console.log(err)
    }
}

// get one order with id

const getOrderById = async (req, res, next) => {

    Order.findById(req.params.id)
        .then((order) => {
            res.status(200).json({
                order: order
            })
        })
};

// update order 

const updateOrder = async (req, res) => {
    const { tickets, subTotal, ticketsPrice, status, timeSpent, id, cart, cartTotal } = req.body
    try {

        await Order.findById(id, (error, foundItem) => {
            foundItem.status = status;
            foundItem.tiemSpent = timeSpent;
            foundItem.cart = cart;
            foundItem.cartTotal = cartTotal;
            foundItem.tickets = tickets;
            foundItem.ticketsPrice = ticketsPrice;
            foundItem.subTotal = subTotal;
            foundItem.save()
        })
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json('updated')

}


exports.addOrder = addOrder
exports.getOrderById = getOrderById
exports.getOrders = getOrders
exports.updateOrder = updateOrder





