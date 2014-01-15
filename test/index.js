var redtape = require('redtape'),
    coinpunkTools = require('..');

var it = redtape({
  beforeEach: function (cb) {
    cb();
  },
  afterEach: function (cb) {
    cb();
  }
});

it('should say hello', function(t) {
  t.equal(coinpunkTools(), 'Hello, world');
  t.end();
});
