import { Request, Response, NextFunction, json } from 'express';
import jwt from 'jsonwebtoken';

interface IUserToken {
    user: {
        _id: string;
    }
    iat:number;
    exp:number;

}

export const validateToken = (req:Request, res:Response, next:NextFunction) => {

    if(!req.body.token){
        return res.status(401).json('Access denied');
    }
    let payload = jwt.verify(req.body.token, process.env.TOKEN_SECRET || 'mytoken') as IUserToken;
    // console.log(payload);
    req.userId = payload.user._id;

    next();
}