import { Request, Response, NextFunction } from 'express';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api-error';

class UserController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('ValidationError', errors.array()));
            }
            const { email, password } = req.body;
            const userData = await userService.register(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true
            });
            return res.json(userData);
        } catch (e: unknown) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true
            });
            return res.json(userData);
        } catch (e: unknown) {
            next(e);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token).status(200);
        } catch (e: unknown) {
            next(e);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '');
        } catch (e: unknown) {
            next(e);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refreshToken(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
                secure: true
            });
            return res.json(userData);
        } catch (e: unknown) {
            next(e);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e: unknown) {
            next(e);
        }
    }
}

export default new UserController();
