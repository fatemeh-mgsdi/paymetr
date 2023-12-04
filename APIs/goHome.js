module.exports = function doLogin(req,res, db, goingHomeModels,goingUniModels,daysModels,nJwt,jdate) {
  console.log('go home API');
  var counter =0;
  var decodedToken = nJwt.verify(req.header('token'),"secret", 'HS256');
  var id = decodedToken.body.id;
  var ObjectID = require('mongodb').ObjectID;
  var user;
  var flag = 0;
  var cursor = db.collection('users').find( ObjectID(id));
  cursor.forEach(function (User, err) {
    user = User;
    flag = flag + 5;
    }, function () {
      flag = flag +5;
      if(flag === 5){
      //user not found
        res.status(404).send({error : "user was not found"});
      }else {
          var index = user.daysArray.length - 1 ;
          user.daysArray[index].goingHome.status = true;
          user.daysArray[index].goingHome.expenditure = req.body.expenditure;
          user.daysArray[index].goingHome.timeLength = req.body.timeLength;

          user.daysArray[index].overallCash =parseInt(req.body.expenditure) +parseInt(user.daysArray[index].goingUni.expenditure) ;
          user.daysArray[index].totalTime =parseInt(req.body.timeLength) +parseInt(user.daysArray[index].goingUni.timeLength) ;
          user.daysArray[index].goingHome.destination = req.body.location;
          user.daysArray[index].goingHome.startPoint = 'Alzahra University';
          db.collection('users').save(user,function (err,updated) {
              res.json({success:true});
          });
        }
      });

}
