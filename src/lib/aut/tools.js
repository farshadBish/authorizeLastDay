import jwt from "jsonwebtoken"

export const createToken = (payload) => new Promise((res,rej)=>
jwt.sign( payload, process.env.SECRET_DIGIT, {expiresIn:"1 week"},(err,token)=>{
    if(err){
        rej(err)
    }else{
        res(token)
    }
}))


export const verifyToken = (token) => new Promise((res,rej)=> 
jwt.verify(token,process.env.SECRET_DIGIT,(err,payload)=>{
    if(err){
        rej(err)
    } else {
        res(payload)
    }
}))