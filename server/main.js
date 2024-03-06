require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { SERVER_PORT } = process.env
const { seed, getStates, getJobs, createJob, deleteJob, updateJob, getSalaryJobs, getRandomJobNews } = require('./controller.js')

app.use(express.json())
app.use(cors())

// DEV
app.post('/seed', seed)

// States
app.get('/states', getStates)

// Jobs
app.post('/jobs', createJob)
app.get('/jobs', getJobs)
app.get('/jobs/salary', getSalaryJobs)
app.delete('/jobs/:id', deleteJob)
app.put('/jobs/:id', updateJob)
app.get('/news', getRandomJobNews)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))