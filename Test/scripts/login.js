(function (global) {
    var LoginViewModel,
    app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "abc",
        password: "abc",

        onLogin: function () {
            var that = this,
            username = that.get("username").trim(),
            password = that.get("password").trim();                
            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                                             function () {
                                             }, "Login failed", 'OK');

                return;
            }
                        
            var loginSuccess = function () {
                that.set("isLoggedIn", true);
                
                $("#invalid-credentials").toggleClass("hidden", true);
                
                app.application.navigate('views/mainView.html');

                $('#taptrip-div').show();
            };
            
            var loginError = function () {
                that.set("isLoggedIn", false);
                
                $("#invalid-credentials").toggleClass("hidden", false);
                                
                return;
            };
            
            teamPulse.login(username, password, loginSuccess, loginError);
        },

        onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        },

        checkEnter: function (e) {
            var that = this;

            if (e.keyCode == 13) {
                $(e.target).blur();
                that.onLogin();
            }
        }
    });
    
    TaskDetailsViewModel = kendo.data.ObservableObject.extend({
        onDoneClick: function(e) {
            
        },
        onCancelClick: function(e) {
            app.application.navigate('#tabstrip-mainview');
        },      
        description: 'test description',
        title: 'test'
    });
    AddTaskViewModel = kendo.data.ObservableObject.extend({
        onDoneClick: function(e) {
            //teamPulse.createNewItem(this.title, this.description, null, null, null);
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
    
    app.loginService = {
        viewModel: new LoginViewModel(),
        addTask: new AddTaskViewModel(),
        taskDetails: new TaskDetailsViewModel()
    };
})(window);
