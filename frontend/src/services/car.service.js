// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import axios from 'axios'

const vendors = ['Audi','BMW','Golf','Mazda','Ferari']
const bodyStyles = ['Coupe','Sedan','Truck','Hatchback'];
const transmissions = ['Auto','Menual','Robotic'];
const drivetrains = ['Rear-wheel drive','Front-wheel drive'];
const colors = ['Blue','Black','Red','Yellow','Green','Gray'];

const usersDemo = 
[
    {
        "_id": "u101",
        "fullname": "Shuki ben Shuki",
        "imgUrl": "/img/img1.jpg",
        "isAdmin": false,
        "username": "a",
        "password": "a"
    },
    {
        "_id": "u102",
        "fullname": "Puki ben Puki",
        "imgUrl": "/img/img2.jpg",
        "isAdmin": false,
        "username": "a",
        "password": "a"
    },
    {
        "_id": "u103",
        "fullname": "Muki ben Muki",
        "imgUrl": "/img/img3.jpg",
        "isAdmin": false,
        "username": "a",
        "password": "a"
    },
    {
        "_id": "u104",
        "fullname": "Cooki ben Cooki",
        "imgUrl": "/img/img4.jpg",
        "isAdmin": false,
        "username": "a",
        "password": "a"
    },
    {
        "_id": "u105",
        "fullname": "Ruti be Ruti",
        "imgUrl": "/img/img5.jpg",
        "isAdmin": true,
        "username": "a",
        "password": "a"
    }
]

const CAR_KEY = 'cars'
const CAR_URL = '//localhost:3030/api/car/'

_createCars()
var gFilterBy = { name: '', pageIdx: 0 }

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
    // console.log('filterBy:', filterBy)

    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&inStock=${filterBy.inStock}&type=${filterBy.type}&pageIdx=${filterBy.pageIdx}&pageSize=${filterBy.pageSize}&sortBy=${filterBy.sortBy}`
    // const cars = await httpService.get(`car${queryStr}`)
    // return cars
    const data =  await storageService.query('cars');
    const cars = data[0];
    const count = data[1];
    return data
}

async function getById(carId) {
    // const car = await httpService.get(`car/${id}`)
    // console.log('car:', car)
    // return car
    return await storageService.get('cars',carId)
}

async function remove(carId) {
    //return httpService.delete(`car/${id}`)
    return await storageService.delete('cars', carId)
}

async function save(car) {
    if (car._id) {
        const editedCar = await storageService.put('cars', car)
        return editedCar
    } else {
        const addedCar = await storageService.post('cars', car)
        return addedCar
    }
}

function getEmptyCar() {
    return {
        vendor: '',
        model: '',
        bodyStyle: '',
        year: null,
        transmission: '',
        drivetrain: '',
        mileage: 0,
        engine: '',
        exteriorColor: '',
        interiorColor: '',
        desc: '',
        equipments: [],
        owner: {},
        imgUrls: [],
        location: {
            address: '',
            lat: 0,
            lng: 0
        },
        comments: [],
        auction: 
        {
            bids: [],
            startPrice: 0,
            status: 'active',
            createdAt: null,
            duration: null
        }
    }
}

// Create Test Data:
function _createCars() {
    var users = JSON.parse(localStorage.getItem('users')) || []
    if (!users || !users.length) {
        users = usersDemo;
        localStorage.setItem('users', JSON.stringify(users))
    }
    const cars = JSON.parse(localStorage.getItem(CAR_KEY)) || []
    if (!cars || !cars.length) {
        for (let i=0;i<100;i++){
            cars.push(_createCar());
        }
        localStorage.setItem(CAR_KEY, JSON.stringify(cars))
    }
    return cars;
}

function _createCar(){
    const startPrice = makeRandomInt(20000,40000) 
    const car = {
        id: makeId(),
        vendor: makeRandom(vendors),
        model: makeId(4),
        bodyStyle: makeRandom(bodyStyles),
        year: makeRandomInt(2010,2021),
        transmission: makeRandom(transmissions),
        drivetrain: makeRandom(drivetrains),
        mileage: makeRandomInt(45000,70000),
        engine: '3.0L I-6',
        exteriorColor: makeRandom(colors),
        interiorColor: makeRandom(colors),
        desc: 'very nice car',
        equipments: ['equip1','equip2','equip3','equip4'],
        owner: makeRandomUser(usersDemo),
        imgUrls: ['shop.jpg','more1.jpg','more2.jpg'],
        location: {
            address: "Tel-Aviv, Rotshild 25",
            lat: 32.9898,
            lng: 12.28
        },
        comments: [
            {
                id: makeId(4),
                txt: "if i had the cash Id still be bidding",
                rate: makeRandomInt(1,5),
                by: makeRandomUser(usersDemo)
            },
            {
                id: makeId(4),
                txt: "if i had the cash Id still be bidding",
                rate: makeRandomInt(1,5),
                by: makeRandomUser(usersDemo)
            },
            {
                id: makeId(4),
                txt: "if i had the cash Id still be bidding",
                rate: makeRandomInt(1,5),
                by: makeRandomUser(usersDemo)
            }
        ],
        auction: 
        {
            startPrice: startPrice,
            status: 'active',
            createdAt: Date.now(),
            duration: 1000*60*60*24*7,
            bids: [
                {
                    id: makeId(4),
                    by: makeRandomUser(usersDemo), 
                    bidPrice: startPrice + makeRandomInt(30001,40000),
                    createdAt: Date.now() + 1000*60*60*24
                },
                {
                    id: makeId(4),
                    by: makeRandomUser(usersDemo), 
                    bidPrice: startPrice + makeRandomInt(20001,30000),
                    createdAt: Date.now() + 1000*60*60*24*2
                },
                {
                    id: makeId(4),
                    by: makeRandomUser(usersDemo), 
                    bidPrice: startPrice + makeRandomInt(10001,20000),
                    createdAt: Date.now() + 1000*60*60*24*3
                },
            ],
        }
    }
    return car
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeRandom(array){
    console.log(array)
    return array[Math.floor(Math.random() * array.length)];
}

function makeRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeRandomUser(users) {
    console.log(users)
    const idx = makeRandomInt(0,users.length-1);
    var minimalUser = {
        _id: users[idx]._id,
        fullname: users[idx].fullname,
        imgUrl: users[idx].imgUrl
    }
    return minimalUser
}

