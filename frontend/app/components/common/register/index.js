import Component from '@glimmer/component';
import { debounce } from '@ember/runloop';
import EmberObject, { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import config from 'ui/config/environment';

export default class CommonLoginComponent extends Component {
  @service store;
  @service('login') loginSvc;

  @tracked registerData;
  @tracked errorMessage;
  @tracked formInvalid = true;

  usersURL = config.APP.BASE_API_URL + config.APP.USERS_API_URL;

  genderOptions = [
    { id: 'M', value: 'Male' },
    { id: 'F', value: 'Female' },
  ];

  get initialValues() {
    return {
      name: { value: '', error: '' },
      username: { value: '', error: '' },
      email: { value: '', error: '' },
      password: { value: '', error: '' },
      dob: { value: '', error: '' },
      gender: { value: '', error: '' },
    };
  }

  constructor() {
    super(...arguments);
    this.registerData = EmberObject.create(this.initialValues);
  }

  @action
  save(event) {
    this.errorMessage = null;
    event.preventDefault();
    this.validateRequiredFields();
    const user = this.store.createRecord('user', {
      name: this.registerData.get('name').value,
      username: this.registerData.get('username').value,
      email: this.registerData.get('email').value,
      password: this.registerData.get('password').value,
      dob: this.registerData.get('dob').value,
      gender: this.registerData.get('gender').value,
    });
    user.save().then((response) => {
      if (response.id) {
        this.#login(response);
      } else {
        this.errorMessage = 'Unable to create the user';
      }
    });
  }

  @action
  checkUsername(event) {
    debounce(this, this.fetchUserName, event.target.value, 500);
  }

  @action
  reset() {
    this.errorMessage = null;
    this.registerData.setProperties(this.initialValues);
  }

  @action
  checkAndSetPassword(obj) {
    this.registerData.set('password', {
      value: obj.form.password.value,
      error: obj.error,
    });
  }

  @action
  validateRequiredFields(id) {
    const setValue = (id) => {
      const value = this.registerData.get(id).value;
      this.registerData.set(id, {
        value: value,
        error: !value ? 'Required Input' : '',
      });
    };
    if (id) {
      setValue(id);
    } else {
      const fieldNames = Object.keys(this.registerData);
      fieldNames.forEach((field) => {
        setValue(field);
      });
    }
    this.setFormValid();
  }

  @action
  updateGender(event) {
    console.log(event);
    const genderValue = event.target.value;
    this.registerData.set('gender', {
      value: genderValue,
      error: !genderValue ? 'Required Input' : '',
    });
    this.setFormValid();
  }

  #onRegisterDone() {
    this.args.onRegisterDone();
  }

  fetchUserName(username) {
    if (username) {
      fetch(this.usersURL + '/checkUserNameExists?username=' + username)
        .then((res) => res.json())
        .then((res) => {
          if (res.exists) {
            this.registerData.set('username', {
              value: username,
              error: res.error,
            });
          } else {
            const usernameObj = this.registerData.get('username');
            usernameObj.error = '';
          }
          this.setFormValid();
        });
    }
  }

  setFormValid() {
    const isValid = Object.keys(this.registerData).every((field) => {
      return this.registerData[field].value;
    });
    this.formInvalid = isValid ? null : true;
  }

  async #login(response) {
    const result = await this.loginSvc
      .login({
        email: response.email,
        password: response.password,
      })
      .then((res) => res.json());
    if (result.user && result.token) {
      document.cookie = '__freshblog_session=' + result.token;
      this.#onRegisterDone();
    } else {
      this.errorMessage = result.error;
    }
  }
}
