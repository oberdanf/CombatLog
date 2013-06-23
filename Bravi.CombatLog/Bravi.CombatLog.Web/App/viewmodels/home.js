define(function (require) {
    var router = require('durandal/plugins/router');

    var startCombat = function () {
        router.navigateTo('#/selectplayers');
    };

    return {
        startCombat: startCombat
    };
});