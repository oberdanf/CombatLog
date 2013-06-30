define(function (require) {
    var router = require('durandal/plugins/router');

    var startNewCombat = function () {
        router.navigateTo('#/selectplayers');
    };

    return {
        startNewCombat: startNewCombat
    };
});