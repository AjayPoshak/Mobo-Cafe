var sessionKeeper = angular.module("moboSessionKeeper", []);
sessionKeeper.constant("namespace", "moboSession");
sessionKeeper.constant("sessionObject", "current");
/*
 * @param $rootScope :- Every application has a single root scope. All other scopes are descendant scopes of the root scope. Scopes provide separation between the model and the view, via a mechanism for watching the model for changes.
 * @param namespace :- Create "safeSession" & store the values in Session Storage.
 * @param $log :- Writes the message into the browser's console. It simplify debugging and troubleshooting code.
 */
sessionKeeper.session = function ($rootScope, namespace, sessionObject, $log) {
    this.namespace = namespace;
    this.obj = sessionObject;
    this.scope = $rootScope;
    this.log = $log;
}


sessionKeeper.service("SessionKeeper", ['$rootScope', 'namespace', 'sessionObject', '$log', sessionKeeper.session]);

sessionKeeper.session.prototype.read = function () {
    var scope = this.scope;
    if (scope[this.obj]) return scope[this.obj];
    if (sessionStorage && sessionStorage.getItem(this.namespace)) {
        var val = sessionStorage.getItem(this.namespace);
        if (val && val != 'undefined') {
            var session = JSON.parse(val);
            if (scope)
                return (scope[this.obj] = session);
            else
                return session;
        }
    }
    return null;
}
/*
 * @function save :- It create the Session & stores the value in Session Storage.
 */
sessionKeeper.session.prototype.save = function (scope) {
    var scope = scope || this.scope;

    if (sessionStorage) {
        try {
            var txt = JSON.stringify(scope[this.obj]);
            sessionStorage.setItem(this.namespace, txt)
        } catch (e) {
            this.log.error(e);
        }
    } else this.log.error("Session did not save.");
}
/*
 * @function clear :- It expires the Session & remove the values from Session Storage.
 */
sessionKeeper.session.prototype.clear = function () {
    if (sessionStorage) {
        try {
            sessionStorage.removeItem(this.namespace);
        } catch (e) {
        }
    }
}


var sessionModule = angular.module("att.core.session", ["att.core.session.keeper"]);