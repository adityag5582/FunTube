import express from 'express';
import mongoose from 'mongoose';
import config from './config.js';
import dotenv from 'dotenv';
import uploadRoute from './routes/uploadRoute.js';
import userRoute from './routes/userRoute.js';
import videoRoute from './routes/videoRoute.js';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();

const mongodb_url = config.MONGODB_URL;
const port = config.PORT;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(mongodb_url, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).catch((error)=> console.log(error.reason));


app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/videos', videoRoute);

const __dirname = path.resolve();
// const __dirname = "F:\AtranZ_WebApp";
// app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`));
});
app.listen(port, () => {console.log(`server started at http://localhost:${port}`)})