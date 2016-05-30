import request from 'superagent';

var baseUrl = 'http://52.76.3.40:9003/mynews/service';

var mynewsRequest = {
    post: function (uri, body) {
        if(!body)
            body = {};
        return new Promise(function (resolve, reject) {
            request
                .post(baseUrl + uri)
                .send(body)
                .set('Content-Type', 'application/json')
                .set('Authorization', localStorage.getItem("Authorization"))
                .set('Accept', 'application/json')
                .end(function(err, res){
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        if (res.body.statusCode == 'S1000') {
                            resolve(res.body.content);
                        } else {
                            reject(res.body.statusDescription);
                        }
                    }
                });
        });
    },
    put: function (uri, body) {
        if(!body)
            body = {};
        return new Promise(function (resolve, reject) {
            request
                .put(baseUrl + uri)
                .send(body)
                .set('Content-Type', 'application/json')
                .set('Authorization', localStorage.getItem("Authorization"))
                .set('Accept', 'application/json')
                .end(function(err, res){
                    if (err || !res.ok) {
                        reject(err);
                    } else {
                        if (res.body.statusCode == 'S1000') {
                            resolve(res.body.content);
                        } else {
                            reject(res.body.statusDescription);
                        }
                    }
                });
        });
    },
    get: function (uri, params) {
        return new Promise(function (resolve, reject) {
            request
                .get(baseUrl + uri)
                .set('Accept', 'application/json')
                .set('Authorization',  localStorage.getItem("Authorization"))
                .query(params)
                .end(function(err, res){
                    if (err || !res.ok) {
                        reject(err.message);
                    } else if (res.body.statusCode == 'E0499' ||
                        res.body.statusCode == 'E0498' ||
                        res.body.statusCode == 'E0401'){
                        UserActions.logout();
                    } else {
                        if (res.body.statusCode == 'S1000') {
                            resolve(res.body.content);
                        } else {
                            reject(res.body.statusDescription);
                        }
                    }
                });
        });
    }
};

export default mynewsRequest;
