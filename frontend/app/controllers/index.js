import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked showLoginForm = false;
  @tracked showModal = false;

  userIsLoggedIn = false;

  constructor() {
    super(...arguments);
    const sessionCookie = document.cookie
      .split(';')[0]
      .replace('__freshblog_session=');

    this.userIsLoggedIn = sessionCookie ? true : false;
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
  closeModal() {
    this.showModal = false;
  }
}
