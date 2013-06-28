define(function () {
    var combat = function () {
        var self = this;

        self.matches = ko.observableArray([]);
        self.addMatch = function (match) {
            self.matches.push(match);
        };
    };

    return combat;
});