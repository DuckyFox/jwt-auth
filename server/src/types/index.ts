import { type Document, type Types } from 'mongoose';

export interface UserInterface extends Document {
    email: string;
    password: string;
    isActivated: boolean;
    activationLink?: string;
}

export interface TokenInterface extends Document {
    user: Types.ObjectId;
    refreshToken: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TokenPayloadInterface {
    email: string;
    id: Types.ObjectId;
    isActivated: boolean;
}