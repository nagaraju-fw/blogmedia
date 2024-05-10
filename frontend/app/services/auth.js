import config from 'ui/config/environment';
import Service from '@ember/service';

export default class AuthService extends Service {
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
      this.#setUser(result.user);
      status = { user: result.user };
    } else {
      this.#setUser(null);
      status = { error: result.error };
    }

    return status;
  }

  logout() {
    this.#setUser(null);
  }

  validateToken(token) {
    return fetch(config.APP.BASE_API_URL + '/users/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  #setUser(user) {
    this.currentUser = user;
  }

  #setCookie(token) {
    document.cookie = '__freshblog_session=' + token;
  }
}
