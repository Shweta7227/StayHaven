const express= require("express");

const app= express();
const mongoose = require("mongoose");
const Listing = require ("./models/listing.js");
const path = require("path");
// Databse connectivity
const MONGO_URL ="mongodb://127.0.0.1:27017/Stay";
main()
.then((res)=>{
    console.log("Database connected Successfully:)");
})
.catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}
//basic route
app.get("/",(req,res)=>{
    res.send("You are on the Root");
});

// app.get("/testListing", async(req,res)=>{
//     try{
//         let samplelisting=new Listing({
//         title:"My Villa",
//         description:"By the beach",
//         price:"10000",
//         location:"Las Vegus",
//         country:"USA",
//         });
//         await samplelisting.save();
//         console.log("Sample was saved");
//         res.send("successful testing");

//     }catch(err){
//         console.log(err);
//     }
     
// });

//index route:
app.get("/listings",async (req,res)=>{
   let listings =await Listing.find({});
    res.render("listings/index.ejs",{listings});

});

//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
let port =8080;
app.listen(port, ()=>{
    console.log(`Server is listening to ${port}`); 
});