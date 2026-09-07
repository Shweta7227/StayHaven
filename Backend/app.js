const express= require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require ("./models/listing.js");
const path = require("path");
const methodOverride =require("method-override");
//Middleware 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
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

//ROUTES:)

//Basic route
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

//all listing route

app.get("/listings",async (req,res)=>{
   let listings =await Listing.find({});
    res.render("listings/index.ejs",{listings});

});

//Create route
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listings);
    await newListing.save();
    res.redirect("/listings");

})

//new route
app.get("/listings/new",(req,res)=>{

    res.render("listings/new.ejs");
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update route
app.put("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    //deconstruct req.body
    await Listing.findByIdAndUpdate(id,{...req.body.listings},{runValidators:true, new:true});
    res.redirect(`/listings/${id}`);
})

//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});



let port =8080;
app.listen(port, ()=>{
    console.log(`Server is listening to ${port}`); 
});