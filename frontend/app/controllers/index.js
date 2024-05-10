import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service router;

  @tracked showLoginForm = false;
  @tracked showModal = false;

  userIsLoggedIn = false;

  constructor() {
    super(...arguments);
    console.log(this.model);
  }

  @action
  setAction(isLogin) {
    this.showLoginForm = isLogin;
  }

  @action
  openModal() {
    this.showModal = true;
  }

  @action
  loadUser() {
    this.closeModal();
  }

  @action
  closeModal() {
    this.showModal = false;
  }
}
