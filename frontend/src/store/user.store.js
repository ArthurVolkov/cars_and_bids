import { userService } from "../services/user.service";

export const userStore = {
    state: {
        user: userService.getLoggedinUser(),
    },
    getters: {
        loggedinUser(state) {
            // console.log('userService.LoggedinUser:', userService.getLoggedinUser())
            return state.user
        }
    },
    mutations: {

    },
    actions: {
        async signUp(context, { user }) {
            console.log('user in store signUp:', user)
            try {
                const signupedUser = await userService.signUp(user)
                context.state.user = userService.getLoggedinUser()
                return signupedUser
            } catch (err) {
                throw err
            }

        },
        async login(context, { user }) {
            console.log('user in store login:', user)
            try {
                const loggedinUser = await userService.login(user)
                context.state.user = userService.getLoggedinUser()
                return loggedinUser
            } catch (err) {
                throw err
            }

        },
        async logout(context) {
            console.log('store logout:')
            try {
                const logout = await userService.logout()
                context.state.user = null
                console.log('logout:', logout)
                return logout
            } catch (err) {
                throw err
            }
        }
    }
}