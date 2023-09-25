const mongoose =require('mongoose');
const Cat=new mongoose.Schema({
    adi:String,
    yas:Number,
    cins:String
});
const CatModel=mongoose.model('Cat',Cat);
module.exports=CatModel;