import { Request, Response } from 'express';
import { MedicineModel } from '../models/Medicine';

export const addMedicine = async (req: Request, res: Response) => {

    const { user_id, name, doses_per_day, dose_times, photo_link } = req.body;
    await MedicineModel.create(user_id, name, parseInt(doses_per_day), dose_times, photo_link);
    res.redirect('/');
};

export const getEditPage = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const medicine = await MedicineModel.getById(id);
    if (!medicine) return res.redirect('/');

    res.render('edit', { medicine }); 
};

export const updateMedicine = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, doses_per_day, dose_times, photo_link } = req.body; 
    await MedicineModel.update(id, name, parseInt(doses_per_day), dose_times, photo_link);
    res.redirect('/');
};

export const deleteMedicine = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await MedicineModel.delete(id);
    res.redirect('/');
};