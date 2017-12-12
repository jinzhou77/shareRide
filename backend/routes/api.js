
const Users = require('../models/user');
const Rideinfo = require('../models/rideinfo');

module.exports = function(router, passport) {

    router.post('/register',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(200).json({ user: req.user.email
        });
    });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email
        });
    });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });

    router.get('/users', function(req, res){
      res.status(200).json({ user: req.user, message: "Welcome!"
      });
    });
    //USER API START**************************************************************************************************************
    /* GET users listing. */
    router.get('/', function(req, res, next) {
        const conditionStr = req.query.where;
        const condition = JSON.parse(conditionStr);
        console.log(condition);
        res.set({
            'Content-Type': 'application/json'
        });

        Users.find(condition, function (err, users) {
            if (err) {
                res.status(500).json({message: 'find users error!', data: {}});
            } else {
                res.status(200).json({message: 'current users', data: users});
            }
        })
    });

  // router.post('/', function (req, res) {
  //     res.set({
  //         'Content-Type': 'application/json'
  //     });
  //       if (req.body.name === '' || req.body.name === undefined || req.body.email === '' || req.body.email === undefined) {
  //           res.status(403).json({message: 'name and email can not be empty!', data: {}});
  //       } else {
  //           Users.find({email: req.body.email}, function (err, usersSameEmail) {
  //               if (err) {
  //                   res.status(500).json({message: 'insert user error!', data: {}});
  //               } else {
  //                   if (usersSameEmail.length > 0) {
  //                       res.status(403).json({message: 'email already exists!', data: {}});
  //                   } else {
  //                       const newUser = new Users({
  //                           name: req.body.name,
  //                           email: req.body.email,
  //                           gender:req.body.gender,
  //                           phoneNumber: req.body.phoneNumber
  //                       });
  //                       newUser.save(function (err, newUser) {
  //                           if (err) {
  //                               res.status(500).json({message: 'insert user error!', data: {}});
  //                           } else {
  //                               res.status(201).json({message: 'new user created', data: newUser});
  //                           }
  //                       });
  //                   }
  //               }
  //           });
  //         }
  //   });
    //User API END**************************************************************************************************************

  return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
