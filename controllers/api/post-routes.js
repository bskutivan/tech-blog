const router = require('express').Router();
const { Post, User } = require('../../models');
const sequelize = require('../../config/connection');

// Create a post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        username: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// get all posts
router.get('/', (req, res) => {
    console.log('===========');
    Post.findAll({
        attributes: [
            'id', 
            'title',
            'contents',
            'user_id',
            'created_at'
            
        ],
        order: [['created_at', 'DESC']],
        include: [
        //     {
        //         model:Comment,
        //         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        //         include: {
        //             model: User,
        //             attributes: ['username']
        //         }
        //     },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;