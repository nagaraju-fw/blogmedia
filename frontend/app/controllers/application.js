import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service router;
  @service('auth') auth;

  @tracked formType = 'login';
  @tracked showModal = false;
  @tracked title = 'Join FreshBlogs';

  userIsLoggedIn = false;

  constructor() {
    super(...arguments);
  }

  @action
  setAction(type) {
    this.formType = type;
    this.title = 'Join FreshBlogs';
  }

  @action
  openModal() {
    this.showModal = true;
  }

  @action
  openProfileModal() {
    this.showModal = true;
    this.formType = 'profile';
    this.title = 'Update details';
  }

  @action
  loadUser() {
    this.closeModal();
  }

  @action
  closeModal() {
    this.showModal = false;
  }

  @action
  afterLogout() {
    this.auth.logout();
    this.send('userLoggedOut');
  }

  @action
  profileUpdate(user) {
    console.log(user);
  }
}
