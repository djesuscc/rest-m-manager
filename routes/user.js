const { Router } = require('express');
const {
    get,
    post,
    put,
    drop,
} = require('../controllers/users');

const router = Router();

router.get('/', get);

router.put('/:id', put);

router.post('/', post);

router.delete('/', drop);

module.exports = router;