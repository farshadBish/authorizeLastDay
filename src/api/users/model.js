import mongoose from "mongoose";
import bcrypt from "bcrypt"

const { Schema , model } = mongoose

const usersSchema = new Schema(
    {
        email: {type : String , required : true},
        password: {type : String , required : false},
        role : { type: String , enum : ["Host","Guest","Admin"], default : "Guest"}
    },
    {
        timestamps: true,
    }
)
usersSchema.pre("save", async function(next){
	const currentUser = this
	const plainPW =  currentUser.password
	if(currentUser.isModified("password")){

		const hash = await bcrypt.hash(plainPW,11)
		currentUser.password = hash
	}
	next()
})
usersSchema.methods.toJSON = function(){
	const currentUser = this
	const user = currentUser.toObject()
	delete user.__v
	return user
}
usersSchema.static("checkCredentials", async function(email,plainPassword) {
	const user = await this.findOne({email})

	if(user){
		console.log("User : ",user);
		const isMatch = await bcrypt.compare(plainPassword,user.password)
		if(isMatch){
			return user
		}else{
			return null
		}
		
	}else{
		return null
	}
})

export default model("Users",usersSchema)