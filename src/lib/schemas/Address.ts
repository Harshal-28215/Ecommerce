import mongoose from "mongoose";
import User from "./User";

const AddressSchema = new mongoose.Schema({
    name:{type:String, require:true},
    mobile:{type:Number, require:true},
    pincode:{type:Number, require:true},
    address:{type:String, require:true},
    town:{type:String, require:true},
    city:{type:String, require:true},
    default:{type:Boolean, default:false},
    state:{type:String, require:true},
    user: { type: mongoose.Schema.ObjectId, ref: User },
})

export default mongoose.models.Address || mongoose.model("Address", AddressSchema);