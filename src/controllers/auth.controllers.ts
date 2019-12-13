import {Request, Response} from 'express';
import User, { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const signup = async (req:Request, res:Response) => {
    console.log(req.body);

    const user:IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    user.password = await user.encryptPassword(user.password);

    user.save((err, userdb) => {
        if(err){
            return res.json({
                err
            })
        }

        res.json({
            msj: userdb
        })
    })

}

export const signin = async (req:Request, res:Response) => {
    
    const user = await User.findOne({email: req.body.email});

    if(!user){
		return res.status(400).json({
			message: 'Invalid user'
		})
    }
    const validatePassword:boolean = await user.validatePassword(req.body.password);

    if(!validatePassword){
		return res.status(400).json({
			message: 'Invalid password'
		})
    }
    let token:string = jwt.sign({user}, process.env.TOKEN_SECRET || 'mytoken', {expiresIn: 60 * 60});

    res.json({
        token,
        message: 'Valid user'
    })
    
}

export const profile = (req:Request, res:Response) => {
    console.log(req.userId);

    User.findById(req.userId, {password: 0}, (err, userdb) => {
        if(err){
            return res.status(400).json({
                message: 'Invalid user'
            })
        }

        res.json({
            msj: 'Valid user',
            userdb
        })
    })


    
}