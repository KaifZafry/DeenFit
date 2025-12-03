const express = require('express');
const connectDB= require('./config/database')
const cors= require('cors');
const app = express();

app.use(cors());
app.use(express.json())


app.use("/api/auth", require("./routes/authRoutes"));
connectDB()
.then(()=>{
    console.log('your database has been connected')
    app.listen(7000, ()=> console.log('your app is listening on port 7000'))
})
.catch((err)=>{
    console.log('connection failed ' + err.message)
    console.error(err.stack);
})