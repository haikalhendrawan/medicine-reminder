import client from "../config/client";

export const sendMessage = async (number: string, med: any) => {
  try {
    const message = 'Halo ' + med.user_name + ', Jangan lupa untuk minum obat: ' + med.name;
    const chatId = "62" + number.slice(1) + "@c.us";
    await client.sendMessage(chatId, message);
    console.log(number, message)
  } catch (err) {
    console.log(err);
  }
};