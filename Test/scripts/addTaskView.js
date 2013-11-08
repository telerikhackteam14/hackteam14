(function (global) {
    app = global.app = global.app || {};

    AddTaskViewModel = kendo.data.ObservableObject.extend({
        onDoneClick: function(e) {
           teamPulse.createNewItem(this.title, this.description, null, null, null);
        },
        onCancelClick: function(e) {
            app.application.navigate('#tabstrip-mainview');
        },
        onDetailsViewOpen: function(e) {
            
        },
        description: 'test description',
        title: 'test',
        TestId: '123'
    });
    
    if (!app.taskService){
          app.taskService = {};
    }
    app.taskService.addTask = new AddTaskViewModel();
})(window);
