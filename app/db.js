var _ = require('underscore');
var Q = require('q');
var mongoose = require('mongoose');
var models = require('./db-models.js')(mongoose);

//mongoose.set('debug', true);

mongoose.connect('mongodb://locallearnersqa:thirstyscholar1@ds043200.mongolab.com:43200/locallearnersqa');

var db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to mongolab, database ready.');
});

module.exports.getCategories = function (callback) {
    models.Category.find({}, function(err, data) {
        callback(data);
    });
}
module.exports.getCategory = function (query) {
    var defer = Q.defer();
    models.Category.find(query, function (err, data) {
        if (err) {
            defer.reject(err);
        } else {
            var firstCategory = {
                name: data[0].name,
                value: data[0].value,
                imageUrl: data[0].imageUrl
            }
//            console.log('category ', firstCategory);
            defer.resolve(firstCategory);
        }
    });
    return defer.promise;
}

module.exports.insertCategories = function (categories) {
    for (var i = 0; i < categories.length; i++) {
        var newCategory = new models.Category(categories[i]);
        newCategory.save(function (err, category, numberAffected) {
            if (err) {
                //TODO: handle errors
                return;
            }
        });
    }
}



module.exports.getUpcomingClasses = getUpcomingClasses;
function getUpcomingClasses(filter, callback) {
    if (!filter) {
        models.UpcomingClass.find({}, function(err, data) {
            callback(data);
        });
    }
    else if (filter.eventId) {
        models.UpcomingClass.find({ eventId: filter.eventId }, function(err, data) {
            callback(data);
        });
    }
}

module.exports.setUpcomingClasses = function(upcomingClass) {
    getUpcomingClasses({ eventId: upcomingClass.eventId }, function(oldClass) {
        if (IsEmptyNullUndefined(oldClass)) {
            createUpcomingClass(upcomingClass);
        }
        else {
            upcomingClass._id = oldClass[0]._id;
            updateUpcomingClass(upcomingClass);
        }
    });
}

module.exports.addCategoriesToEvents = function (events) {
    var defer = Q.defer();

    var eventIds = _.pluck(events, 'eventId');

    models.UpcomingClass.find({ eventId: { $in: eventIds }}, function(err, upcomingClasses) {
        var eventsWithCategory =  _.map(events, function (e) {
            var matchingClass = _.findWhere(upcomingClasses, { eventId: e.eventId});
            e.category = matchingClass ? matchingClass.category : 'Unknown';
            return e;
        });

        defer.resolve(eventsWithCategory);
    });

    return defer.promise;
}

function createUpcomingClass(upcomingClass) {
    var u = new models.UpcomingClass(upcomingClass);
    u.save(function(err, u, numberAffected) {
        console.log('db createUpcomingClass ', JSON.stringify(u));
        //TODO: handle errors
    });
}

function updateUpcomingClass(upcomingClass) {
    models.UpcomingClass.update({ _id: upcomingClass._id }, upcomingClass, {}, function(err, numberAffected) {
        console.log('db updateUpcomingClass ', upcomingClass);
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//for local development
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.insertFakeEvents = function (fakeEvents) {
    for (var i = 0; i < fakeEvents.length; i++) {
        var newEvent = new models.FakeEvent(fakeEvents[i]);
        newEvent.save(function (err, fakeEvent, numberAffected) {
            if (err) {
                //TODO: handle errors
                return;
            }
        });
    }
}
module.exports.getFakeEvents = function (callback) {
    models.FakeEvent.find({}, function(err, events) {
        callback(events);
    });
}
module.exports.addFakeEvent = function (fakeEvent) {
    var defer = Q.defer();

    if (!isValidFakeEvent(fakeEvent)) {
        defer.reject('Invalid fakeEvent');
    }

    var fe = new models.FakeEvent(fakeEvent);
    fe.save(function (err, savedEvent, numberAffected) {
        if (err) {
            defer.reject('Can not save fakeEvent');
        } else {
            defer.resolve(savedEvent);
        }
    });

    return defer.promise;
}

function isValidFakeEvent(fakeEvent) {
//    if (typeof fakeEvent.visibility !== 'string') return false;
//    if (typeof fakeEvent.status !== 'string') return false;
//    if (typeof fakeEvent.maybe_rsvp_count !== 'number') return false;
//    if (typeof fakeEvent.utc_offset !== 'number') return false;
//    if (typeof fakeEvent.id !== 'string') return false;
//    console.log('typeof fakeevent.time ', fakeEvent.time );
//    if (typeof fakeEvent.time !== 'number') return false;
//    if (typeof fakeEvent.announced !== 'boolean') return false;
//    if (typeof fakeEvent.waitlist_count !== 'number') return false;
//    if (typeof fakeEvent.created !== 'object') return false;
//    if (typeof fakeEvent.yes_rsvp_count !== 'number') return false;
//    if (typeof fakeEvent.updated !== 'object') return false;
//    if (typeof fakeEvent.event_url !== 'string') return false;
//    if (typeof fakeEvent.headcount !== 'number') return false;
    if (typeof fakeEvent.name !== 'string') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group.id !== 'number') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    if (typeof fakeEvent.group !== 'object') return false;
//    visibility: String,
//        status: String,
//        maybe_rsvp_count: Number,
//        utc_offset: Number,
//        id: String,
//        time: Date,
//        announced: Boolean,
//        waitlist_count: Number,
//        created: Date,
//        yes_rsvp_count: Number,
//        updated: Date,
//        event_url: String,
//        headcount: Number,
//        name: String,
//        group: {
//        id: Number,
//            created: Date,
//            group_lat: Number,
//            name: String,
//            group_lon: Number,
//            join_mode: String,
//            urlname: String,
//            who: String
//    }
    return true;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
