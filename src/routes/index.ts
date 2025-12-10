import express from 'express';
import * as homeController from '../controllers/homeController';
import * as userController from '../controllers/userController';
import * as medController from '../controllers/medicineController';

const router = express.Router();

// Home
router.get('/', homeController.getDashboard);
router.get('/qr', homeController.getQRPage);

// User
router.post('/add-user', userController.addUser);

// Medicine
router.post('/add-medicine', medController.addMedicine);
router.get('/edit-medicine/:id', medController.getEditPage);
router.post('/update-medicine/:id', medController.updateMedicine);
router.get('/delete-medicine/:id', medController.deleteMedicine);

export default router;