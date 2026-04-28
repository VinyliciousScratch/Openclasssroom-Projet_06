
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


exports.rating  = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
  .then(book => {
    console.log("ID reçu :", req.params.id);
    console.log("USERID :", req.auth.userId);
    console.log("note :", req.body.rating);
    

    if (book.ratings.some(r => r.userId === req.auth.userId)) {
      return res.status(409).json({ message: 'Livre déjà noté' });
    }

    book.ratings.push({
      userId: req.auth.userId,
      grade: req.body.rating
    });
    
    const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);
    book.averageRating = book.ratings.length > 0
      ? Math.round((total / book.ratings.length) * 10) / 10
      : 0;



    book.save()
      .then(updatedBook => res.status(200).json(updatedBook))
      .catch(error => res.status(400).json({ error }));
  })


  .catch(error => res.status(500).json({ error }));
}


exports.bestrating  = (req, res, next) => {

  Book.find()                                        
    .sort({ averageRating: -1 })                       //trie les livres par note décroissante
    .limit(3)                                            //limiter aux 3 premiers du tri
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({ error }));


}