import { carService } from "../services/car.service";
import { reviewService } from "../services/review.service";

export const carStore = {
    state: {
        cars: [],
        carsCount: 0,
  
        filterBy: {
            pageIdx: 0,
            pageSize: 6,
        },
        isLoading: false,
    },
    getters: {
        carsCount(state) {
            return state.carsCount
        },
        carsToShow(state) {
            return state.cars
        },
        commentsToShow(state) {
            return state.comments
        },
        loading(state) {
            return state.isLoading
        }
    },
    mutations: {
        setCars(state, { cars }) {
            state.cars = cars;
        },
        setCount(state, { count }) {
            state.carsCount = count;
        },
        setCars(state, payload) {
            state.cars = payload.cars;
        },
        addCar(state, { car }) {
            state.cars.unshift(car);
        },
        updateCar(state, { car }) {
            const idx = state.cars.findIndex(t => t._id === car._id)
            state.cars.splice(idx, 1, car);
        },
        removeCar(state, { car }) {
            const idx = state.cars.findIndex(t => t._id === car._id)
            state.cars.splice(idx, 1)
        },
        setFilter(state, { filterBy }) {
            state.filterBy.years = filterBy.years;
            state.filterBy.bodyStyles = filterBy.bodyStyles;
            state.filterBy.vendors = filterBy.vendors;
        },
        setFilterName(state, { name }) {
            //console.log('filterBy:', filterBy)
            state.filterBy.name = name;
        },
        setPage(state, { page }) {
            console.log('page:', page)
            console.log('filterBy:', state.filterBy)
            state.filterBy.pageIdx = page - 1
        },
        setSort(state, { sortBy }) {
            state.filterBy.sortBy = sortBy
        },
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
    },
    actions: {
        async loadCars(context) {
            context.commit({ type: 'setLoading', isLoading: true })
            try {
                const data = await carService.query(context.state.filterBy)
                const cars = data[0];
                const count = data[1];
                // console.log('cars', cars)
                context.commit({ type: 'setCars', cars });
                context.commit({ type: 'setCount', count });
            } catch (err) {
                console.log('Store: Cannot load cars', err);
                throw new Error('Cannot load cars');
            } finally {
                context.commit({ type: 'setLoading', isLoading: false })
            }
        },
        // async loadReviews(context, { filterBy }) {
        //     context.commit({ type: 'setLoading', isLoading: true })
        //     try {
        //         const reviews = await reviewService.query(filterBy)
        //         console.log('reviews in store:', reviews)
        //         context.commit({ type: 'setReviews', reviews });
        //     } catch (err) {
        //         console.log('Store: Cannot load reviews', err);
        //         throw new Error('Cannot load reviews');
        //     } finally {
        //         context.commit({ type: 'setLoading', isLoading: false })
        //     }
        // },
        async saveCar({ commit }, { car }) {
            const type = (car._id) ? 'updateCar' : 'addCar';
            try {
                const savedCar = await carService.save(car)
                commit({ type, car: savedCar })
                return savedCar

            } catch (err) {
                console.log('Store: Cannot save car', err);
                throw new Error('Cannot save car');
            }
        },
        async removeCar(context, payload) {
            try {
                const removed = await carService.remove(payload.car._id)
                context.commit(payload)
                return removed
            } catch (err) {
                console.log('Store: Cannot remove car', err);
                throw new Error('Cannot remove car');
            }
        },
        async addReview(context, { review }) {
            console.log('review:', review)
            try {
                const savedReview = await reviewService.save(review)
                console.log('savedReview:', savedReview)
                // context.commit({type: 'addReview', review: savedReview})
            } catch (err) {
                console.log('Store: Cannot save review', err);
                throw new Error('Cannot save review');
            }
        }
    }
}