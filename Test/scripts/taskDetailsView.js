(function (global) {
    app = global.app = global.app || {};

    TaskDetailsViewModel = kendo.data.ObservableObject.extend({
        onDoneClick: function(e) {
            
        },
        onCancelClick: function(e) {
            app.application.navigate('#tabstrip-mainview');
        },      
        description: 'test description',
        title: 'test'
    });
    
    if (!app.taskService){
          app.taskService = {};
    }
    app.taskService.taskDetailsView = new TaskDetailsViewModel();
})(window);
