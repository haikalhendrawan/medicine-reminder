import { openDb } from '../config/database';

export class UserModel {
    static async create(name: string, email: string, dob: string, phone_number: string) {
        const db = await openDb();
        return db.run('INSERT INTO users (name, email, dob, phone_number) VALUES (?, ?, ?, ?)', [name, email, dob, phone_number]);
    }

    static async getAll() {
        const db = await openDb();
        return db.all('SELECT * FROM users');
    }
}