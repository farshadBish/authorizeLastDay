import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mongoose from "mongoose"
import usersRouter from "./api/users/index.js";
import { forbiddenErrorHandler, genericErroHandler, notFoundErrorHandler, unauthorizedErrorHandler } from "./errorHandlers.js";

const server = express();
const port = process.env.PORT || 3001


// middlewares

server.use(cors())
server.use(express.json())


// endpoints

server.use("/users" , usersRouter)

// errorHandlers

server.use(unauthorizedErrorHandler)
server.use(forbiddenErrorHandler)
server.use(notFoundErrorHandler)
server.use(genericErroHandler)


// mongoDB

mongoose.connect(process.env.MONGO_CONNECTION_URL)

mongoose.connection.on("connected",()=>{
    console.log("Succesfully connected to DB!");
    server.listen(port,()=>{
        console.table(listEndpoints(server))
        console.log(`serve is running on port ${port}`);
    })
})