import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked modalType = null;
  @tracked showModal = false;

  userIsLoggedIn = false;

  @action
  openModal(type) {
    this.showModal = true;
    this.modalType = type;
  }

  @action
  closeModal() {
    this.showModal = false;
    this.modalType = null;
  }
}
