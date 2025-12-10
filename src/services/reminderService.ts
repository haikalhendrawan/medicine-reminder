import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { MedicineModel } from '../models/Medicine';
import "dotenv/config";
import { checkNodemailerCredentials, transporter } from '../config/gmail';
import { sendMail } from './mailService';
import { sendMessage } from './whatsappService';

// Fungsi untuk mendapatkan waktu saat ini dalam format HH:MM
const getCurrentTimeHHMM = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

export const startReminderJob = () => {
    // Cron job setiap 1 menit (tetap, untuk cek setiap menit)
    cron.schedule('* * * * *', async () => {
        console.log('--- [SERVICE] Memeriksa Jadwal Minum Obat ---');
        
        try {
            const medicines = await MedicineModel.getAllForReminder();
            const currentTime = getCurrentTimeHHMM(); // Ambil waktu saat ini (HH:MM)

            medicines.forEach(med => {
                // Konversi string dose_times ("HH:MM,HH:MM") menjadi array
                const doseTimesArray = med.dose_times ? med.dose_times.split(',').map((t: any) => t.trim()) : [];

                // Cek apakah waktu saat ini ada di dalam daftar doseTimesArray
                if (doseTimesArray.includes(currentTime)) {
                    console.log(`[REMINDER - PENTING] Saatnya minum obat ${med.name} untuk ${med.user_name} pada pukul ${currentTime}`);

                    // kirim email
                    if (checkNodemailerCredentials()) {
                        sendMail(med);
                    }

                    // kirim whatsapp
                    sendMessage(med.phone_number, med);
                } else {
                    console.log(`[CHECK] Obat ${med.name} tidak terjadwal pada ${currentTime}. Waktu dosis: ${med.dose_times}`);
                }
            });
        } catch (error) {
            console.error("❌ ERROR pada reminder service saat mengambil data obat:", error);
        }
    });
};