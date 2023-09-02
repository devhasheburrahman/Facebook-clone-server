const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const PostModel = require('./Schema/Post');
const CommentModel = require('./Schema/Comment');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'hello world', success: true })
});


const mongodbConnect = () => mongoose.connect('mongodb://127.0.0.1:27017/facebook'
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
)
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // takeBackup()
        // 🔥 Server configuration
        app.listen(5000, () => {
            console.log('🚀 Server running on http://localhost:5000/');
        })
    })
    .catch((error) => {
        // console.log(error)
        console.error(`🎆 Error connecting to MongoDB `, error);

        setTimeout(() => {
            mongodbConnect()
        }, 3000);
    });

mongodbConnect()

app.post('/facebookpost', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const newPost = await new PostModel(data).save();
        const allPost = await PostModel.find();
        res.status(200).json({ newPost, allPost })
        console.log(newPost, allPost);
    } catch (error) {
        throw new Error(error)
        res.status(200).json(error.message)
    }
})

app.get('/facebookpost', async (req, res) => {
    const data = req.body;
    try {
        const newPost = await PostModel.find();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(200).json(error.message)
    }
})



// app.put('/facebookpost/:id', async (req, res) => {

//     const id = req.params.id;

//     const updateLike = await PostModel.findByIdAndUpdate(id, { new: true });
//     res.status(200)


// })


app.post('/facebokcomments', async (req, res) => {
    const data = req.body;
    try {
        const comment = await new CommentModel(data).save();
        const allComment = await CommentModel.find();
        res.status(201).json({ comment, allComment })
    } catch (error) {
        res.status(200).json(error.message)
    }
})

app.get('/facebokcomments', async (req, res) => {
    const data = req.body;
    try {
        const comment = await CommentModel.find();
        res.status(201).json(comment)
    } catch (error) {
        res.status(200).json(error.message)
    }
})



