import mongoose, { Mongoose } from 'mongoose';

const noteSchema= new mongoose.Schema({
    message:{type:String, required:true},
    color:{type:String, default:'teal.200'},
    userId:{type:mongoose.Schema.Types.ObjectId ,ref:'User', required:true}
});

const note=mongoose.model('Note',noteSchema);
export default note;