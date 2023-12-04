import type { NextApiRequest, NextApiResponse } from 'next';
import { suggestedWords } from '../../Service/firebase';

type Data = {
  message?: string;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const { prefix } = req.body;

      if (!prefix) throw new Error('Prefix is required');

      const data = await suggestedWords(prefix);
      res.status(200).json({ message: 'Data fetched', data });
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
