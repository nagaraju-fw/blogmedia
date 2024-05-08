import Component from '@glimmer/component';
import EmberObject, { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import config from 'ui/config/environment';

export default class CommonLoginComponent extends Component {
  @tracked registerData;
  @tracked errorMessage;

  registerURL = config.APP.BASE_API_URL + config.APP.REGISTER_URL;

  genderOptions = [
    { id: 'M', value: 'Male' },
    { id: 'F', value: 'Female' },
  ];

  constructor() {
    super(...arguments);
    this.registerData = EmberObject.create(this.initialValues);
  }

  @action
  save(event) {
    this.errorMessage = null;
    event.preventDefault();
  }

  @action
  reset() {
    this.errorMessage = null;
    this.registerData.setProperties(this.initialValues);
  }

  @action
  onLoginSuccess() {
    this.args.onRegisterDone();
  }

  get initialValues() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      dob: '',
      gender: '',
    };
  }
}
