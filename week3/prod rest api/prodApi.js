import exp from 'express'
import { pModel } from '../models/prodModel.js'
export const prodApp = exp.Router()

//create product object
    prodApp.post("/products",async(req,res)=>{

        const newProduct =req.body;//get new product obj from req
        const newprodDoc = new pModel(newProduct)//create new user document   
        const result = await newprodDoc.save()   //save
          console.log("result:",result)
          res.status(201).json({message:"Product added into db"})
    }
    )
    
    //get all products

    prodApp.get("/products", async(req,res)=>{
        //reading products from db
        let prodList = await pModel.find()
            //send res
            res.status(200).json({message:"products are ",payload:prodList})
    })


//get product data by id
    prodApp.get("/products/:id",async(req,res)=>{
       
        const pid = req.params.id //read product obj id from req params
       
        const productobj =await pModel.findById(pid) //find product by id 
          //if user not found 
          if(!productobj){
           return res.status(404).json({message:"product not available"})
          }
        //send res
        res.status(201).json({message:"product",payload:productobj})
    
      })
//uppdating an existing product object
        prodApp.put("/products/:id",async(req,res)=>{
      
const modifiedproduct =req.body//get modified product from req
 const pid =req.params.id
 //find product by id and update
 const updproduct = await  pModel.findByIdAndUpdate(pid,{$set:{...modifiedproduct}},
                                                          {new:true,runValidators:true},)
          //send res
          res.status(200).json({message:"prodcut is modified",payload:updproduct})
        })

    //deleting a profudct
       prodApp.delete("/products/:id",async(req,res)=>{
       
        const pid =req.params.id //get id
       const deletedproduct = await  pModel.findByIdAndDelete(pid)//find user by id and delete 
        if(!deletedproduct)
        {
          return res.status(404).json({message:"product not found "})
        }
        //send res
        res.status(200).json({message:"prodcut is removed ",payload:deletedproduct})
      })

  prodApp.delete("/products/:id",async(req,res)=>{
    const pid =req.params.id //get id
   
   const deletedproduct = await  pModel.findByIdAndDelete(pid) //find user by id and delete 

    if(!deletedproduct)
    {
      return res.status(404).json({message:"product  not found in db"})
    }
    //send resw
    res.status(200).json({message:"the follwoing product is removed",payload:deletedUser})
  })