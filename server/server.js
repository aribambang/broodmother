import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';

const morgan = require('morgan');
require('dotenv').config();

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Connection Error', err));

app.use(express.json({ limit: '5mb' }));
app.use(cors());

readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)));

const port = 8000 || process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
