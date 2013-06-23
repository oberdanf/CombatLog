// ########################
// # Custom Bind Handlers #
// ########################


(function () {

    /// <summary>JQuery Mobile Refresh</summary>
    ko.bindingHandlers.jqmRefresh = {
        update: function (element, valueAccessor) {
            ko.utils.unwrapObservable(valueAccessor());
            var jqElement = $(element);
            if (jqElement.prop('disabled') === true) {
                jqElement.parent('.ui-checkbox').addClass('ui-disabled');
            } else {
                jqElement.parent('.ui-checkbox').removeClass('ui-disabled');
            }
        }
    };


})();