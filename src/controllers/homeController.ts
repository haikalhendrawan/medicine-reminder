import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { MedicineModel } from '../models/Medicine';
import client from '../config/client';

export const getDashboard = async (req: Request, res: Response) => {
    let waStatus = 'DISCONNECTED'; 
    let connectedWa = false;

    try {
        const users = await UserModel.getAll();
        const medicines = await MedicineModel.getAllWithUser();
        if (client) {
            try {
                waStatus = await client.getState();
                if(waStatus === 'CONNECTED') connectedWa = true;
            } catch (err: any) {
                console.error("❌ ERROR saat mendapatkan status WhatsApp. Kemungkinan klien belum siap/sesi mati:", err.message);
                waStatus = 'DISCONNECTED'; 
            }
        }
        res.render('index', { users, medicines, connectedWa });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const getQRPage = (req: Request, res: Response) => res.render('qr');