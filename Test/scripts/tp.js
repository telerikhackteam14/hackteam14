var TeamPulse = function() {
    this.baseUrl = 'http://istoyanov:9898';
    this.accessToken = null;
    this.projectID = 1;
	this.storyID = 2;
    this.currentUser = null;
    this.status = "Done";
    this.selectedUser = null;
}

TeamPulse.prototype = {
    login: function(username, pass, onSuccess, onError) {
        var that = this;
        $.ajax({    
            url: this.baseUrl + '/Authenticate/WRAPv0.9',
            data: {
                wrap_client_id: 'uri:TeamPulse',
                wrap_username: username,
                wrap_password: pass
            },
            type: "POST",
            success: function (data) {
                var accessToken = data.match(/wrap_access_token=(.*?)&/)[1];
                that.accessToken = decodeURIComponent(accessToken);
                
                that.getCurrentUser(function(data) {
                    that.currentUser = data; 
                    if(typeof onSuccess === 'function') {
            		    onSuccess(data);
        		    }
                });
                
                
            },
            error: function (a, b, c) {
                if(typeof onError === 'function') {
            		onError(a, b, c);
        		}
            }
        });
    },
        
    getAllUsers: function(onSuccess, onError) {
        var that = this;
        $.ajax({
            url: this.baseUrl + '/api/users',
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); 
            },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    },
        
    getCurrentUser: function(onSuccess, onError) {
        var that = this;
        $.ajax({
            url: this.baseUrl + '/api/users/me',
            type: "GET",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); 
            },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    },
    
    getUserById: function(userId, onSuccess, onError) {
        var that = this;
        $.ajax({
            url: this.baseUrl + '/api/users/' + userId,
            type: "GET",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); 
            },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    },
        
    getItemById: function(id, onSuccess, onError) {
        var that = this;
        $.ajax({
            url: this.baseUrl + '/api/workitems/'+ id,
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    },

    getTasksForUser: function(userID, status, onSuccess, onError) {
        var that = this;
        var oDataFilter = "?$filter=AssignedToID eq " + userID;
        if(status) {
        	oDataFilter += " and Status eq '" + status + "'";
        }
    
        $.ajax({
            url: this.baseUrl + '/api/workitems' + oDataFilter,
            data: null,
            type: "GET",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); 
            },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    },
        
    createNewItem: function(name, description, AssignDate, onSuccess, onError) {
        var fields = {
            'Name': name,
            'Description': description,
            'ParentID': this.storyID,
            'tp_Assigndate_cf': AssignDate
        };
        var that = this;
        $.ajax({
            url: this.baseUrl + '/api/workitems',
            data: JSON.stringify({
                type: 'Task',
                projectId: this.projectID,
                fields: fields
            }),
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); 
            },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    },

    updateItem: function(taskId, status, onSuccess, onError) {
        var that = this;
        $.ajax({
            url: this.baseUrl + '/api/workitems/' + taskId,
            data: JSON.stringify({
                'Status': status
            }),
            contentType: 'application/json; charset=utf-8',
            type: "PUT",
            beforeSend: function (xhr) { 
                xhr.setRequestHeader('Authorization', 'WRAP access_token=' + that.accessToken); 
            },
            success: function (data) {
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (err) {
                if(typeof onError === 'function') {
            		onError(err);
        		}
            }
        });
    }
}

var teamPulse = new TeamPulse();
//teamPulse.login("test", "testtest", function() {
        //teamPulse.getCurrentUser(function(data) {
        //    teamPulse.currentUser = data; 
        //    teamPulse.getAllUsers(function(data) {
        //        var dataSource = [];
        //        var users = data.results;
        //        for(var i = 0; i < users.length; i++) {
        //            dataSource.push({"DisplayName": users[i].displayname});
        //            if(teamPulse.currentUser.id == users[i].id) {
        //                $('#usersDropDownList').append(new Option(data.results[i].displayName, data.results[i].id, false, true));    
        //            } else {
        //                $('#usersDropDownList').append(new Option(data.results[i].displayName, data.results[i].id, false, false));    
        //            }
                    
        //        }
        //    });
        //});
        
//});

