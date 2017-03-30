const async = require('async');
const fs = require('fs');
const Model = require('../models/getJSON');


var object = [];

exports.Index = function(request, response){
  response.r = [];

    Model.getResponse("/patients",function(e,result) {
        //response.study = result;
        var urls = []
        result.forEach(function(element) {
          urls.push("/patients/"+element);
        });

        async.map(urls, Model.getResponse , function (err, res){
            response.r = res;
            fs.writeFile('results.txt', JSON.stringify(res), function (err) {
                  if (err) return console.log(err);
            });
            object.push(response.r);
            response.render('layouts/home',(response));
    		});
        //console.log(object);
    });

};