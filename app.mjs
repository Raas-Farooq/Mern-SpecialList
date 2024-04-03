import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/specialList',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Something beautiful Happend");
}).catch(err => console.log("Error Of the Month: ", err));

const listSchema = new mongoose.Schema({
    id:String,
    value:String
})

const listModel = mongoose.model('listModel', listSchema);

app.get('/load', async(req, res) => {
    
    try{
        await listModel.deleteMany({
            $or:[
                {value: null},
                {id: null},
            ]
        })
        const goals = await listModel.find({});
        if(goals.length === 0){
            res.json({message:"No Resolutions Are Made"})
        }
        else{
            res.json(goals)
        }
        
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})

app.get('/updating', async(req, res) => {
    
    const id = req.query.id;
    const destination = req.query.goal;
    console.log(`My Id : ${id} and Target : ${destination}`)
    try{
        // const myGoals = await 
        res.json({message:"Alhamdulila! Doing Good"})
    }
    catch(err) {
        res.status(500).json({err:err.message})
    }
})

app.post('/addList', async(req, res) => {
    // console.log("req.body: ", req.body);
    const desire = req.body;
    const id = desire[0].id;
    console.log("Id: ", id);
    console.log("desire Message: ", desire);
    
    try{
        const exist = await listModel.find({id})
        console.log("exist: ", exist);
        if(exist.length === 0){
            await listModel.create(desire);
            res.json({message: "Success"});
        }
        else{
            res.json({message: "Already There"})
        }

    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})


app.listen(port, () => console.log("Alhamdulila for EveryThing!" + port))