import { openDb } from '../config/database';

export class MedicineModel {
    static async create(userId: number, name: string, dosesPerDay: number, doseTimes: string, photo: string) {
        const db = await openDb();
        return db.run(
            'INSERT INTO medicines (user_id, name, doses_per_day, dose_times, photo_link) VALUES (?, ?, ?, ?, ?)', 
            [userId, name, dosesPerDay, doseTimes, photo]
        );
    }

    static async getAllWithUser() {
        const db = await openDb();
        return db.all(`
            SELECT medicines.*, users.name as user_name 
            FROM medicines 
            JOIN users ON medicines.user_id = users.id
        `);
    }

    static async getAllForReminder() {
        const db = await openDb();
        return db.all(`
            SELECT medicines.*, users.email, users.name as user_name, users.phone_number as phone_number 
            FROM medicines 
            JOIN users ON medicines.user_id = users.id
        `);
    }

    static async getById(id: number) {
        const db = await openDb();
        return db.get('SELECT * FROM medicines WHERE id = ?', [id]);
    }

    static async update(id: number, name: string, dosesPerDay: number, doseTimes: string, photo: string) {
        const db = await openDb();
        return db.run(
            'UPDATE medicines SET name = ?, doses_per_day = ?, dose_times = ?, photo_link = ? WHERE id = ?',
            [name, dosesPerDay, doseTimes, photo, id]
        );
    }

    static async delete(id: number) {
        const db = await openDb();
        return db.run('DELETE FROM medicines WHERE id = ?', [id]);
    }
}