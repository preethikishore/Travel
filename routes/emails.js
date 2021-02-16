let Email = require('../models/emails').Emails;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');
router.get('/',authMiddleware,async(req,resp)=>{
    resp.send( ( await Email.find()));
});
router.post('/',async (req,resp)=>{
    let reqBody = req.body;
    let email = new Email(
        {
            id : uniqid(),
            name:reqBody.name,
            message:reqBody.message,
            email : reqBody.email, 
            date : new Date()
        }
    )
   await email.save();
   resp.send('Accepted');
    
});
router.delete('/:id',authMiddleware,async (req,resp)=>{
    await Email.deleteOne({id: req.params.id});
    resp.send('Deleted');
});
module.exports = router;