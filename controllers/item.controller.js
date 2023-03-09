const Item = require("../model/item.model")


// get all items 

const getItems = async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).json({ items })

    } catch (err) {
        console.log(err)
    }
}


// add
const addItem = async (req, res) => {
    const { name, image, price, category, vital } = req.body
    const item = new Item({
        name,
        image,
        price,
        category,
        vital
    })

    try {
        await item.save()
    } catch (err) {
        console.log(err)
    }
    return res.status(200).json({ message: item })
}


// update

const updateItem = async (req, res) => {
    const { name, image, price, category, vital, id } = req.body

    try {
        await Item.findById(id, (error, foundItem) => {
            foundItem.name = name;
            foundItem.image = image;
            foundItem.price = price;
            foundItem.category = category;
            foundItem.vital = vital;
            foundItem.save()
        })
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json('updated')

}


// delete

const deleteItem = async (req, res) => {
    const { _id } = req.params

    try {
        await Item.findOneAndRemove(_id).exec()
        res.status(200).json("item removed")
    }
    catch (err) {
        res.json('not deleted')
    }

}

// upadte Price 

const updatePrice = async (req, res) => {
    const { _id, newPrice } = req.body

    try {
        await Item.findById(_id, (error, foundItem) => {
            foundItem.price = newPrice;
            foundItem.save()
        })
    }
    catch (err) {
        console.log(err)
    }
    return res.status(201).json('updated')


}


exports.getItems = getItems
exports.addItem = addItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem
exports.updatePrice = updatePrice









