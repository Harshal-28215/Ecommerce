import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";


const user = async (req: NextApiRequest, res: NextApiResponse) => {

    const token = req.cookies.token;

    if (req.method === "GET") {

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const user = jwt.verify(token, 'secretKey') as jwt.JwtPayload;
            return res.json({ email: user.email, name: user.name, id: user.id, role: user.role });
        } catch (err) {
            return res.status(403).json({ error: 'Invalid token',eMessage: err });
        }
    }

};

export default user;