const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

// PORT is for when app is hosted then API_PORT is for local environment
const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

const socketServer = require('./socketServer');
const authRoutes = require('./routes/authRoutes');
const authSendOTP = require('./routes/authSendOTP');
const profileFind = require('./routes/profileFind');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');

app.use(bodyParser.json({ limit: '500mb' }));

app.use(express.json());
app.use(cors());

app.route('/').get((req, res) => {
  res.send('Hi');
});

app.use('/auth', authRoutes);
app.use('/otp', authSendOTP);
app.use('/find', profileFind);
app.use('/friend-invitation', friendInvitationRoutes);

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  request
    .get(url)
    .on('error', (err) => {
      res.status(500).send(err.message);
    })
    .pipe(res);
});

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log('Server running on port:', PORT);
    });
  })
  .catch((err) => {
    console.log('Database connection failed with error:', err);
  });

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: String,
//   age: Number,
// });

// const User = mongoose.model('User', userSchema);

// const insertData = async () => {
//   try {
//     const newUser = new User({ name: 'John Doe', age: 30 });
//     const result = await newUser.save();
//     console.log(`A document was inserted with the _id: ${result._id}`);
//   } catch (error) {
//     console.error('Failed to insert data:', error);
//   }
// };
