const mongoose=require("mongoose")

const Schema=mongoose.Schema({
name:String,

 email:String,
destination:String,
 travelers:Number,
 budget:Number
})

const PlanModel=mongoose.model("plan",Schema)

module.exports={
    PlanModel
}