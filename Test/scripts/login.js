(function (global) {
    var LoginViewModel,
    app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        isLoggedIn: false,
        username: "test",
        password: "testtest",

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
            $("#users-drawer").data("kendoMobileDrawer").hide();
            //$("#invalid-credentials").toggleClass("hidden", true);
            
            var that = this; 
            that.clearForm();
            that.set("isLoggedIn", false); 
            app.application.navigate('index.html');
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
