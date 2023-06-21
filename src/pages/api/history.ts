import type { NextApiRequest, NextApiResponse } from 'next';

const hello = (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;
  console.log(res.statusCode);
  res.json({ name: 'John Doe' });
};

export default hello;
