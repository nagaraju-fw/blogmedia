import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import EmberObject, { action } from '@ember/object';

export default class PasswordCheckerComponent extends Component {
  @tracked formObj;

  @tracked isPasswordValid = false;
  @tracked isConfirmPasswordValid = false;

  constructor() {
    super(...arguments);
    this.formObj = EmberObject.create(this.#initialValues);
  }

  @action
  setFormStatus(id, validStatus) {
    this.formObj.set(id, {
      value: this.formObj[id].value,
      error: !validStatus ? "Password doesn't meet requriements" : null,
    });

    this.args.onPasswordValidate({
      form: this.formObj,
      error:
        this.formObj.password.value !== this.formObj.confirmPassword.value
          ? 'Password and Confirm Password are not same'
          : '',
    });
  }

  @action
  updatePassword(event) {
    const element = event.target.name;
    this.formObj.set(element, {
      value: event.target.value,
    });
  }

  get #initialValues() {
    return {
      password: { value: '', error: '' },
      confirmPassword: { value: '', error: '' },
    };
  }
}
