import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PostEditController extends Controller {
  @service router;

  @action
  updatePost(payload) {
    console.log(payload);
    this.router.transitionTo('application');
  }
}
