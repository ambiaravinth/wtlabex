var databaseUrl = "localhost/data";
var mongojs = require("./node_modules/mongojs");

var db = mongojs(databaseUrl);
db.collection("users");
console.log("Connected dbmodule ready......");

exports.authenticateUser = function (usid, pass, usname, org, gen, branch, exp, email, mob, responce) {
    db.student.find({ "_id": usid, "Password": pass, },
        function (err, users) {
            if (err || !users) {           
                responce.write("Login Faild" || err);
                responce.end();
            } else {   
                responce.write("<h1 style=\"text-align: center;\">welcome "+usname+"</h1>");
                responce.write("<h4>UserID:</h4><p>"+users+"</p>");
                responce.write("<h4>Password:</h4><p>"+pass+"</p>");
                responce.write("<h4>Oraganisation:</h4><p>"+org+"</p>");
                responce.write("<h4>Gender:</h4><p>"+gen+"</p>");
                responce.write("<h4>Branch:</h4><p>"+branch+"</p>");
                responce.write("<h4>Experiance:</h4><p>"+exp+"</p>");
                responce.write("<h4>Email:</h4><p>"+email+"</p>");
                responce.write("<h4>Mobile:</h4><p>"+mob+"</p>");
                responce.end();
            }
        });
}

exports.saveUser = function (usid, pass, usname, org, gen, branch, exp, email, mob, responce) {
    console.log('Saving user to mongo');
    db.student.insert({ "_id": usid, "Password": pass, "Name": usname, "Organisation": org, "Gender": gen, "Branch": branch,"Experiance": exp, "Email": email, "Mobile": mob },
        function (err, saved) {
            if (err)
                console.log(err + "Error");
            if (err || !saved) {
                responce.write(+usname + " is not Saved");
                console.log(err);
                responce.end();
            }
            else {
                responce.write(usname + " is Saved");
                console.log("User saved");
                responce.end();
            }
        });
}