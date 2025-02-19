import connectToDatabase from "@/lib/mongodb/db";
import Address from "@/lib/schemas/Address";
import authenticate from "@/utils/Middleware/authentication";
import authorize from "@/utils/Middleware/authorization";
import { NextApiRequest, NextApiResponse } from "next";

type CustomNextApiRequest = NextApiRequest & {
    user?: {
        email: string;
        name: string;
        id: string;
        role: string;
    };
}

async function address(req: CustomNextApiRequest, res: NextApiResponse) {

    await connectToDatabase();

    if (req.method === "POST") {
        const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

        try {
            const id = req.user?.id;
            const { name, mobile, pincode, address, town, city, state } = req.body;


            const addAddress = new Address({
                name,
                mobile: Number(mobile),
                pincode: Number(pincode),
                address,
                town,
                city,
                state,
                user: id
            });

            await addAddress.save()

            res.status(200).json({ message: "Address added successfully" })

        } catch (error) {
            res.status(500).json({ message: "error creating address", error })
        }
    } else if (req.method === "GET") {
        const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

        try {
            const userID = req.user?.id
            const address = await Address.find({ user: userID })
            res.status(200).json({ message: "Address fetched successfully", address })
        } catch (error) {
            res.status(500).json({ message: "Error fetching product",eMessage: error })
        }
    } else if (req.method === "DELETE") {
        const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

        const isauthorize = await authorize(["admin"],req, res, Address);
        if (!isauthorize) return res.status(403).send("Unauthorized");

        try {
            const { id } = req.query;
            const address = await Address.findByIdAndDelete(id)
            console.log(address);


            res.status(200).json({ message: "Address Deleted Successfully" })
        } catch (error) {
            console.log(error);
            
            res.status(500).json({ message: "Error deleting address" })
        }
    } else if (req.method === "PUT") {
        const user = authenticate(req, res);
        if (!user) return res.status(401).send("Invalid token");

        const isauthorize = await authorize(["admin"],req, res, Address);
        if (!isauthorize) return res.status(403).send("Unauthorized");

        try {
            const { id } = req.query;
            const { name, mobile, pincode, address, town, city, state, isDefault } = req.body;
            await Address.findByIdAndUpdate(id, {
                name,
                mobile: Number(mobile),
                pincode: Number(pincode),
                address,
                town,
                city,
                state,
                default: isDefault,
            })
            res.status(200).json({ message: "Address updated successfully" })
        } catch (error) {
            res.status(500).json({ message: "Error updating address",eMessage: error })
        }
    }
}

export default address;