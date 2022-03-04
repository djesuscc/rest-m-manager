const { Router } = require('express');
const { check } = require('express-validator');
const {
    get,
    post,
    put,
    drop,
} = require('../controllers/users');

const router = Router();

router.get('/', get);

router.put('/:id', put);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password should have 6 at least 6 characters').isLength({ min: 6 }),
    check('role', 'Not a valid role').isIn(['ADMIN', 'USER']),
], post);

router.delete('/', drop);

module.exports = router;