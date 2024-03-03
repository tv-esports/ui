import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'axios';

/*
    * This API route is used to fetch user data from the backend.
    * It is called from the frontend when the user enters a Discord ID.
    * The Discord ID is passed as a query parameter in the URL.
    * The backend API is called with the Discord ID to fetch user data from the core database.
    * The user data is then returned to the frontend.
    */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const backendResponse = await fetch(`http://localhost:8000/api/user/${id}`);
        res.status(200).json(backendResponse.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}