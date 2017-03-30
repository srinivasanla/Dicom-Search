const async = require('async');
const fs = require('fs');
const Model = require('../models/getJSON');


exports.Index = function(request, response){
	var studyId = request.params.sid;
    var studyURL = "/studies/"+studyId;
    var seriesURL = "/series/"+request.params.seriesId;
    console.log("studies id :" + studyURL);
    console.log("seriesURL id :" + seriesURL);
    Model.getResponse(studyURL,function(e,studies) {
        console.log("Study:" + studies);
        response.study = studies;
        Model.getResponse(seriesURL,function(e,series) {
            console.log("series:" + series);
            response.series = series;
            var urls = [];
            series.Instances.forEach(function(element) {
              urls.push("/instances/"+element);
            });
            async.map(urls, Model.getResponse , function (err, res){
                console.log("instances:"+res)
                response.instances = res;
                response.render('layouts/instances',(response));
            });
        });
    });
};