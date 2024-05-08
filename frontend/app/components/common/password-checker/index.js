import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class PasswordCheckerComponent extends Component {
  @tracked password;
  @tracked confirmPassword;

  @tracked isPasswordValid = false;
  @tracked isConfirmPasswordValid = false;

  @action
  setFormStatus(id, validStatus) {
    if (id === 'password') {
      this.isPasswordValid = validStatus;
    } else {
      this.isConfirmPasswordValid = validStatus;
    }
  }
}
