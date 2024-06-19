
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Job = require('./models/Job');
const { updateUrl, deleteUrl } = require('./googleIndexing');
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error :", err);
    });

app.post('/job', async (req, res) => {
    const jobData = req.body;
    try {
        const job = new Job(jobData);
        await job.save();

        const jobUrl = `https://www.sproutsai.com/career/${job._id}`;
        await updateUrl(jobUrl);

        res.status(201).send(job);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/job/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).send(job);
    } catch (err) {
        res.status(400).send(err);
    }
});

// app.delete('/job/:id', async (req, res) => {
//     try {
//         const job = await Job.findByIdAndDelete(req.params.id);
//         const jobUrl = `https://www.sproutsai.com/career/${job._id}`;
//         await deleteUrl(jobUrl);

//         res.status(200).send({ message: 'Job deleted' });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
});



// app.put('/job/:id', async (req, res) => {
//     try {
//         const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         const jobUrl = `https://www.sproutsai.com/career/${job._id}`;
//         await updateUrl(jobUrl);

//         res.status(200).send(job);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });
