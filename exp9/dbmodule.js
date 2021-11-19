var databaseUrl = "localhost/mydb2";
var mongojs = require("./node_modules/mongojs");
var db = mongojs(databaseUrl);
db.collection("signupinformation");
console.log("Connected");

exports.authenticateUser = function (email, epass, response) {


    db.signupinformation.find({ "Email": email, "Password": epass },
        function (err, users) {
            //console.log(users);
            //console.log(err);
            if (err || !users) {
                response.write("..Not authorized user and its Error" || err);
                response.end();
            } else if (users.length == 0) {
                response.write("Not authorized user");
                response.end();
            } else {
                response.write("Authorized user")
                response.end();
            }

        });
}

exports.saveUser = function (empid, ename, eage, email, ephno, ebg, eadd, epass, response) {
    console.log('Saving user to mongo');
    console.log("Signup details is saved");
    db.signupinformation.insert({ "_id": empid, "Name": ename, "Age": eage,"Email": email, "PhoneNo": ephno,"Bloodgroup":ebg,"Address":eadd,"Password":epass },

        function (err, saved) {
            if (err)
                console.log(err + "Error");
            if (err || !saved) {
                response.write(ename + "is not Saved");
                response.end();
                console.log(err, "Error");
            }
            else {
                response.write(ename + "is Saved");
                response.end();
                console.log("User saved ");
                //dbo.close;
            }
        });
}

exports.update = function (empid, ename, eage, email, ephno, ebg, eadd, epass, response) {
    console.log('update');
    
    db.signupinformation.updateOne({ "_id": empid }, { $set: { "Name": ename, "Age": eage,"Email": email, "PhoneNo": ephno,"Bloodgroup":ebg,"Address":eadd,"Password":epass } }, { upset: true },
        function (err, users) {
            if (err || !users) {
                response.write("!!Your changes is not Updated" || err);
                response.end();
            }
            else if (users.length == 0) {
                response.write("please fill yours updates!!");
                response.end();
            }
            else {
                response.write(ename + " Your changes is Updated...");
                response.end();
                console.log("Successfully Updated");
                //dbo.close;
            }
        });
}

exports.del = function (empid, epass, response) {
    console.log('delete');

    db.signupinformation.remove({ "_id": empid ,"Password": epass},
        
            function (err, users) {

            if (err || !users) {

                response.write("!!Your Selected Value is not Removed!!" || err);
                response.end();
            }
            else if (users.length == 0) {

                response.write("!!Your Selected Value is not Removed!!");
                response.end();
            }
            else {
               
                response.write(" Your Selected Value is Removed....");
                response.end();
            }
        });
}