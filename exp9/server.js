var module = require('./dbmodule');
var url = require('url');
var querystring1 = require('querystring');
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
        });

        request.on('end', function () {
            var empid = querystring1.parse(data1)["empid"];
            console.log(empid);
            var ename = querystring1.parse(data1)["ename"];
            console.log(ename);
            var eage = querystring1.parse(data1)["eage"];
            console.log(eage);
            var email = querystring1.parse(data1)["email"];
            console.log(email);
            var ephno = querystring1.parse(data1)["ephno"];
            console.log(ephno);
            var ebg = querystring1.parse(data1)["ebg"];
            console.log(ebg);
            var eadd = querystring1.parse(data1)["eadd"];
            console.log(eadd);
            var epass = querystring1.parse(data1)["epass"];
            console.log(epass);
            
            if (request.url === '/login') {
                module.authenticateUser(email, epass, response);
            }
            else if (request.url === '/save') {
                module.saveUser(empid, ename, eage, email, ephno, ebg, eadd, epass, response);
            }
            else if (request.url === '/update') 
            {
                 module.update(empid, ename, eage, email, ephno, ebg, eadd, epass, response);
            }
            else if (request.url === '/del') 
            {
                module.del(empid, epass, response);
            }
            else {
                response.write("PAGE IS  NOT FOUND");
                console.log("invalid url");
            }
            //console.log(name+" "+email);
            //module.authenticateUser(name,email,response); 
            //module.saveUser(name,email);
        });
    }
}).listen(1234);
console.log("Server started");


