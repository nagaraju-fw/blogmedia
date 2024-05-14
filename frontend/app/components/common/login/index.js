import Component from '@glimmer/component';
import EmberObject, { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'ui/config/environment';
import { inject as service } from '@ember/service';

export default class CommonLoginComponent extends Component {
  @tracked loginData;
  @tracked errorMessage;
  @tracked formInvalid = true;

  @service('auth') auth;

  loginURL = config.APP.BASE_API_URL + config.APP.LOGIN_URL;

  get initialValues() {
    return {
      email: { value: '', error: '' },
      password: { value: '', error: '' },
    };
  }

  constructor() {
    super(...arguments);
    this.loginData = EmberObject.create(this.initialValues);
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
    this.loginData.setProperties(this.initialValues);
  }

  @action
  validateRequiredFields(id) {
    const setValue = (id) => {
      const value = this.loginData.get(id).value;

      let errorMsg = '';
      if (!value) {
        errorMsg = 'Required Input';
      }
      if (id === 'email' && !this.#validateEmail(value)) {
        errorMsg = 'Invalid Email';
      }

      this.loginData.set(id, {
        value: value,
        error: errorMsg,
      });
    };
    if (id) {
      setValue(id);
    } else {
      const fieldNames = Object.keys(this.loginData);
      fieldNames.forEach((field) => {
        setValue(field);
      });
    }
    this.setFormValid();
  }

  onLoginSuccess(user) {
    this.args.onLoginSuccess(user);
  }

  setFormValid() {
    const isValid = Object.keys(this.loginData).every((field) => {
      return this.loginData[field].value && !this.loginData[field].error;
    });
    this.formInvalid = isValid ? null : true;
  }

  async #login() {
    const result = await this.auth.login({
      email: this.loginData.get('email').value,
      password: this.loginData.get('password').value,
    });

    if (this.auth.currentUser) {
      this.onLoginSuccess(this.auth.currentUser);
    } else {
      this.errorMessage = result.error || null;
    }
  }

  #validateEmail(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
}
