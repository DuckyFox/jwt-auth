import { Schema, model } from 'mongoose';
import { TokenInterface } from '../types';

const TokenSchema = new Schema<TokenInterface>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        refreshToken: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const TokenModel = model('Token', TokenSchema);
