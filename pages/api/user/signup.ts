import connectToDatabase from "@/lib/mongodb/db";
import User from "@/lib/schemas/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectToDatabase();

    if (req.method === "POST") {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email }).exec();
        if (user) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return res.status(201).send("User created");
    }
}

export default signUp;