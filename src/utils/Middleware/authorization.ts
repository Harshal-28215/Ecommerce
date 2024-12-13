import { Cart } from "@/lib/schemas/SchemaUtils";
import { NextApiRequest, NextApiResponse } from "next";

type CustomNextApiRequest = NextApiRequest &{
    user?: {
      email: string;
      name: string;
      id: string;
      role: string;
    };
  }

const authorize = (roles:string[]) => async (req:CustomNextApiRequest, res:NextApiResponse) => {

   const role = req.user?.role;
   const {uid} = req.query;


   const cart = await Cart.findOne({user:uid})
   
   if (cart.user == uid) {
       return true
   }

   if (!role || !roles.includes(role)) {
       return res.status(403).send('Unauthorized');
   }else{
       return true;
   }
   
  };
  
  export default authorize;