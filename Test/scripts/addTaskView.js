(function (global) {
    app = global.app = global.app || {};

    AddTaskViewModel = kendo.data.ObservableObject.extend({
        onDoneClick: function(e) {                            
            if (this.title.trim() === "" || this.description.trim()=== "" || this.date === undefined) {                
                $('#createItemError').text("Title, description and date are required");
                $("#createItemError").toggleClass("hidden", false);                                                                                 
                return;
            }
           var onSuccess = function(data)
            {            
                $("#createItemError").toggleClass("hidden", true);
                app.application.navigate('views/mainView.html');
            };
            
            var onError = function (err)            
            {   
                $('#createItemError').text("Title, description and date are required");
                $("#createItemError").toggleClass("hidden", false);     
                
            };
           teamPulse.createNewItem(this.title, this.description,this.date,onSuccess,onError);
        },
        onCancelClick: function(e) {
            app.application.navigate('views/mainView.html');
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
