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
                    function () { }, "Login failed", 'OK');

                return;
            }
                        
            var loginSuccess = function (){
                that.set("isLoggedIn", true);
                
                $("#invalid-credentials").toggleClass("hidden", true);
                
                app.application.navigate('views/mainView.html');

                $('#taptrip-div').show();
            };
            
            var loginError = function (){
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
    
    AddTaskViewModel = kendo.data.ObservableObject.extend({
        onClick: function(e) {
            alert('asd');    
        },
        description: 'test description',
        title: 'test',
        usersDataSource: new kendo.data.DataSource({
            transport: {
                read: {
                    type: "GET",
                    dataType: "json",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'WRAP access_token=' + teamPulse.accessToken); 
                    },
                    url: teamPulse.baseUrl + '/api/users'
                },
                schema: {
                    total: 'totalResults',
                    data: 'results',
                    model: {
                        id: 'id'
                    }
                }
            }
        })
    });
    
    app.loginService = {
        viewModel: new LoginViewModel(),
        addTask: new AddTaskViewModel()
    };
})(window);
