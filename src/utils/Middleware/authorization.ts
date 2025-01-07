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
    model?: mongoose.Model<any>,
  ) => async (req:CustomNextApiRequest, res:NextApiResponse) => {

   const role = req.user?.role;
   const userID = req.user?.id
   const {uid} = req.query;


   const cart = await model?.findOne({user:uid})
   
   if (cart.user == userID || (role && roles.includes(role))) {
       return true
   }
   else{
       return false;
   }
   
  };
  
  export default authorize;