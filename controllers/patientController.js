const http = require('http');
const fs = require('fs');
const Model = require('../models/getJSON');




exports.Index = function(request, response){

    url = "/patients/a8be3402-2541a9ef-1839edec-5bec9127-fa885da0";
    Model.getResponse(url,function(err,result) {
        response.json = result;
        fs.writeFile('results.txt', JSON.stringify(res), function (err) {
                  if (err) return console.log(err);
            });
        response.render('layouts/patient',response.json);
    });

};

