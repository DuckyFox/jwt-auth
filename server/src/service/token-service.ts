import jwt from 'jsonwebtoken';
import { TokenModel } from '../models/token-model';
import type { Types } from 'mongoose';
import { TokenPayloadInterface } from '../types';

class TokenService {
    generateToken(payload: TokenPayloadInterface) {
        if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
            throw new Error('JWT secrets not configured');
        }

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d'
        });
        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token: string) {
        try {
            if (!process.env.JWT_ACCESS_SECRET) {
                return null;
            }
            const userData = jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET
            ) as TokenPayloadInterface;
            return userData;
        } catch {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            if (!process.env.JWT_REFRESH_SECRET) {
                return null;
            }
            const userData = jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET
            ) as TokenPayloadInterface;
            return userData;
        } catch {
            return null;
        }
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await TokenModel.findOne({ user: userId });
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });
        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({ refreshToken });
        return tokenData;
    }
}

export default new TokenService();
