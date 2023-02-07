const Order = require('../model/order.model')


// add new order

const addOrder = async (req, res) => {
    const { customerName, cart, cartTotal, checkedIn, subTotal } = req.body
    const order = new Order({
        customerName,
        cart,
        cartTotal,
        checkedIn,
        subTotal
    })

    try {
        await order.save()
    } catch (err) {
        console.log(err)
    }
    return res.status(200).json({ order })
}

exports.addOrder = addOrder
