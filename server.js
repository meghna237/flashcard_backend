const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const authRoutes = require('./routes/dbRoutes.js');
app.use('/api',authRoutes);
app.use("/*", (req, res)=>{
    res.send("No  Routes")
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port 4000`));
