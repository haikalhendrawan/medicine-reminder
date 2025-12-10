import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { initDb } from './config/database'; 
import routes from './routes/index';
import { startReminderJob } from './services/reminderService';
import "dotenv/config";
import app, {server} from "./config/app";
import io from "./config/io";
import { connectEvent } from './events/connectionEvent';
import fs from 'fs';


const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

io.on('connection', connectEvent); 

initDb().then(() => {
    startReminderJob();

    server.listen(PORT, () => {
        console.log(`Server berjalan rapi di http://localhost:${PORT}`);
    });
});