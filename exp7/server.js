var module = require('./dbmodule');
var url = require('url');
var querystring = require('querystring');
var http = require('http');

http.createServer(function (request, response) {
    var data1 = '';
    if (request.url === '/favicon.ico') {
        response.writeHead(200, { 'Content-Type': 'image/x-icon' });
        response.end();
    }
    else {
        request.on('data', function (chunk) {
            data1 += chunk;
            console.log(data1);
        });

        request.on('end', function () {
            var usid = querystring.parse(data1)["usid"];
            console.log(usid);
            var pass = querystring.parse(data1)["pass"];
            console.log(pass);
            var usname = querystring.parse(data1)["usname"];
            console.log(usname);
            var org = querystring.parse(data1)["org"];
            console.log(org);
            var gen = querystring.parse(data1)["gen"];
            console.log(gen);
            var branch = querystring.parse(data1)["branch"];
            console.log(branch);
            var exp = querystring.parse(data1)["exp"];
            console.log(exp);
            var email = querystring.parse(data1)["email"];
            console.log(email);
            var mob = querystring.parse(data1)["mob"];
            console.log(mob);

            if (request.url === '/login') {
                module.authenticateUser(usid, pass, usname, org, gen, branch, exp, email, mob, response);
            }
            else if (request.url === '/save') {
                module.saveUser(usid, pass, usname, org, gen, branch, exp, email, mob, response);
            }
            else {
                console.log("Invalid url ");
            }
        });
    }
}).listen(3000);
console.log("Server started.......");