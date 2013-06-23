define(function (require) {
    var router = require('durandal/plugins/router');

    var selectPlayers = function () {
        router.navigateTo('#/selectplayers');
    };

    return {
        selectPlayers: selectPlayers
    };
});