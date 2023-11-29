const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
app.use(cors());
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/sg', require('./routes/student-group.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/staff', require('./routes/staff.routes'));
app.use('/api/rt', require('./routes/research-topic.routes'));
app.use('/api/aws', require('./routes/aws.routes'));
app.use('/api/submission-type', require('./routes/submission-type.routes'));
app.use('/api/panel', require('./routes/panel.routes'));
app.use('/api/template', require('./routes/template.routes'));
app.use('/api/submission', require('./routes/submission.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${5000}`));
