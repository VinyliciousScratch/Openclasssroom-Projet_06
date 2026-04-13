const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const bookRoutes =require('./routes/book_routes');
const userinforoutes = require('./routes/userinfo_routes');


mongoose.connect('mongodb+srv://Utilisateur_test_1:projet06@clusterproject.lrjsqry.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.log('Connexion à MongoDB échouée !', err));


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


app.use('/api/books',bookRoutes);
app.use('/api/auth', userinforoutes);
app.use('/images' ,express.static(path.join(__dirname, 'images'))) ;

module.exports = app;