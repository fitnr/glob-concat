#!/usr/bin/env node
'use strict'

var glob = require('glob');
var async = require('async');

module.exports = mergeGlob;

function mergeGlob(list, options, callback) {
    if (typeof(options) === 'function') {
        callback = options;
        options = null;
    }

    if (!Array.isArray(list)) list = [list];

    async.map(list, function(item, cb) {
        glob(item, options, cb);
    }, function(err, result) {
        var list = Array.prototype.concat.apply([], result);
        list = list.filter(function(e, pos) { return list.indexOf(e) === pos; });
        callback(err, list);
    });
}

mergeGlob.sync = function(list, options) {
    options = options || {};

    if (!Array.isArray(list)) list = [list];

    list = list.map(function(pat) {
        return glob.sync(pat, options);
    });

    list = Array.prototype.concat.apply([], list);

    return list.filter(function(e, pos) {
        return list.indexOf(e) === pos;
    });
}
