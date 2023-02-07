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
    const { name, image, price, category } = req.body
    const item = new Item({
        name,
        image,
        price,
        category
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
    const { name, image, price, category, id } = req.body

    try {
        await Item.findById(id, (error, foundItem) => {
            foundItem.name = name;
            foundItem.image = image;
            foundItem.price = price;
            foundItem.category = category;
            foundItem.save()
        })
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json('updated')

}


// delete

const deleteItem = async (req, res) => {
    const { id } = req.body

    try {
        await Item.findOneAndRemove(id).exec()
        res.status(200).json("item removed")
    }
    catch (err) {
        res.json('not deleted')
    }

}


exports.getItems = getItems
exports.addItem = addItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem







