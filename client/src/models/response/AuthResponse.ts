import { UserInterface } from "@/models/UserInterface";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserInterface;
}
