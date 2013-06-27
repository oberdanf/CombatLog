define(function (require) {
    var router = require('durandal/plugins/router'),
        combatService = require('services/combatService');

    var startNewCombat = function () {
        combatService.startNewCombat();
        router.navigateTo('#/selectplayers');
    };

    return {
        startNewCombat: startNewCombat
    };
});