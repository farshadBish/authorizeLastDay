import usersModel from "./model.js"
import express from "express"
import createHttpError from "http-errors"


const usersRouter = express.Router();

usersRouter.post("/register",async (req,res,next)=> {
    try {
        const newPost = new usersModel(req.body) //validation
        const { _id } = await newPost.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.get("/",async (req,res,next)=> {
    try {
        const newPost = new usersModel(req.body) //validation
        const { _id } = await newPost.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.get("/:userId",async (req,res,next)=> {
    try {
        const newPost = new usersModel(req.body) //validation
        const { _id } = await newPost.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.put("/:userId",async (req,res,next)=> {
    try {
        const newPost = new usersModel(req.body) //validation
        const { _id } = await newPost.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
usersRouter.delete("/:userId",async (req,res,next)=> {
    try {
        const newPost = new usersModel(req.body) //validation
        const { _id } = await newPost.save() // the id
        res.status(201).send({_id}) // when the post is succesfull we get the id 
    } catch (error) {
        next(error)
    }
})
export default usersRouter