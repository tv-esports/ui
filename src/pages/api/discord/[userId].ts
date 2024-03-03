import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/*
  * This API route is used to fetch user data from the Discord API.
  * It is called from the frontend when the user enters a Discord ID.
  * The Discord ID is passed as a query parameter in the URL.
  * The Discord API is called with the Discord ID to fetch user data.
  * The user data is then returned to the frontend.
  */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    const discordResponse = await axios.get(`https://discord.com/api/v10/users/${userId}`, {
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    });

    if (discordResponse.status !== 200) {
      res.status(discordResponse.status).json({
        error: 'Failed to fetch user data from Discord API',
      });
      return;
    }

    const discordData = {
      username: discordResponse.data.username,
      avatar: discordResponse.data.avatar,
      // ...
    };

    res.status(200).json(discordData);
  } catch (error) {
    console.error('Error fetching Discord user data:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}