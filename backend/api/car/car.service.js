const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
// const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    console.log('filterBy:', filterBy)
    const criteria = _buildCriteria(filterBy)
    const skip = filterBy.pageIdx * filterBy.pageSize
    const limit = +filterBy.pageSize
    try {
        const collection = await dbService.getCollection('car')
        var cars = await collection.find(criteria).sort({ [filterBy.sortBy]: 1 }).skip(skip).limit(limit).toArray()
        var count = await collection.count()
        return {cars, count}
    } catch (err) {
        logger.error('Cannot find car', err)
        throw err
    }
}

async function getById(carId) {
    try {
        const collection = await dbService.getCollection('car')
        const car = await collection.findOne({ '_id': ObjectId(carId) })
        return car
    } catch (err) {
        logger.error(`Error while finding car ${carId}`, err)
        throw err
    }
}

async function remove(carId) {
    try {
        const collection = await dbService.getCollection('car')
        await collection.deleteOne({ '_id': ObjectId(carId) })
    } catch (err) {
        logger.error(`Cannot remove car ${carId}`, err)
        throw err
    }
}

async function update(car) {
    try {
        // peek only updatable fields!
        const carToSave = {
            _id: ObjectId(car._id),
            name: car.name,
            price: car.price,
            type: car.type,
            inStock: car.inStock,
            reviews: car.reviews || []
        }
        const collection = await dbService.getCollection('car')
        await collection.updateOne({ '_id': carToSave._id }, { $set: carToSave })
        return carToSave;
    } catch (err) {
        logger.error(`Cannot update car ${car._id}`, err)
        throw err
    }
}

async function add(car) {
    try {
        // peek only updatable fields!
        const carToAdd = {
            // name: car.name,
            // price: car.price,
            // type: car.type,
            // createdAt: Date.now(),
            // inStock: true
        }
        const collection = await dbService.getCollection('car')
        await collection.insertOne(carToAdd)
        return carToAdd;
    } catch (err) {
        logger.error('cannot insert car', err)
        throw err
    }
}

async function addReview(review) {
    console.log('review:', review)
    review._id = _makeId()
    try {
        // const car = await getById(review.carId)
        // console.log('car:', car)
        // if (!car.reviews) car.reviews = []
        // car.reviews.push(review)
        // await update(car)
        // return review
    } catch (err) {
        logger.error('Cannot insert review', err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update,
    addReview
}



function _buildCriteria(filterBy) {
    const criteria = {}
    // if (filterBy.name) {
    //     criteria.name = { $regex: filterBy.name, $options: 'i' }
    // }
    // if (filterBy.type && filterBy.type !== 'all') {
    //     criteria.type = { $eq: filterBy.type }
    // }
    // if (filterBy.inStock && filterBy.inStock !== 'all') {
    //     criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
    // }
    return criteria
}



function _makeId(length = 8) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

