import usersModel from "./model.js"
import express from "express"
import createHttpError from "http-errors"
import { adminMiddleware, JWTMiddlewere } from "../../lib/aut/index.js";


const usersRouter = express.Router();

usersRouter.post("/register",async (req,res,next)=> {
    try {
        const newUser = new usersModel(req.body) //validation
        const { _id } = await newUser.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.get("/",JWTMiddlewere,async (req,res,next)=> {
    try {
        const newUser = new usersModel(req.body) //validation
        const { _id } = await newUser.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.get("/me",JWTMiddlewere, async(req,res,next) =>{

    try {
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})
usersRouter.put("/me",JWTMiddlewere, async(req,res,next) =>{

    try {
        const updatedUser = await usersModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    if (updatedUser) {
      res.send(updatedUser)
    } else {
      next(createError(404, `User with id ${req.params.userId} not found!`))
    }
    } catch (error) {
        next(error)
    }
})
usersRouter.delete("/me",JWTMiddlewere, async(req,res,next) =>{

    try {
        await usersModel.findByIdAndDelete(req.user._id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
})
usersRouter.get("/:userId",adminMiddleware,async (req,res,next)=> {
    try {
        const newUser = new usersModel(req.body) //validation
        const { _id } = await newUser.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.put("/:userId",adminMiddleware,async (req,res,next)=> {
    try {
        const newUser = new usersModel(req.body) //validation
        const { _id } = await newUser.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.delete("/:userId",adminMiddleware,async (req,res,next)=> {
    try {
        const newUser = new usersModel(req.body) //validation
        const { _id } = await newUser.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.post("/login", async (req,res,next)=> {
    try {
        // 1 
        const {email,password} = req.body
        
        // 2 
        const user = await usersModel.checkCredentials(email,password)

        // 3 
        if(user){
            const token = await createToken({_id: user._id , role: user.role})
            res.send({ yourToken : token})
        } else {
        // 4 
        next(createHttpError(401,"credentials are not ok"))
        }

    } catch (error) {
        next(error)
    }

})
export default usersRouter