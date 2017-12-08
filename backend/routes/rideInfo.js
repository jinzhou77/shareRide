const rideInfo = require('../models/rideinfo');
var express= require('express'),
    router= express.Router()
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

    const condition = {
        destination: query.destination,
        departure:query.departure,
        hasSeats: {$gte: query.hasSeats},
    };
    rideInfo.find(condition, function (err, rideinfos) {
        if (err) {
            res.status(500).json({message: 'find rideinfos error!', data: {}});
        } else {
            res.status(200).json({message: 'rideinfos', data: rideinfos});
        }
    })
  }


});
router.put('/:id', function(req, res){
  var rideInfoUpdate={
    _id:req.params.id
  }
  var rideInfoPost= new rideInfo();
  rideInfoPost={
    passengersEmail:req.body.passengersEmail,
    hasSeats:req.body.hasSeats
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
        rideInfo.passengersEmail = rideInfoPost.passengersEmail;
        rideInfo.hasSeats=rideInfoPost.hasSeats;
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
    // res.set({
    //     'Content-Type': 'application/json'
    // });
    var rideInfoPost= {
      driverName:req.body.driverName,
      departure:req.body.departure,
      destination:req.body.destination,
      hasSeats:req.body.hasSeats,
      driverEmail:req.body.driverEmail
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
                || req.body.hasSeats === undefined){
        res.status(403).json({
          message: 'some required fields are missing',
          data: {}
        });
      }else{
        res.status(201).json({message: 'new rideinfo created', data: rideInfo});
      }
    })
  });
//RideInfo API END*****************************************************************************************************************
module.exports=router;
