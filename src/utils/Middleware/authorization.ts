import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

type CustomNextApiRequest = NextApiRequest &{
    user?: {
      email: string;
      name: string;
      id: string;
      role: string;
    };
  }

const authorize = (
    roles: string[],
    model: mongoose.Model<any>,
  ) => async (req:CustomNextApiRequest, res:NextApiResponse) => {

   const role = req.user?.role;
   const userID = req.user?.id
   const {uid} = req.query;


   const cart = await model.findOne({user:uid})
   
   if (cart.user == userID) {
       return true
   }
    else if (!role || !roles.includes(role)) {
       return res.status(403).send('Unauthorized');
   }
   else{
       return true;
   }
   
  };
  
  export default authorize;