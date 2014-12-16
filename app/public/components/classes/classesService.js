localLearnerApp.factory('ClassesService', function () {
    return {
        getAvailableClasses: function(options) {
            var defaultOptions = {
                category: ''
            };
            var settings = _.extend(defaultOptions, options);

            var availableClasses = [
                {name:'Intro to Guitar',date:'December 18, 2015',location:'Downtown',category:'music',image:'music.png'},
                {name:'Advanced CSS Techniques',date:'October 5, 2015',location:'Fishers',category:'technology',image:'technology.png'},
                {name:'Basketweaving',date:'March 1, 2015',location:'Carmel',category:'DIY',image:'diy.png'},
                {name:'Ultimate Frisbee 101',date:'August 4, 2015',location:'Downtown',category:'sports',image:'sports.png'},
                {name:'Cooking Steaks',date:'January 21, 2015',location:'Fountain Square',category:'culinary',image:'culinary.png'},
                {name:'Broadway for Dummies',date:'September 21, 2015',location:'Downtown',category:'performing-arts',image:'performing-arts.png'},
                {name:'Taking Care of Cats',date:'June 28, 2015',location:'Avon',category:'other',image:'other.png'}
            ];

            var filter = settings.category === '' ? {} : { category: settings.category };
            var result = _.where(availableClasses, filter);
            console.log('getavailableclasses result ', result);

            return result;

        }
    }
})