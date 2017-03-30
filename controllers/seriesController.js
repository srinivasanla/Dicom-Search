const async = require('async');
const fs = require('fs');
const Model = require('../models/getJSON');


exports.Index = function(request, response){
	var studyId = request.params.sid;
    studyURL = "/studies/"+studyId;
    Model.getResponse(studyURL,function(e,result) {
        var urls = []
        response.study = result;
        result.Series.forEach(function(element) {
          urls.push("/series/"+element);
        });
        async.map(urls, Model.getResponse , function (err, res){
            response.r = res;
            fs.writeFile('results.txt', JSON.stringify(res), function (err) {
                  if (err) return console.log(err);
            });
            response.render('layouts/series',(response));
        });
    });
};

