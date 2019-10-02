const router = require('express').Router();
const db = require('./userDb');

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', async (req, res) => {
    let users = await db.get();
    if (!users || users == null) {
        res.status(500).json({
            error: 'There was an error retreiving the users',
        });
        return;
    }
    res.status(200).json({ users: users });
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let user = await db.getById(id);
    if (!user || user == null) {
        res.status(400).json({
            error: 'No user exists with that ID',
        });
        return;
    }
    res.status(200).json({ user: user });
});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
