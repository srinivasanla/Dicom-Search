const fs = require('fs');

exports.Index = function(request, response){
	console.log("in the post"+request.body.searchKey);
	fs.readFile('results.txt', 'utf8', function (err,data) {
	//console.log(data);

		if (err) {
			return console.log(err);
		}
		response.data = getObjects(JSON.parse(data),"",request.body.searchKey);
        console.log(response.data)
		response.render('layouts/search',(response));
});
}

function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}