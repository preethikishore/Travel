let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');
router.get('/', async (req,resp) =>
{
    let posts = await Post.find();
    resp.send(posts);
})
router.get('/:id', authMiddleware,async (req,resp) =>
{
    let id = req.params.id;
    let posts = await Post.findOne({id: id});
    resp.send(posts);
})
router.post('/', authMiddleware,async (req,resp) =>
{
    let reqBody = req.body;
    let imagePath;
    if(reqBody.imageUrl)
    {
        imagePath = reqBody.imageUrl;
    }else{
        imagePath = req.file.path.substring(req.file.path.indexOf('\\'),req.file.path.length);
    }
    let newPost = new Post({
      id:  uniqid(),
      title : reqBody.title,
      date : new Date(),
      description : reqBody.description,
      text : reqBody.text,
      country : reqBody.country,
      imageUrl : imagePath

    })
    await newPost.save();

    resp.send('Created!!');
})

router.delete('/:id',authMiddleware, async(req,resp) =>
{
   let id = req.params.id;
   await Post.deleteOne({id : id});
   resp.send('Deleted!!');
})

router.put('/:id',authMiddleware,async (req,resp) =>
{
    let id = req.params.id;
    await Post.updateOne({id : id},req.body);
    resp.send('Updated!!');
})
module.exports = router;