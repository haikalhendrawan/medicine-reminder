import client from "../config/client";
import QRCode from "qrcode";

 const connectEvent = (socket:any) => {
  socket.emit('message', 'Connecting...');
  console.log('mencoba koneksi whatsapp');

  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    QRCode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', 'QR Code received, scan please!');
    });
  });

  client.on('message', message => {
      return console.log('message');
  });

  client.once('ready', () => {
    socket.emit('ready', 'Whatsapp is ready!');
    socket.emit('message', 'Whatsapp is ready!');
  });

  client.on('authenticated', () => {
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('message', 'Whatsapp is authenticated!');
    console.log('AUTHENTICATED');
  });

  client.on('auth_failure', (session) => {
    socket.emit('message', 'Auth failure, restarting...');
  });

  client.on('disconnected', (reason) => {
    socket.emit('message', 'Whatsapp is disconnected!');
    client.destroy();
    client.initialize().catch((err)=>{
      console.log(err)
    });
  });

  client.initialize().catch((err)=>{
    console.log(err)
  });;
}

export {connectEvent};