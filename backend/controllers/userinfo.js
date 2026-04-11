const bcrypt = require('bcrypt');

const Userinfo = require('../models/UserInfo');

const jwt = require("jsonwebtoken");             



exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password,10)
    .then(hash =>{

        const userinfo = new Userinfo({

            email: req.body.email,
            password: hash
        });
        userinfo.save()
        .then(() => res.status(201).json({ message : 'Utilisateur inscrit'}))
        .catch(error => res.status(400).json({error}));
     })
      .catch(error => res.status(500).json({error}));

};

exports.login= (req, res, next) => {

    Userinfo.findOne({email: req.body.email})
        .then(user => {
            if (user ===null) {
                res.status(401).json({ message:'Email ou mot de passe incorrect'});
            } else {
                bcrypt.compare(req.body.password, user.password)

                .then(valid => {
                    if (!valid){
                        res.status(401).json({ message:'Email ou mot de passe incorrect'});
                    } else{
                        res.status(200).json({ 
                            userId: user._id,
                            token: jwt.sign({userId :user._id},"Jesuisuneclé:)ldfjgblkjdflbk",{expiresIn: '1h'})
                        });

                    }
                })
                .catch(error => res.status(500).json({error}));



            }

        })
        .catch(error => res.status(500).json({error}));






};