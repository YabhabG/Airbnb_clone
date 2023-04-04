const express=require('express');
const app= express();
const cors=require('cors');
const mongoose = require('mongoose');
const User=require('./models/User.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecrete='wadfsafjksasfddfw';

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('connection succesful');
} catch (error) {
    console.log(error);
    console.log('connection failed')
}



app.get('/test', (req,res)=>{
    res.json("test ok");
});


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422);
        res.json('registration failed');
    }
});

app.post('/login', async (req,res)=>{
    const {email, password}=req.body;
    const userDoc=await User.findOne({email});
    if(userDoc)
    {
        const passOk=bcrypt.compareSync(password,userDoc.password);
        if (passOk)
        {
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecrete, {}, (err,token)=>{
                if (err) throw err;
                res.cookie('token',token);
                res.json(userDoc);
            } )
        }
        else{
            res.json('password not correct');
        }
    }
    else{
        res.status(422).json('not found');
    }
})

app.listen(4000);