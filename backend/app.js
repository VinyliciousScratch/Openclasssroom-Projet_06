const express = require('express');

const app = express();


app.use(express.json());





app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


///////////////////////////////////////////////////////////////////////No Authentication///////////////////////////////////////////////////////////////


///////////////////SE CONNECTER//////////////////


app.post('/api/auth/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});

///////////////////S'INCRIRE//////////////////

app.post('/api/auth/signup', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});



///////////////////LISTE DES LIVRES//////////////////

app.get('/api/books', (req, res, next) => {
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: '1984',
      author: ' George Orwell',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      year: 1949,
      genre:'dystopia',
      averageRating: 5,
      userId: 'qsomihvqios',
    },

  ];
  res.status(200).json(stuff);
});




///////////////////LISTE DES LIVRES ID//////////////////


app.get('/api/books/:id', (req, res, next) => {

  res.status(200).json(stuff);
});


///////////////////LISTE DES LIVRES RATING//////////////////

app.get('/api/books/:id', (req, res, next) => {
  
  res.status(200).json(stuff);
});








module.exports = app;