import { NextApiRequest, NextApiResponse } from "next";

const Logout = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method == "POST") {
            res.setHeader(
                "Set-Cookie",
                `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
            );
            res.status(200).json({ message: 'Logged out' });
        } else {
            res.status(405).json({ error: 'Method not allowed' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Error In Logging Out' })
    }
}

export default Logout;