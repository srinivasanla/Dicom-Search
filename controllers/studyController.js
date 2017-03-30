const http = require('http');
const fs = require('fs');
const Model = require('../models/getJSON');


exports.Index = function(request, response){
	var studyId = request.params.sid;
    url = "/studies/"+studyId;
    Model.getResponse(url,function(err,result) {
        response.study = result;
        fs.writeFile('results.txt', JSON.stringify(result), function (err) {
                  if (err) return console.log(err);
        });
        response.render('layouts/study',response.study);
    });

};

