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

router.put('/:id', validatePost, validatePostId, async (req, res) => {
    let { id } = req.params;
    let post = req.body;
    let updatedPost = await db.update(id, post);
    if (!updatedPost || updatedPost == null) {
        next(new Error('Error on updating post'));
    }
    res.status(200).json({ updatedPost });
});

// custom middleware

async function validatePostId(req, res, next) {
    let { id } = req.params;
    let post = await db.getById(id);
    if (!post || post == null) {
        next(new Error('Post does not exist'));
    }
    req.post = post;
    next();
}

function validatePost(req, res, next) {
    let post = req.body;
    if (!post || !post.text || !post.user_id) {
        next(' Missing parameter to submit post ');
    }

    next();
}

module.exports = router;
