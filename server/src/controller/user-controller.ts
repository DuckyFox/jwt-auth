import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await userService.register(email, password)
            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000, secure: true })
            return res.json(userData)
        } catch (e: unknown) {
            console.log(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {

        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {

        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {

        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['2123','2321321','231312'])
        } catch (e: unknown) {

        }
    }
}

export default new UserController()