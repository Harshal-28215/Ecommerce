import connectToDatabase from "@/lib/mongodb/db";
import User from "@/lib/schemas/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const logIn = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();


    if (req.method === "POST") {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ email: user.email, name: user.name, id: user._id, role:user.role }, 'secretKey', { expiresIn: '1h' });
        

        res.setHeader(
            "Set-Cookie",
            `token=${token}; HttpOnly; Path=/; SameSite=Strict`
          );          

          const userObj = {email: user.email, name: user.name, id: user._id, role: user.role};

        res.status(200).json({ message: 'Logged in', userObj });
    }

};

export default logIn;