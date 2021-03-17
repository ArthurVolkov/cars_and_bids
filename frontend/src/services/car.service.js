// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import axios from 'axios'

const CAR_KEY = 'cars'
const CAR_URL = '//localhost:3030/api/car/'


// _createCars()
// var gFilterBy = { name: '', pageIdx: 0 }

export const carService = {
    query,
    remove,
    save,
    getEmptyCar,
    getById,
    setFilter,
    nextPage,
    // saveReview
    // getCarsCountByUserId
}


function setFilter(filterBy) {
    gFilterBy.title = filterBy.title
    gFilterBy.pageIdx = 0;
}
function nextPage() {
    gFilterBy.pageIdx++
}

async function query(filterBy) {
console.log('filterBy:', filterBy)

    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&inStock=${filterBy.inStock}&type=${filterBy.type}&pageIdx=${filterBy.pageIdx}&pageSize=${filterBy.pageSize}&sortBy=${filterBy.sortBy}`
    const cars = await httpService.get(`car${queryStr}`)
    console.log('cars:', cars)
    return cars
}
// function query(filterBy) {
//     console.log('filterBy in front-service:', filterBy)
//     // return storageService.query(CAR_KEY)
//     return axios.get(CAR_URL, { params: filterBy })
//         .then(res => res.data)
//     // return axios.get(CAR_URL, { params: gFilterBy })
//     //     .then(res => res.data)
// }

// function getById(id) {
//     // return storageService.get(CAR_KEY, id)
//     return axios.get(CAR_URL + id).then(res => res.data)
// }

async function getById(id) {
    const car = await httpService.get(`car/${id}`)
    console.log('car:', car)
    return car
}


async function remove(id) {
    return httpService.delete(`car/${id}`)

}
// function remove(id) {
//     // return storageService.remove(CAR_KEY, id)
//     // return axios.get(CAR_URL + id + '/remove').then(res => res.data)

//     return axios.delete(CAR_URL + id).then(res => res.data)
// }

async function save(car) {
    if (car._id) {
        // return storageService.put(CAR_KEY, car)

        const editedCar = await httpService.put(`car/${car._id}`, car)
        return editedCar

        // return axios.put(CAR_URL + car._id, car)
        //     .then(res => res.data)
        //     .catch(err => { throw new Error(err.message) })
    } else {
        const addedCar = await httpService.post('car', car)
        return addedCar
        // return storageService.post(CAR_KEY, {...car, createdAt: Date.now()})
        // return axios.post(CAR_URL, car).then(res => res.data)
    }
}

// async function saveReview(review) {
//     // const user = userService.getLoggedinUser()
//     // if (!user) throw new Error('Have to login')
//     // review.owner = user.fullname
//     const addedReview = await httpService.post(`review/`, review)
//     return addedReview
//     // return storageService.post(CAR_KEY, {...car, createdAt: Date.now()})
//     // return axios.post(CAR_URL, car).then(res => res.data)

// }






function getEmptyCar() {
    return { name: '', price: 150, type: 'Funny', inStock: true }
}

// function getCarsCountByUserId(userId) {
//     return axios.get(CAR_URL)
//         .then(res => console.log('getCarsCountByUserId res:', res))
//         // .then(res => res.data)
// }



// Create Test Data:
function _createCars() {
    var cars = JSON.parse(localStorage.getItem(CAR_KEY))
    if (!cars || !cars.length) {
        cars = demoCars
        localStorage.setItem(CAR_KEY, JSON.stringify(cars))
    }
    return cars;
}