(function (global) {
    var LoginViewModel,
        app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "asd",
        password: "asd",

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
                
                app.application.navigate('views/mainView.html');

                $('#taptrip-div').show();
            };
            
            var loginError = function (){
                that.set("isLoggedIn", false);
              
                navigator.notification.alert("Both fields are required!",
                    function () { }, "Login failed", 'OK');
                
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

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);