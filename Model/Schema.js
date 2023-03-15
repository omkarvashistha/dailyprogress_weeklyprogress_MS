const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to Weekly Progress DB")
}).catch((err)=>{
    console.log(err.message);
})

const weeklySchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
    },
    weeklyData : {
        type : Array,
        id:{
            type : Number,
            required : true,
            unique : true,
        },
        reason : {
            type : String,
            required : true,
        },
        points : {
            type : Number,
            required : true,
        },
        date : {
            type : Date,
            required : true,
        }
    }
},
{
    timestamps : {
        createdAt : true,
        updatedAt : true,
    },
});

const weekly = mongoose.model("weeklyProgress",weeklySchema);

module.exports = weekly
