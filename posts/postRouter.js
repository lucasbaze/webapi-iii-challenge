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
router.get('/:id', validatePostId, (req, res) => {
    let post = req.post;
    res.status(200).json({ post: post });
});

router.delete('/:id', validatePostId, async (req, res) => {
    let { id } = req.params;
    let deletedPost = await db.remove(id);
    if (deletedPost) {
        res.status(200).json({ success: 'Successfully deleted the post' });
    }
    res.status(500).json({ error: 'There was an error deleting the post' });
});

router.put('/:id', (req, res) => {});

// custom middleware

async function validatePostId(req, res, next) {
    let { id } = req.params;
    let post = await db.getById(id);
    if (!post || post == null) {
        //throw new Error('Post does not exist');
        //next(err);
        res.status(400).json({ error: 'Post does not exist' });
    }
    req.post = post;
    next();
}

module.exports = router;
