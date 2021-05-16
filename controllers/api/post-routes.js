const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// Routes

// GET api/posts/ ALL

router.get('/', withAuth, (req, res) => {
    console.log('get all');
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        order: [['created_at', 'DESC']],

        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
        ]
    })
}).then(dbPostData => res.json(dbPostData.reverse())).catch(err => {
    console.log(err);
    res.status(500).json(err);
});

// GET find post by id

router.get('/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'content',
            'title',
            'created_at',
        ],

        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
        ]
    })
}).then(dbPostData => {
    if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this add' })
        return;
    }
    res.json(dbPostData);
})
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

// PUT update post by id

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    }, {
        where: {
            id: req.params.id
        }

    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this add' })
            return;
        }
        res.json(dbPostData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE post by id

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this add' })
            return;
        }
        res.json(dbPostData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;