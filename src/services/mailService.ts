import { transporter } from '../config/gmail';

export const sendMail = async (med: any) => {
  try {
   const mailOptions = {
      from: '"Medicine Reminder" <no-reply@medreminder.com>',
      to: med.email,
      subject: `Waktunya Minum Obat: ${med.name}`,
      html: `
          <h3>Halo ${med.user_name},</h3>
          <p>Pengingat untuk meminum obat:</p>
          <ul>
              <li>Obat: <b>${med.name}</b></li>
          </ul>
          <p><img src="${med.photo_link}" style="max-width:200px;"/></p>
      `
  };

    transporter.sendMail(mailOptions)
      .then(info => {
          console.log(`[SUCCESS] Email terkirim ke ${med.email}. Message ID: ${info.messageId}`);
      })
      .catch(error => {
          console.error(`[ERROR] Gagal mengirim email ke ${med.email} untuk obat ${med.name}:`, error.message);
          if (error.responseCode) {
              console.error(`[ERROR DETAIL] SMTP Response Code: ${error.responseCode}`);
          }
      });
  } catch (err) {
    console.log(err)
  }



}