import express from 'express';
import mongoose from 'mongoose';
import Data from './model/data.model.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import cors from 'cors';
app.use(cors());

app.listen(3001, () => {
    console.log('Server is running')
});

app.get('/api' , (req,res) => {
    res.send("Api Running")
});

app.post('/api/data' , async (req,res) => {
    try {
        const data = await Data.create(req.body);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({message : error.message});
    }
});

app.get('/api/data' , async (req,res) => {
    try {
        const data = await Data.find({});
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({message : error.message});
    }
});

app.get('/api/data/:id' , async (req,res) => {
    try {
        const {id} = req.params;
        const data = await Data.findById(id);
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({message : error.message});
    }
});

app.put('/api/data/:id' , async (req,res) => {
    try{
        const {id} = req.params;
        const data = await Data.findByIdAndUpdate(id , req.body);
        if (!data) {
            return res.status(404).json({message : "Data not found"});
        }
        res.status(200).json({message : "Updated Successfully"})
    }
    catch (error) {
        res.status(500).json({message : error.message});
    };
});

app.delete('/api/data/:id' , async (req,res) => {
    try{
        const {id} = req.params;
        const data = await Data.findByIdAndDelete(id , req.body);
        if (!data) {
            return res.status(404).json({message : "Data not found"});
        }
        res.status(200).json({message : "Deleted Successfully"})
    }
    catch (error) {
        res.status(500).json({message : error.message});
    };
});

mongoose.connect('mongodb+srv://ckhraiushh1_db_user:xpTirrzy9pYvE9SN@backenddb.v7ksfx7.mongodb.net/Node-Api?appName=BackendDB')
  .then(() => {
    console.log('Connected!')
  })
  .catch(() => {
    console.log("Connection failed");
  });