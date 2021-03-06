const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
// const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
//  const criteria = {}
    const skip = filterBy.pageIdx * filterBy.pageSize
    const limit = +filterBy.pageSize
    try {
        const collection = await dbService.getCollection('cars')
        if (filterBy.sortBy === 'ending-soon'){
            var sortBy = { 'auction.createdAt' : -1 }    
        } else if (filterBy.sortBy === 'newly-listed') {
            sortBy = { 'auction.createdAt' : 1 }        
        } else if (filterBy.sortBy === 'lowest-mileage') {
            sortBy = { 'mileage' : 1 }
        }
        var cars = await collection.find(criteria).sort(sortBy).skip(skip).limit(limit).toArray()
        var count = await collection.count()
        return [cars, count]
    } catch (err) {
        logger.error('Cannot find car', err)
        throw err
    }
}

async function getById(carId) {
    try {
        console.log('AAAAA',carId)
        const collection = await dbService.getCollection('cars')
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
        const carToAdd = car
        // {
            // name: car.name,
            // price: car.price,
            // type: car.type,
            // createdAt: Date.now(),
            // inStock: true
        // }
        //console.log('HAHA',car)

        const collection = await dbService.getCollection('cars')
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
    //console.log(filterBy)
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.$or = [
            {
                vendor: txtCriteria
            },
            {
                bodyStyle: txtCriteria
            },
            {
                transmission: txtCriteria
            },
            {
                drivetrain: txtCriteria
            },
            {
                engine: txtCriteria
            },
            {
                exteriorColor: txtCriteria
            },
            {
                interiorColor: txtCriteria
            },
            {
                desc: txtCriteria
            }
        ]
    }
    if (filterBy.bodyStyles && filterBy.bodyStyles !== 'all') {
        criteria.bodyStyle = { $eq: filterBy.bodyStyles }
    }
    if (filterBy.vendors && filterBy.vendors !== 'all') {
        const vendors = filterBy.vendors.split(',')
        criteria.vendor = { $in: vendors }
    }
    const years = filterBy.years.split(',').map(x=>+x);
    criteria.year = { $gt: years[0], $lte: years[1] }
    console.log(criteria)
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

