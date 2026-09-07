const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:{
            type:String,
        },
        url:{
            type: String,
            //this works when image id null/undefined
            default:"https://unsplash.com/photos/modern-houses-nestled-in-a-lush-green-forest-setting-xsoGuBK_giA",
            //by ternary operator we are seting default image if link is not given 
            set:(v)=>v===""?"https://unsplash.com/photos/modern-houses-nestled-in-a-lush-green-forest-setting-xsoGuBK_giA":v,
        },       
    },
    price:Number,
    location:String,
    country:String,
});

const Listing= mongoose.model("Listing",listingSchema);
module.exports= Listing;