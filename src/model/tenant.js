const mongoose = require('mongoose');
const validator = require('validator');
const messages = require('../helper/messages');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        trim:true,
        required:[true, messages.require.replace('{{name}}', 'First name')]
    },
    last_name:{
        type: String,
        trim:true,
        required:[true, messages.require.replace('{{name}}', 'Last name')]
    },
    email:{
        type: String,
        lowercase: true,
        unique:true,
        trim:true,
        required:[true, messages.require.replace('{{name}}', 'Email')],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(messages.notValid.replace('{{name}}', 'Email'))
            }
        }
    },
    mobile_no:{
        type:String,
        unique:true,
        trim:true,
        required:[true, messages.require.replace('{{name}}', 'Mobile number')],
        validate(value){
            if (!validator.isNumeric(value) || !validator.isLength(value,{min:10, max:10})) {
                throw new Error(messages.notValid.replace('{{name}}', 'Mobile number'))
            }
        }
    },
    password:{
        type: String,
        required:[true, messages.require.replace('{{name}}', 'password')]
    },
    is_delete:{
        type: Boolean,
        default: false
    }
});

schema.pre('save', async function(next){
    const newTenant = this;
    if (newTenant.isModified('password')) {
            newTenant.password = await bcrypt.hash(newTenant.password, 10);
    }
    if (newTenant.isModified('mobile_no')) {
        newTenant.mobile_no =`+91${newTenant.mobile_no}`;
    }
    next();
});

const tenant = mongoose.model('tenant', schema);
module.exports = tenant;