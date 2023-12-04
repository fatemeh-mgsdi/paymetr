module.exports = function doRegister(req, res, db,userModels) {
  console.log('Register API');
  var flag =0;
     var cursor = db.collection('users').find({$or: [{username:req.body.username},{password: req.body.password}]});
     cursor.forEach(function(User,err){
       flag =flag +5;
     },function(){
       flag =flag +5;
       if (flag=== 5) {
         var userModel = new userModels();
         userModel.username=req.body.username;
         userModel.password = req.body.password;
         userModel.dayCounter =0;
         userModel.daysArray = [];
         db.collection('users').save(userModel,function(err){
             if(err){
               res.status(500).json({err:'error while saving data'});
             }else {
               res.json({success : true});
             }
           });

       }else {
         res.status(303).json({err :'this user exists'});
       }
     });
}
