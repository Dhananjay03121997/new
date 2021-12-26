const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const tenant = require('../model/tenant');
const url = require('../helper/url');
const { contactExists } = require('../helper/utils');
const { notFound, pleaseProvide, Success } = require('../helper/messages');

router.post(`${url.crud.add.replace('{{name}}', 'tenant')}`, async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            mobile_no,
            password
        } = req.body;
        if (!first_name || !last_name || !email || !mobile_no || !password) {
            return res.status(400).send(`message: <<INVALID PARAMETER>>`);
        }
        const exists = await contactExists(mobile_no, email);
        if (exists) {
            return res.status(200).send({ message: exists });
        }
        const newTenant = new tenant({
            first_name,
            last_name,
            email,
            mobile_no,
            password
        });
        const data = await newTenant.save();
        return res.status(200).send({
            message: `Data Added`,
            data: data
        });
    } catch (error) {
        return res.status(400).send({ message: `${error.message}` });
    }
})

router.get(`${url.crud.get.replace('{{name}}', 'tenant')}`, async (req, res) => {
    try {
        const newTenant = await tenant.find({"is_delete": false}).select({ "first_name": 1, "last_name": 1, "email": 1, "mobile_no": 1 });
        if (newTenant.length === 0) {
            return res.status(200).send({message:notFound.replace('{{name}}', 'Tenant')});
        }
        return res.status(200).send({
            message: `Successful.`,
            data: newTenant
        });
    } catch (error) {
        return res.status(400).send({ message: `${error.message}` });
    }
});

router.put(`${url.crud.update.replace('{{name}}', 'tenant')}`, async(req,res)=>{
    try {
        const {
            id,
            first_name,
            last_name,
            email,
            mobile_no
        } = req.body;
        if (!id) {
            return res.status(400).send({message: pleaseProvide.replace('{{name}}', 'Id')
            });
        }
        let tenantUpdate = await tenant.findOneAndUpdate({
            "_id":mongoose.Types.ObjectId(id), "is_delete": false
        },{
            first_name,
            last_name,
            email,
            mobile_no
        }, {new: true});
        if (!tenantUpdate) {
            return res.status(200).send({message: notFound.replace('{{name}}', 'tenant')});
        }
        return res.status(200).send({
            message: Success.update.replace('{{name}}', 'Tenant'),
            data:tenantUpdate
        });
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

router.delete(`${url.crud.delete.replace('{{name}}', 'tenant')}`, async(req,res)=>{
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(200).send({message: pleaseProvide.replace('{{name}}', 'Id')});
        }
        const tenantDelete = await tenant.findOneAndUpdate({'_id':id, 'is_delete': false},{'is_delete': true});
        if (!tenantDelete) {
            return res.status(200).send({message:'UnableToDelete'});
        }
        return res.status(200).send({message: Success.delete.replace('{{name}}', 'Tenant')});
    } catch (error) {
        return res.status(400).send({message: error.message});
    }
})

module.exports = router;