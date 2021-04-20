import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class UserTokenMiddleWare implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.authorization;
            token = new String(req.headers.authorization).split(" ")[1];
            const verifiedToken = await admin.auth().verifyIdToken(token);
            console.log(verifiedToken);
            if (!(verifiedToken.admin || verifiedToken.user)) {
                throw new Error("Nor an admin or a User");
            }
            next();
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Error: ${err.message}`
            }, 401);
        }
    }
}