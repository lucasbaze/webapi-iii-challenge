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

//
//Get specifc post
router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let post = await db.getById(id);
    if (!post || post == null) {
        res.status(500).json({
            error: 'There is no post with that ID',
        });
        return;
    }
    res.status(200).json({ post: post });
});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
