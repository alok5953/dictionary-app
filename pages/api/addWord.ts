// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { addSearchedWord } from '../../Service/firebase';

type Data = {
  message?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { word } = req.body;
      if (!word) {
        throw new Error('Word is required');
      }
      const saveData = await addSearchedWord(word);
      res.status(200).json({
        message: 'Data evaluated successfully',
      });
    } catch (error: Data['error']) {
      res.status(400).json({
        error: error.message,
        message: 'Something went wrong',
      });
    }
  } else {
    res.status(405).json({
      message: 'Method not allowed',
    });
  }
}
