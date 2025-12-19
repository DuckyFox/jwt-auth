import { create } from 'zustand'
import {UserInterface} from "@/models/UserInterface";
import AuthService from "@/services/AuthService";
import axios, { AxiosError } from 'axios';
import {AuthResponse} from "@/models/response/AuthResponse";
import {API_URL} from "@/http";

interface UserState {
    user: UserInterface;
    isAuth: boolean;
    setAuth: (bool: boolean) => void;
    setUser: (user: UserInterface) => void;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
    checkAuth: () => void;
    isLoading: boolean;
    setLoading: (bool: boolean) => void;
}

export const useUser = create<UserState>((set) => ({
    user: {} as UserInterface,
    isAuth: false,
    isLoading: false,
    setAuth: (bool: boolean) => set({isAuth: bool}),
    setUser: (user: UserInterface) => set({user}),
    setLoading: (bool: boolean) => set({isLoading: bool}),
    login: async (email: string, password: string) => {
        set({isLoading:true})
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            set({isAuth: true})
            set({user: response.data.user})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        } finally {
            set({isLoading: false})
        }
    },
    register: async (email: string, password: string) => {
        set({isLoading:true})
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            set({isAuth: true})
            set({user: response.data.user})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        } finally {
            set({isLoading: false})
        }
    },
    logout: async () => {
        set({isLoading:true})
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('token')
            set({isAuth: false})
            set({user: {} as UserInterface})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        } finally {
            set({isLoading: false})
        }
    },
    checkAuth: async () => {
        set({isLoading:true})
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            set({isAuth: true})
            set({user: response.data.user})
        } catch (e: unknown) {
            if (e instanceof AxiosError) {
                console.log(e.response?.data?.message);
            }
        } finally {
            set({isLoading: false})
        }
    }
}))