const {login} = require('../helper/login');
const { invalidParams } = require('../helper/messages');
const url = require('../helper/url');
const tenant = require('../model/tenant');

const router = require('express').Router();

router.post(`${url.login.login}`, async(req,res)=>{
    try {
        const {
            email,
            password
        } = req.body;
        if(!email || !password){
            return res.status(400).send({message: invalidParams});
        }
        const user = await tenant.findOne({email:email}).select({"password":1});
        const validateUser = await login(password, user);
        return res.send("asd");
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

module.exports = router;