//THIRD PARTY MODULES
const express = require('express');
const router = express.Router();

//CUSTOM MODULES FILES
const { authenticate, guest } = require('./../middleware/authenticate');
const { Story } = require('./../models/Story');
//ROUTES

//GET - /stories - PUBLIC STORIES
router.get('/', (req, res) => {
    Story.find({
        status: 'public'
    }).populate('_creator').sort({date: 'DESC'}).then((stories) => {
        res.render('stories/stories', { stories });
    });
});

//GET - /stories/add - ADD STORY FORM
router.get('/add', authenticate, (req, res) => {
    res.render('stories/add');
});

//POST - /stories - POST NEW STORY
router.post('/', (req, res) => {
    let errors = [];
    if (!req.body.title) {
        errors.push({text: 'Please Enter The Title'});
    }
    if (!req.body.body) {
        errors.push({text: 'Please Enter Your Story'});
    }
    if (errors.length > 0) {
        res.render('stories/add', {
            errors,
        })
    } else {
        let allowComments;
        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        let newStory = {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
            allowComments: allowComments,
            _creator: req.user.id
        };

        let story = new Story(newStory);
        story.save().then((story) => {
            res.redirect(`/stories/show/${story._id}`);
        })
    }
});

//GET - /stories/show/:id - GET INDI STORY  
router.get('/show/:id',  (req, res) => {
    Story.findOne({
        _id: req.params.id
    }).populate('_creator').populate('comments.commentUser').then((story) => {
        if (story.status == 'public') {
            res.render('stories/show', { story });
        } else {
            if (req.user) {
                if (req.user.id == story._creator._id) {
                    res.render('stories/show', { story });
                } else {
                    res.redirect('/stories');
                }
            } else {
                res.redirect('/stories');
            }
        }
    });
});

//GET - /stories/edit/:id - GET EDIT FORM FOR STORY
router.get('/edit/:id', authenticate, (req, res) => {
    Story.findOne({
        _id: req.params.id
    }).then((story) => {
        if (story._creator != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', { story });
        }
    });
});

//PUT - /stories/:id  - UPDATE STORIES
router.put('/:id', (req, res) => {
   let allowComments;
   if (req.body.allowComments) {
       allowComments = true;
   } else {
       allowComments = false;
   }

   Story.findOneAndUpdate({
       _id: req.params.id
   }, {$set: {
       title: req.body.title,
       body: req.body.body,
       allowComments: allowComments,
       status: req.body.status,
   }}).then((story) => {
       res.redirect(`/`);
   })
});

//DELETE - /stories/:id  - DELETE STORY
router.delete('/:id', (req, res) => {
    Story.findOneAndRemove({
        _id: req.params.id
    }).then((story) => {
        res.redirect('/');
    })
});

//POST - /stories/comments/:id - COMMENTING FEATURE
router.post('/comments/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    }).then((story) => {
        let newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user.id
        };

        //Add new Comment OBj to comments array;
        story.comments.unshift(newComment);

        story.save().then((story) => {
            res.redirect(`/stories/show/${story._id}`);
        });
    });
});

//GET - /stories/user/:id  - LIST SPECIFIC USER story
router.get('/user/:userId', (req, res) => {
    Story.find({
        _creator: req.params.userId,
        status: 'public'
    }).populate('_creator')
        .then((stories) => {
            res.render('stories/stories', { stories });
        })
});

//GET - /stories/my - LIST LOGGED IN USER STORIES
router.get('/my', authenticate, (req, res) => {
    Story.find({
        _creator: req.user.id
    }).populate('_creator').then((stories) => {
        res.render('stories/stories', { stories })
    })
});



module.exports = router;