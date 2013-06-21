define(function () {
    var player = function (name, email) {
        var self = this;
        self.name = name;
        self.email = email;
        self.marked = ko.observable(false);
    };
    return player;
});