//creating http server(exp application)
import exp from 'express'
import {connect} from 'mongoose'  //mongoose is a driver in mongodb odm(object document mapping)
import { userApp } from './APIs/userApi.js'
import { prodApp } from './APIs/prodApi.js'
import cookieParser from 'cookie-parser'
const app=exp()
const pro=exp()
app.use(exp.json())
pro.use(exp.json())

//forward req to useApp if path starts with /user-api
app.use("/user-api",userApp)
pro.use("/product-api",prodApp)

app.use(cookieParser())

const port =3030
const port2 = 4040

app.listen(3030,()=>console.log("server on port 3030 for UserApi.."))
pro.listen(4040,()=>console.log("server started on port 4040 for ProductApi.."))
//connect to DB
async function connectDB(){
    try{
        await connect("mongodb://localhost:27017/merndb2")  //127.0.0.1 to be replaced instead of localhost when needed
        console.log("DB connection success")


    }
    catch(err)
    {
        console.log("Err in db connection:",err)
    }
   
}

 connectDB()

 //error handling middleware
 app.use((req,res,find)=>{
    console.log(err.name)
// //validation error
//     if(err.name==='ValidationError'){
//         return res.status(400).json({message :"error occured ",err})
//     }
//     if(err.name==='CastError')
//     {
//         return res.status(400).json({message :"error occured ",err})
//     }

// //send server side error
//     res.status(500).json({message:"error occured",error:"server side error"})
 })



//   pro.use((err,req,res,find)=>{
//     console.log(err.name)
// //validation error
//     if(err.name==='ValidationError'){
//         return res.status(400).json({message :"error occured ",err})
//     }
//     if(err.name==='CastError')
//     {
//         return res.status(400).json({message :"error occured ",err})
//     }

// //send server side error
//     res.status(500).json({message:"error occured",error:"server side error"})
//  })

