
const Book = require('../models/book');
const fs =require('fs');



exports.addbook = (req, res, next) => {
  const bookobject = JSON.parse(req.body.book);
  delete bookobject._id;
  delete bookobject._userId;
  const book = new Book({

    ...bookobject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  book.save()
    .then(() => res.status(201).json({ message : 'Livre enregistré'}))
    .catch(error => res.status(400).json({error}));
};


exports.listbook = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.getidbook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
};

exports.updateidbook = (req, res, next) => {
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : {...req.body};
      delete bookObject._userId;

      Book.findOne({_id: req.params.id})
        .then((book)=>{
          if (book.userId !=req.auth.userId){
            res.status(401).json({ message : 'modification non autorisée' });
          } else{
            Book.updateOne({_id: req.params.id},{...bookObject, _id: req.params.id})
              .then(()=> res.status(200).json( {message : 'Livre modifié'}))
              .catch(error => res.status(401).json({ error }));

          }

        })
        .catch(error => res.status(400).json({ error }));
    
};


exports.deletebook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
    .then(book=>{
          if (book.userId !=req.auth.userId){
            res.status(401).json({ message : 'modification non autorisée' });
          } else{
            const filename = book.imageUrl.split('/images/')[1]
            fs.unlink(`images/${filename}`,() => {
              Book.deleteOne({_id: req.params.id})
              .then(book => res.status(200).json({message : 'Livre Supprimé'}))
              .catch(error => res.status(401).json({ error }));
            });
          }

    })

    .catch(error => res.status(500).json({ error }));
}


