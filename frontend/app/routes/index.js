import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router;
  @service('auth') auth;

  constructor() {
    super(...arguments);
  }

  beforeModel() {
    let token;
    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      if (cookie.indexOf('__freshblog_session') > -1) {
        token = cookie.replace('__freshblog_session=', '');
      }
    });

    if (token) {
      return this.auth
        .validateToken(token)
        .then((res) => res.json())
        .then((res) => {
          this.auth.set('currentUser', res.user);
          this.router.transitionTo('home', res.user);
        });
    }

    return null;
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }
}
