const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../database/users');

const get = (req = request, res = response) => {
    const { q, name } = req.query;
    res.status(200).json({
        msg: 'get Api Controller',
        q,
        name,
    });
}

const post = async (req, res = response) => {
    const { name, email, password, role } = req.body;
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }
    try {
        const user = new User({
            name,
            email,
            password,
            role,
        });
    
        // Verify if email exists
        const existEmail = await User.findOne({ email });
        if ( existEmail ) {
            return res.status(400).json({
                msg: "Email already exists!",
                email,
            })
        }
    
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
    
        // Store db
        await user.save();
    
        res.status(201).json({
            msg: "post API",
            ...req.body,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "An error ocurred",
            data: req.body,
        })
    }
}

const put = (req, res = response) => {
    const { id } = req.params;
    res.status(200).json({
        msg: "put API",
        id,
    });
}

const drop = (req, res = response) => {
    res.status(200).json({
        msg: "delete API"
    });
}

module.exports = {
    get,
    post,
    put,
    drop,
}