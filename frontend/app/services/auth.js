import config from 'ui/config/environment';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AuthService extends Service {
  @tracked currentUser;

  constructor() {
    super(...arguments);
  }

  async login(payload) {
    const result = await fetch(config.APP.BASE_API_URL + config.APP.LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    let status = {};
    if (result.user && result.token) {
      document.cookie = '__freshblog_session=' + result.token;
      this.setUser(result.user);
      status = { user: result.user };
    } else {
      this.setUser(null);
      status = { error: result.error };
    }

    return status;
  }

  logout() {
    this.setUser(null);
    this.#setCookie('');
  }

  validateToken(token) {
    return fetch(config.APP.BASE_API_URL + '/users/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  setUser(user) {
    this.currentUser = user;
  }

  #setCookie() {
    document.cookie =
      '__freshblog_session=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
