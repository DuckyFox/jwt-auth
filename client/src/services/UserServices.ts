import $api from "@/http";
import { AxiosResponse } from "axios";
import { UserInterface } from "@/models/UserInterface";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<UserInterface[]>> {
    return $api.get<UserInterface[]>("users");
  }
}
