var PatientController = require('../controllers/patientController');
var StudyController = require('../controllers/studyController');
var HomeController = require('../controllers/homeController');
var SeriesController = require('../controllers/seriesController');
var InstanceController = require('../controllers/instanceController');
var SearchController = require('../controllers/searchController');

module.exports = function(app){

    app.get('/', HomeController.Index);
    app.get('/patients', PatientController.Index);
    app.get('/studies/:sid', StudyController.Index);
    app.get('/series/:sid', SeriesController.Index);
    app.get('/instances/:sid/:seriesId', InstanceController.Index);
    app.post('/search', SearchController.Index);
}
