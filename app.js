let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postRouter = require('./routes/posts');
let callbackRouter = require('./routes/callback-requests');
let emailRouter = require('./routes/emails');
let userRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');
// const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels',{ useNewUrlParser: true } );
app.use(express.json());
let imageStorage = multer.diskStorage(
    {
        destination:(req,file,cb)=>cb(null,'public/images'),
        filename:(req,file,cb)=>cb(null,file.originalname),

    }
)
app.use(multer({storage:imageStorage}).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts',postRouter);
app.use('/callback-requests',callbackRouter);
app.use('/emails',emailRouter);
app.use('/users', userRouter);


app.get('/sight',async  (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});

    resp.render('sight', {
        title: post.title,
        imageURL: post.imageUrl,
        date: post.date,
        text: post.text
    })
})


app.get('/admin',(req,res)=>
{
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token))
    {
        res.render('admin');
    }else{
        res.redirect('/login');
    }
    
})
app.get('/login',(req,res)=>
{
    res.render('login');
})
app.listen(3000,()=>console.log('Listening 3000'));

