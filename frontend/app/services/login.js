import Service from '@ember/service';
import config from 'ui/config/environment';

export default class LoginService extends Service {
  login(loginData) {
    return fetch(config.APP.BASE_API_URL + config.APP.LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
  }

  validate(token) {
    return fetch(config.APP.BASE_API_URL + '/users/validate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
