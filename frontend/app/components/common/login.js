import Component from '@glimmer/component';
import EmberObject, { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'ui/config/environment';

export default class CommonLoginComponent extends Component {
  @tracked loginData;
  @tracked errorMessage;

  loginURL = config.APP.BASE_API_URL + config.APP.LOGIN_URL;

  constructor() {
    super(...arguments);
    this.loginData = EmberObject.create({
      email: '',
      password: '',
    });
  }

  @action
  save(event) {
    this.errorMessage = null;
    event.preventDefault();
    this.#login();
  }

  @action
  reset() {
    this.errorMessage = null;
    this.loginData.setProperties({
      email: '',
      password: '',
    });
  }

  @action
  onLoginSuccess() {
    this.args.onLoginSuccess();
  }

  async #login() {
    const result = await fetch(this.loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.loginData),
    }).then((res) => res.json());
    if (result.user && result.token) {
      document.cookie = '__freshblog_session=' + result.token;
      this.onLoginSuccess();
    } else {
      this.errorMessage = result.error;
    }
  }
}