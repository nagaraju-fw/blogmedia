import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
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
          this.auth.setUser(res.user);
        });
    } else {
      this.auth.setUser(null);
      this.router.transitionTo('application');
    }
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }

  @action
  refreshHome() {
    this.refresh();
  }
}
