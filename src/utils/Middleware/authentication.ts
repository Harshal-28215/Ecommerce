import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

type CustomNextApiRequest = NextApiRequest &{
  user?: {
    email: string;
    name: string;
    id: string;
    role:string;
  };
}

const authenticate = (req:CustomNextApiRequest, res:NextApiResponse) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).send('Token required');

  try {
    const decoded = jwt.verify(token, 'secretKey');
    
    return req.user = decoded as CustomNextApiRequest['user'];

  } catch (err) {    
    return res.status(401).send('Invalid token');
  }
};

export default authenticate;