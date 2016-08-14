/* eslint-disable */
var fs = require('fs'),
    ReactTools = require('react-tools'),
    origJs = require.extensions['.jsx'];

require.extensions['.jsx'] = function(module, filename) {
  // optimization: external code never needs compilation.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.jsx'])(module, filename);
  }
  var content = fs.readFileSync(filename, 'utf8');
  var compiled = ReactTools.transform(content, {harmony: true});
  return module._compile(compiled, filename);
};

function noop() {
  return null;
}

require.extensions['.styl'] = noop;
// you can add whatever you wanna handle
require.extensions['.scss'] = noop;
require.extensions['.sass'] = noop;
require.extensions['.css'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.png'] = noop;
