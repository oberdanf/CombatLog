define(function () {
    var combat = function () {
        var self = this;

        self.matches = ko.observableArray([]);
        self.addMatch = function (match) {
            self.matches.push(match);
        };
        self.latestMatch = function () {
            return self.matches()[self.matches().length - 1];
        };
    };

    return combat;
});