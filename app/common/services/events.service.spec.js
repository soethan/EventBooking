(function () {
    "use strict";

    describe("event service", function () {
        var eventsService;
        var $httpBackend;
        var eventsData = [
            {
                id: 1,
                name: "Event 1",
                desc: "Event 1 description",
                venue: "Event 1 Venue",
                dateTime: "2017-10-05 15:00"
            }
        ];

        beforeEach(module("app"));

        beforeEach(inject(function (_eventsService_, _$httpBackend_) {
            eventsService = _eventsService_;
            $httpBackend = _$httpBackend_;
        }));

        it("should get events", function () {
            var response;

            $httpBackend
                .whenGET("http://localhost:8000/api/events")
                .respond(200, eventsData);

            eventsService.getEvents().query(function (data) {
                response = data;
            });

            $httpBackend.flush();
            expect(response).toBe(eventsData);
        });

    });
});