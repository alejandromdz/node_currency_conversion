"use strict";
var path = require("path");
var Route;
(function (Route) {
    var Index = (function () {
        function Index() {
        }
        Index.prototype.get = function (req, res, next) {
            res.sendFile(path.join(__dirname + '/../../../public/index.html'));
        };
        return Index;
    }());
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
