import mongoose from "mongoose";
import bcrypt from "bcrypt"

const { Schema , model } = mongoose

const usersSchema = new Schema(
    {
        email: {type : String , required : true},
        password: {type : String , required : false},
        role : { type: String , enum : ["Host","Guest"], default : "Guest"}
    },
    {
        timestamps: true,
    }
)

export default model("Users",usersSchema)