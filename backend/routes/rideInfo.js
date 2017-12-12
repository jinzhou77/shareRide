const rideInfo = require('../models/rideinfo');
var express= require('express'),
    router= express.Router()
var twilio = require('twilio');
//Rideinfo API START*******************************************************************************************************
/* GET rideinfos listing. */
router.get('/', function(req, res, next) {


  res.set({
      'Content-Type': 'application/json'
  });
  var number_query = Object.keys(req.query);
  if(number_query.length===0){
    rideInfo.find({}, function(err, rideInfos){
      if(err){
        res.status(500).json({message: 'find rideinfos error!', data: {}});
      }else if( rideInfos ===null){
        res.status(404).json({message: 'Data is empty', data: {}});
      }else {
        res.status(200).json({message: 'rideinfos', data: rideInfos});
      }
    })
  }else{
    var queryStr = req.query.where;
    var query = JSON.parse(queryStr);
    const name={
      driverName:query.driverName
    }
    const condition = {
        destination: query.destination,
        departure:query.departure,
        hasSeats: {$gte: query.hasSeats},
        date: query.date,
        time: query.time
    };
    console.log(query.driverName);
    if(query.driverName===undefined || query.driverName===''){
      rideInfo.find(condition, function (err, rideinfos) {
          if (err) {
              res.status(500).json({message: 'find rideinfos error!', data: {}});
          } else {
              res.status(200).json({message: 'rideinfos', data: rideinfos});
          }
      })
    }else{
      rideInfo.find(name, function (err, rideinfos) {
          if (err) {
              res.status(500).json({message: 'find rideinfos error!', data: {}});
          } else {
              res.status(200).json({message: 'rideinfos', data: rideinfos});
          }
      })
    }
  }


});
router.put('/:id', function(req, res){
  var rideInfoUpdate={
    _id:req.params.id
  }
  var rideInfoPost= new rideInfo();
  rideInfoPost={
    passengerEmail:req.body.passengerEmail,
    passengerGender:req.body.passengerGender,
    hasSeats:req.body.hasSeats,
    passengerSeats:req.body.passengerSeats,
    passengerPhoneNumber:req.body.passengerPhoneNumber
  }
  if(parseInt(rideInfoPost.hasSeats) < 0){
    res.status(500).json({
      message:"The car is full!",
      data:{}
    });
  }else{
    rideInfo.findById(rideInfoUpdate, function(err, rideInfo){
      if(err){
        res.status(500).json({
          message:err,
          data:{}
        });
      }else if(rideInfo == null){
        res.status(404).json({
          message:"RideInfo Not Found",
          data:{}
        });
      }else{
        rideInfo.passengerEmail = rideInfoPost.passengerEmail;
        rideInfo.passengerGender = rideInfoPost.passengerGender;
        rideInfo.hasSeats=rideInfoPost.hasSeats;
        rideInfo.passengerSeats=rideInfoPost.passengerSeats;
        rideInfo.passengerPhoneNumber=rideInfoPost.passengerPhoneNumber;
        rideInfo.save(function(err, updatedRideInfo){
          if(err){
            res.status(500).send({
              message:err,
              data:{}
            })
          }else{
            res.status(200).send({
              message:"rideInfo updated",
              data:updatedRideInfo
            });
          }
        });
      }
    });
  }
});
router.post('/', function (req, res) {
    res.set({
        'Content-Type': 'application/json'
    });
    var rideInfoPost= {
      driverName:req.body.driverName,
      departure:req.body.departure,
      destination:req.body.destination,
      hasSeats:req.body.hasSeats,
      driverEmail:req.body.driverEmail,
      driverGender:req.body.driverGender,
      date:req.body.date,
      time:req.body.time,
      phoneNumber:req.body.phoneNumber
    }
    rideInfo.create(rideInfoPost, function(err, rideInfo){
      if(err){
        res.status(500).json({
          message: 'insert rideinfo error!',
          data: {}
        });
      }else if(req.body.driverName === ''
                || req.body.driverName === undefined
                || req.body.departure === ''
                || req.body.departure === undefined
                || req.body.destination === ''
                || req.body.destination === undefined /*|| req.body.departureTime === '' || req.body.departureTime === undefined*/
                || req.body.hasSeats === ''
                || req.body.hasSeats === undefined
                || req.body.time === ''
                || req.body.date ===''
                || req.body.time === undefined
                || req.body.date ===undefined
                || req.body.phoneNumber === ''
                || req.body.phoneNumber === undefined){
        res.status(403).json({
          message: 'some required fields are missing',
          data: {}
        });
      }else{
        res.status(201).json({message: 'new rideinfo created', data: rideInfo});
      }
    })
  });
  //message alert
router.post('/messagealert', function(req, res){
  res.set({
      'Content-Type': 'application/json'
  });
  const driverPhoneNumber = JSON.stringify(req.body.driverPhoneNumber);
  var accountSid = 'ACff4eca08f09e1e102fa6fd09a463cca5'; // Your Account SID from www.twilio.com/console
  var authToken = '97a723575134b28de3fd61ac6d862b85';   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  client.messages.create({
      body: 'Hi! Someone send your a ride request.',
      to: '+12178986756',  // Text this number
      from: '+13474620785 ' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));

});
//RideInfo API END*****************************************************************************************************************
module.exports=router;
