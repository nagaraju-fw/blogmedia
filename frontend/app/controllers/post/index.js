import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class PostViewController extends Controller {
  @service router;
  @service('auth') auth;

  @action
  publishPost(post) {
    post.published = 1;
    post.save();
  }

  @action
  editPost(post) {
    this.router.transitionTo('post.edit', post);
  }

  @action
  deletePost(post) {
    post.deleteRecord();
    post.save().then((res) => {
      if (res.isDeleted) this.router.transitionTo('application');
    });
  }
}
