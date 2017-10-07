(function () {
    "use strict";

    var eventsUrl = "/api/events";
    var authUrl = "/api/user";

    var events = [
        {
            id: 1,
            name: "Event 1",
            desc: "Event 1 description",
            venue: "Event 1 Venue",
            dateTime: "2017-10-05 15:00"
        },
        {
            id: 2,
            name: "Event 2",
            desc: "Event 2 description",
            venue: "Event 2 Venue",
            dateTime: "2017-10-06 11:00"
        },
        {
            id: 3,
            name: "Event 3",
            desc: "Event 3 description",
            venue: "Event 3 Venue",
            dateTime: "2017-10-07 12:00"
        },
        {
            id: 4,
            name: "Event 4",
            desc: "Event 4 description",
            venue: "Event 4 Venue",
            dateTime: "2017-10-08 16:00"
        },
        {
            id: 5,
            name: "Event 5",
            desc: "Event 5 description",
            venue: "Event 5 Venue",
            dateTime: "2017-10-09 17:00"
        }
    ];

    var appStorage = {};
    
    angular.module("app")
    .run(function ($httpBackend, $localStorage) {
        var appStorage = $localStorage.$default({
            userList: [],
            registeredEvents: {}
        });

        var myEvents = appStorage.registeredEvents;
        
        $httpBackend
            .whenGET(eventsUrl)
            .respond(events);
        
        $httpBackend
            .whenPOST(eventsUrl + "/myevents")
            .respond(function (method, url, data) {
                var evtData = angular.fromJson(data);
                myEvents[evtData.userEmail] = myEvents[evtData.userEmail] || [];

                var result = events.filter(function (evt) {
                    return myEvents[evtData.userEmail].indexOf(evt.id) > -1;
                });
                return [200, result, {}];
            });

        var detailRegex = new RegExp(eventsUrl + "/[0-9]*", '');
        $httpBackend
            .whenGET(detailRegex)
            .respond(function (method, url, data) {
                var evt = {"id": 0};
                var parameters = url.split('/');
                var length = parameters.length;
                var id = parameters[length - 1];

                if (id > 0) {
                    for (var i = 0; i < events.length; i++) {
                        if (events[i].id == id) {
                            evt = events[i];
                            break;
                        }
                    };
                }
                return [200, evt, {}];
            });

        $httpBackend
            .whenPOST(eventsUrl + "/register")
            .respond(function (method, url, data) {
                var evt = angular.fromJson(data);

                if (evt) {
                    myEvents[evt.userEmail] = myEvents[evt.userEmail] || [];
                    myEvents[evt.userEmail].push(evt.id);
                }
                return [200, evt, {}];
            });

        $httpBackend
            .whenPOST(eventsUrl + "/deregister")
            .respond(function (method, url, data) {
                var evt = angular.fromJson(data);
                if (evt) {
                    myEvents[evt.userEmail] = (myEvents[evt.userEmail] || []).filter(function (myEvtId) {
                        return myEvtId != evt.id;
                    });
                }
                appStorage.registeredEvents[evt.userEmail] = myEvents[evt.userEmail];
                return [200, evt, {}];
            });

        $httpBackend
            .whenPOST(authUrl + "/register")
            .respond(function (method, url, data) {
                var userInfo = angular.fromJson(data);
                if (userInfo) {
                    appStorage.userList.push(userInfo);
                }
                return [200, userInfo, {}];
            });

        $httpBackend
            .whenPOST(authUrl + "/login")
            .respond(function (method, url, data) {
                var userInfo = angular.fromJson(data);
                if (userInfo) {
                    var authUser = appStorage.userList.filter(function (user) {
                        return (user.email === userInfo.email && user.password === userInfo.password);
                    });
                    if(authUser && authUser[0]) {
                        return [200, authUser[0], {}];
                    }
                }
                return [500, {message: "Invalid email and/or password!"}, {}];
            });
      
        $httpBackend.whenGET(/.*/).passThrough();
    });
}());