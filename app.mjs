import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

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
// on Document Load
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


// Editing the Item
app.put('/updating/:myId', async (req,res) => {
    try{
        const myId = req.params.myId;
        const val = req.body.value;
        console.log("myId: ", myId);
        console.log("val: ", val);
        const findTarget = await listModel.findOne({id:myId});
        console.log("findTarget: ", findTarget);
        if(findTarget){
            await listModel.updateOne({id:myId}, {value:val});
            res.json({message:"accomplished Target"})
        }
        else{
            res.json({message:"Id Not Found"})
        }
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})

// Adding new Item
app.post('/addList', async (req,res) => {
    try{
        const myData = req.body;
        console.log("myData ", myData);
        await listModel.create(myData);
        res.json({message:"Go peacefully"})
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
})


//Deleting The Item
app.delete('/deleting/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const destination = await listModel.findOne({id});
        console.log("destination", destination);
        if(destination){
            await listModel.deleteOne({id});
            res.json({message:"Deleted Great"})
        }
        else{
            res.json({message:"Item is NOt There"})
        }
        
    }
    catch(err){
        res.status(500).json({err:err.message});
    }
})
app.listen(port, () => console.log("Alhamdulila for EveryThing!" + port))