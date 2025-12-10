import { Request, Response } from 'express';
import { UserModel } from '../models/User';

export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, email, dob, phone_number } = req.body;
        await UserModel.create(name, email, dob, phone_number);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding user");
    }
};