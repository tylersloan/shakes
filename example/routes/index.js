var https = require('https');
var qs = require('querystring');
var Shakes = require('../../lib/shakes');
var nconf = require('nconf');

nconf.argv().env().file({ file: 'settings.json'});
var shakesOpts = {
  'client_id': nconf.get('client_id'),
  'client_secret': nconf.get('client_secret')
};

exports.index = function(req, res){
  var t,
      hasToken = false;
      console.log(nconf.get('client_secret'));

  if(req.cookies.m_token) {
    t = req.cookies.m_token;
    hasToken = true;
  }

  var moves = new Shakes(shakesOpts);
  var auth_url = moves.authorize({'scope':'activity location'});

  res.render('index', { title: 'Shakes Example', auth_url: auth_url, token: t, has_token:hasToken });
};
