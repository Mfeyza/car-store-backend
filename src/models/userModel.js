'use strict'

const mongoose=require('mongoose')
const passwordEncrypt = require('../helpers/passwordEncrypt')

const userSchema=new mongoose.Schema({

email:{
    type:String,
    trim:true,
    unique:true,
    required:[true, 'Email must be required'],
    validate:[
        (email)=>(email.includes('@') && email.includes('.')), 'Email type is incorrect'
    ]

},

password:{
    type:String,
    trim:true,
    required:true,
    set:(password)=>passwordEncrypt(password)
},
firstName:String,
lastName:String,

}, {
    collection:'user',
    timestamps:true
})
module.exports=mongoose.model("User", userSchema)
