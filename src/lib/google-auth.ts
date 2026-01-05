import { google } from 'googleapis';

const oauth2 = new google.auth.OAuth2(
  process.env.GDCLIENTID!,
  process.env.GD_CLIENT_SECRET!,
  process.env.GD_REDIRECT_URI!
);

oauth2.setCredentials({ refresh_token: process.env.GD_REFRESH_TOKEN! });

export const drive = google.drive({ version: 'v3', auth: oauth2 });
