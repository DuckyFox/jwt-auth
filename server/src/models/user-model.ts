import { Schema, model } from 'mongoose';
import { UserInterface } from '../types';

const UserSchema = new Schema<UserInterface>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, required: true, default: false },
    activationLink: { type: String }
});

export const UserModel = model('User', UserSchema);
