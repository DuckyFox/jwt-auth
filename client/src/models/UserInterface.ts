import { type Types } from "mongoose";

export interface UserInterface {
  email: string;
  isActivated: boolean;
  id: Types.ObjectId;
}
