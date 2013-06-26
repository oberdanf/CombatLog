define(function () {
    var combat = function () {
        var self = this;

        self.matches = [];
        self.addMatch = function (match) {
            self.matches.push(match);
        };
    };

    return combat;
});