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
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL || '')
        } catch (e: unknown) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e: unknown) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['2123','2321321','231312'])
        } catch (e: unknown) {
            next(e)
        }
    }
}

export default new UserController()