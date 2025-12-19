import {UserInterface} from "@/models/UserInterface";

export interface AuthResponse {
    accessToken: string,
    refreshToke: string,
    user: UserInterface,
}