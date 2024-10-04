import dotenv from 'dotenv'
dotenv.config({});

import express, { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library";

import { google } from "googleapis"
import dayjs from 'dayjs'

const calendar = google.calendar({
    version: "v3",
    auth: process.env.API_KEY
})

const app = express();

const PORT = process.env.PORT || 5000;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
)

const scopes = [
    'https://www.googleapis.com/auth/calendar'
];

app.get("/google", (req: Request, res: Response) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes
    });

    res.redirect(url);
});

app.get('/google/redirect', async (req: Request, res: Response) => {
    const code = req.query.code as string;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    res.send({
        message: "Successfully Logged in"
    });
});

app.get('/schedule_event', async (req: Request, res: Response) => {
    await calendar.events.insert({
        calendarId: "primary",
        auth: oauth2Client,
        requestBody: {
            summary: "This is a test event",
            description: "some event this is very very import",
            start: {
                dateTime: dayjs(new Date()).add(1, 'day').toISOString(),
                timeZone: "Asia/Jakarta"
            },
            end: {
                dateTime: dayjs(new Date()).add(1, 'day').add(1, 'hour').toISOString(),
                timeZone: "Asia/Jakarta"
            }
        }
    });
    res.send({
        message: "event created"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});