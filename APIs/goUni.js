module.exports = function goHome(req,res, db, goingHomeModels,goingUniModels,daysModels,nJwt,jalaali) {
  console.log('go uni API');
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
          //user found
          daysModel=new daysModels();
          goingHomeModel= new goingHomeModels();
          goingUniModel= new goingUniModels();
          //daysModel
        //  var date = jalaali.toJalaali(new Date());
          daysModel.dayCounter =user.dayCounter +1 ;
          daysModel.totalTime =req.body.timeLength;
          daysModel.overallCash = req.body.expenditure;
          //goingUniModel
          goingUniModel.timeLength=req.body.timeLength;
          goingUniModel.expenditure=req.body.expenditure;
          goingUniModel.status= true;
          goingUniModel.destination = 'Alzahra University';
          goingUniModel.startPoint = req.body.location;
          daysModel.goingUni = goingUniModel;
          //goingHomeModel
          goingHomeModel.timeLength=null;
          goingHomeModel.expenditure=null;
          goingHomeModel.destination = null;
          goingHomeModel.startPoint = null;
          goingHomeModel.status = false;
          daysModel.goingHome = goingHomeModel;

          db.collection('users').update({"_id":ObjectID(id)},{$push :{daysArray:daysModel}},function (err,updated) {
              res.json({success:true});
          });
        }
      });

}
