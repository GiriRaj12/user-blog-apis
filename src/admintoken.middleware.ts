import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AdminTokenMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let req_token = req.headers.authorization;
            const token = new String(req_token).split(" ")[1];
            const verifiedToken = await admin.auth().verifyIdToken(token);
            console.log(verifiedToken);
            if (!verifiedToken.admin) {
                throw new Error("Not verified");
            }
            next();
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Token is not for Admin'
            }, 401);
        }
    }
}