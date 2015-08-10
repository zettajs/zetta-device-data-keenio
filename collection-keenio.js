var util = require('util');
var Rx = require('rx');
var StatsCollector = require('zetta-device-data-collection');
var Keen = require('keen.io');

var KeenCollector = module.exports = function(opts) {
  StatsCollector.call(this);  
  opts = opts || {};
  var keenOpts = {
    projectId: opts.projectId,
    writeKey: opts.writeKey
  };

  this.collection = opts.collection;

  this.client = Keen.configure(keenOpts);

  var windowMs = opts.windowMs || 2000;
  var self = this;
  Rx.Observable.fromEvent(this.emitter, 'event')
    .window(function() { return Rx.Observable.timer(windowMs); })
    .flatMap(function(e) { return e.toArray(); })
    .filter(function(arr) { return arr.length > 0 })
    .map(function(arr) {
      return arr; 
    })
    .subscribe(function(data) {
      var events = {};
      events[self.collection] = data;
      self.client.addEvents(events, function(err, res) {
        if(err) {
          self.server.error('Failed to upload to keen io:' + err);  
        }  
      });

    });


};
util.inherits(KeenCollector, StatsCollector);


