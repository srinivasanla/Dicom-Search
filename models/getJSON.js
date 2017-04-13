var http = require('http');



exports.getResponse= function(url,callback) {
    
    var options = {
                        host: '*********',
                        port: 80,
                        path: url,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
    var results = []
	
		http.get(options, function(res) {
    	res.on('data', function(chunk){
        	results.push(chunk);
    	});

    	res.on('end', function(err){
            results = JSON.parse(results);
            //console.log(results)
        	callback(err,results);
    	});

		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
};