
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import axios from 'axios'

const CAR_KEY = 'cars'
const CAR_URL = '//localhost:3030/api/car/'


// _createCars()
// var gFilterBy = { name: '', pageIdx: 0 }

export const reviewService = {
    query,
    remove,
    save,

    // getCarsCountByUserId
}


async function query(filterBy) {
console.log('filterBy in review service:', filterBy)

    var queryStr = (!filterBy) ? '' : `?carId=${filterBy.carId}`
    const reviews = await httpService.get(`review/${queryStr}`)
    console.log('reviews:', reviews)
    return reviews
}


async function remove(id) {
    return httpService.delete(`car/${id}`)

}
// function remove(id) {
//     // return storageService.remove(CAR_KEY, id)
//     // return axios.get(CAR_URL + id + '/remove').then(res => res.data)

//     return axios.delete(CAR_URL + id).then(res => res.data)
// }

async function save(review) {
    // const user = userService.getLoggedinUser()
    // if (!user) throw new Error('Have to login')
    // review.owner = user.fullname
    const addedReview = await httpService.post(`review/`, review)
    console.log('addedReview:', addedReview)
    return addedReview
    // return storageService.post(CAR_KEY, {...car, createdAt: Date.now()})
    // return axios.post(CAR_URL, car).then(res => res.data)

}






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