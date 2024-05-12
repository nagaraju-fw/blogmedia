import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PostCreateController extends Controller {
  @service router;

  @action
  createPost(payload) {
    console.log(payload);
  }
}
