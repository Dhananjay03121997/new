const tenant = require('../model/tenant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    login:async function(password, user){
     try {
         const comparePassword = await bcrypt.compare(password,user.password);
         console.log(password, user, comparePassword);
         if (!comparePassword) {
            return false;
        }
        const token ;
         console.log('fail');
     } catch (error) {
         throw new Error(error.message);
     }   
    },
    generateToken: async function (user){
        try {
            const token =  jsonwebtoken.sign({name: `${user.first_name} ${user.last_name}`, mobile_no: `${user.mobile_no}`}, process.env.token);   
            return token;       
        } catch (error) {
            throw new Error(error.message);
        }
    }
}