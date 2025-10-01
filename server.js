const express = require ("express")
const app = express()
const dotenv = require ("dotenv").config();
const connectDb = require("./dbConnecton");
const Job = require("./schemas/jobsSchema");
const cors = require("cors");

const PORT = process.env.PORT || 5000

connectDb
app.use(express.json())
app.use(cors())

app.listen(PORT, (req,res)=>{ 
    console.log( `server is listening to port: ${PORT}`)
 })

 // Database calls 

 app.get('/', (req, res) => {
  res.send('API is running. Try /jobs');
});

 //Get jobs from database
app.get("/jobs", async(req, res)=>{
    const job = await Job.find()
    try {
        return res.status(200).json(job)
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
    
})

// Add new jobs in the database 
app.post("/jobs", async (req,res)=>{
    const newJob = new Job(req.body)
    await newJob.save()
    return res.status(200).json({message:"New Job has been added",newJob})
})

//add comments to database
app.patch("/comments/:id", async (req, res)=>{
    const id = (req.params.id)
    const job = await Job.findById(id)
    const newComment = (req.body.comment)

    await job.comments.unshift(newComment)

    try {
        await job.save()
        return res.status(200).json({message:"New Comment added", comment:newComment})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})
