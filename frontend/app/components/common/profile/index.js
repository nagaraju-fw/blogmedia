import Component from '@glimmer/component';
import EmberObject, { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import config from 'ui/config/environment';

export default class CommonProfileComponent extends Component {
  @service store;
  @service('auth') auth;

  @tracked profileData;
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
      dob: { value: '', error: '' },
      gender: { value: '', error: '' },
    };
  }

  constructor() {
    super(...arguments);
    if (this.auth.currentUser) {
      this.initialValues.name.value = this.auth.currentUser.name;
      this.initialValues.dob.value = this.auth.currentUser.dob;
      this.initialValues.gender.value = this.auth.currentUser.gender;
    }
    this.profileData = EmberObject.create(this.initialValues);
  }

  @action
  save(event) {
    this.errorMessage = null;
    event.preventDefault();
    this.validateRequiredFields();

    this.#updateRecord();
  }

  @action
  reset() {
    this.errorMessage = null;
    this.profileData.setProperties(this.initialValues);
  }

  @action
  validateRequiredFields(id) {
    const setValue = (id) => {
      const value = this.profileData.get(id).value;
      this.profileData.set(id, {
        value: value,
        error: !value ? 'Required Input' : '',
      });
    };
    if (id) {
      setValue(id);
    } else {
      const fieldNames = Object.keys(this.profileData);
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
    this.profileData.set('gender', {
      value: genderValue,
      error: !genderValue ? 'Required Input' : '',
    });
    this.setFormValid();
  }

  setFormValid() {
    const isValid = Object.keys(this.profileData).every((field) => {
      return this.profileData[field].value && !this.profileData[field].error;
    });
    this.formInvalid = isValid ? null : true;
  }

  #formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  #onProfileUpdate(user) {
    this.args.onProfileUpdate(user);
  }

  async #updateRecord() {
    const user = await this.store.findRecord('user', this.auth.currentUser.id);

    user.set('name', this.profileData.get('name').value);
    user.set('dob', this.#formatDate(this.profileData.get('dob').value));
    user.set('gender', this.profileData.get('gender').value);

    user.save().then((response) => {
      if (response.id) {
        this.#onProfileUpdate(user);
      } else {
        this.errorMessage = 'Unable to create the user';
      }
    });
  }
}
