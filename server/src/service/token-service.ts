import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import { TokenModel } from '../models/token-model';
import type { Types } from 'mongoose';
import { TokenPayloadInterface } from '../types';
import { ApiError } from '../exceptions/api-error';


const jwtAccSecret = process.env.JWT_ACCESS_SECRET || uuidv4()
const jwtRefSecret = process.env.JWT_REFRESH_SECRET || uuidv4()

class TokenService {
    generateToken(payload: TokenPayloadInterface) {
        const accessToken = jwt.sign(payload, jwtAccSecret, {expiresIn:'30m'});
        const refreshToken = jwt.sign(payload, jwtRefSecret, {expiresIn:'30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: Types.ObjectId, refreshToken: string) {
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await TokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken:string) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }
}

export default new TokenService()