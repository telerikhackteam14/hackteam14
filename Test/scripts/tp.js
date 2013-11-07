var TeamPulse = function() {
    this.baseUrl = 'http://istoyanov:9898';
    this.accessToken = null;
    this.projectID = 1;
	this.storyID = 2;
}

TeamPulse.prototype = {
    login: function(username, pass, onSuccess, onError) {
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
                
                this.accessToken = decodeURIComponent(accessToken);
                
                if(typeof onSuccess === 'function') {
            		onSuccess(data);
        		}
            },
            error: function (a, b, c) {
                if(typeof onError === 'function') {
            		onError(a, b, c);
        		}
            }
        });
    },
        
    getAllUsers: function(onSuccess, onError) {
        $.ajax({
            url: this.baseUrl + '/api/users',
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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
        $.ajax({
            url: this.baseUrl + '/api/users/me',
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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
        $.ajax({
            url: this.baseUrl + '/api/users/' + userId,
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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
        $.ajax({
            url: this.baseUrl + '/api/workitems/'+ id,
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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
        var oDataFilter = "$filter=AssignedToID eq " + userID;
        if(status) {
        	oDataFilter += " and Status eq '" + status + "'";
        }
    
        $.ajax({
            url: this.baseUrl + '/api/workitems' + oDataFilter,
            data: null,
            type: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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
    
        $.ajax({
            url: this.baseUrl + '/api/workitems',
            data: JSON.stringify({
                type: 'Task',
                projectId: this.projectID,
                fields: fields
            }),
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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
        $.ajax({
            url: this.baseUrl + '/api/workitems/' + taskId,
            data: JSON.stringify({
                'Status': status
            }),
            contentType: 'application/json; charset=utf-8',
            type: "PUT",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'WRAP access_token=' + this.accessToken); },
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



