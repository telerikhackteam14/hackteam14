(function (global) {
    app = global.app = global.app || {};

    TaskDetailsViewModel = kendo.data.ObservableObject.extend({
        onBackClick: function(e) {
            app.application.navigate('views/mainView.html');
        }
    });
    
    if (!app.taskService){
          app.taskService = {};
    }
    app.taskService.taskDetailsView = new TaskDetailsViewModel();
})(window);
