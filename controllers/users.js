const { response, request } = require('express');

const get = (req = request, res = response) => {
    const { q, name } = req.query;
    res.status(200).json({
        msg: 'get Api Controller',
        q,
        name,
    });
}

const post = (req, res = response) => {
    const { name, birthDay } = req.body;
    res.status(201).json({
        msg: "post API",
        ...req.body,
    });
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