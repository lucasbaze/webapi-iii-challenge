const router = require('express').Router();
const db = require('./postDb');

//
//Get all Posts
router.get('/', async (req, res) => {
    let posts = await db.get();
    if (!posts || posts == null) {
        res.status(500).json({
            error: 'There was an error retreiving the users',
        });
        return;
    }
    res.status(200).json({ posts: posts });
});

router.get('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
