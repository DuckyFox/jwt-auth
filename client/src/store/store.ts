import { create } from 'zustand'
import {UserInterface} from "@/models/UserInterface";
import AuthService from "@/services/AuthService";
import { AxiosError } from 'axios';

interface UserState {
    user: UserInterface;
    isAuth: boolean;
    setAuth: (bool: boolean) => void;
    setUser: (user: UserInterface) => void;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
}

export const useUser = create<UserState>((set) => ({
    user: {} as UserInterface,
    isAuth: false,
    setAuth: (bool: boolean) => set({isAuth: bool}),
    setUser: (user: UserInterface) => set({user}),
    login: async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            set({isAuth: true})
            set({user: response.data.user})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    },
    register: async (email: string, password: string) => {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            set({isAuth: true})
            set({user: response.data.user})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    },
    logout: async () => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            set({isAuth: false})
            set({user: {} as UserInterface})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        }
    },
}))