import createHttpError from "http-errors"
import { verifyToken } from "./tools.js"


export const hostMiddleware = async (req,res,next) => {
    if(req.user.role==="Host"){
        next()
    } else{
        next(createHttpError(403,"Admin only endpoint"))
    }
}

export const adminMiddleware = async (req,res,next) => {
    if(req.user.role==="Admin"){
        next()
    } else{
        next(createHttpError(403,"Admin only endpoint"))
    }
}
export const JWTMiddlewere = async (req,res,next) =>{
    // 1
    if(!req.headers.authorization){
        next(createHttpError(401,"please provide a token"))
    } else {
        try {
            // 2
            const token = req.headers.authorization.replace("Bearer " , "")
            // 3 
            const payload = await verifyToken(token)
            // 4 
            req.user = {
                _id : payload._id,
                role : payload.role
            }
            next()
        } catch (error) {
            // 5 
            console.log(error);
            next(createHttpError(401,"token isnt valid!"))
        }
    }
}