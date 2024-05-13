import EmberRouter from '@ember/routing/router';
import config from 'ui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });

  this.route('post', { path: 'post/:post_id' }, function () {
    this.route('edit');
  });

  this.route('posts', function () {
    this.route('create');
  });
});
