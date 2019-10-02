const router = require('express').Router();
const db = require('./userDb');

router.post('/', validateUser, (req, res) => {});

router.post('/:id/posts', validatePost, (req, res) => {});

//
//Get All Users
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

//
//Get specific User
router.get('/:id', validateUserId, (req, res) => {
    console.log('Request Header User: ', req.user);
    res.status(200).json({ user: req.user });
});

//
//Get user posts
router.get('/:id/posts', validateUserId, async (req, res) => {
    let { id } = req.params;
    let posts = await db.getUserPosts(id);
    console.log('Posts: ', posts);
    if (!posts || posts == null) {
        res.status(400).json({
            error: 'This user has no posts',
        });
        return;
    }
    res.status(200).json({ posts: posts });
});

//
//Delete User
router.delete('/:id', validateUserId, async (req, res) => {
    let { id } = req.params;
    let deleted = await db.remove(id);
    if (deleted) {
        res.status(200).json({ success: 'User successfully deleted' });
    }
});

//
// Update User
router.put('/:id', validateUser, (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
    let { id } = req.params;
    let user = await db.getById(id);
    if (!user || user == null) {
        res.status(400).json({ error: 'No user with that ID exists' });
        return;
    }
    console.log('Validated User: ', user);
    req.user = user;
    next();
}

function validateUser(req, res, next) {
    let user = req.body;

    if (!user) {
        res.status(400).json({ message: 'Missing Body' });
        return;
    }

    if (!user.name) {
        res.status(400).json({ message: 'Missing Name' });
        return;
    }

    next();
}

function validatePost(req, res, next) {
    let { id } = req.params;
    let post = req.body;

    if (!post) {
        res.status(400).json({ message: 'missing post data' });
        return;
    }

    if (!post.text) {
        res.status(400).json({ message: 'missing required text field' });
        return;
    }

    next();
}

module.exports = router;
