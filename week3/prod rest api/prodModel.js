import {model,Schema} from 'mongoose'

const prodSchema = new Schema({
    productId:{
            type:Number,
            required:[true,"product id is required"]
    },

    productName:{
        type:String,
        required:[true,"product name is required"]
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        min:[10000,"minimum price ot be entered is 10k"],
        max:[50000,"maximum price to be entered is 50k"],
    },
    brand:{
        type:String,
        required:[true,"brand name is required"]
    },
},
{
    versionKey:false,
    timestamps:true,

},)

export const pModel = model("product",prodSchema)
