import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import EmberObject, { action } from '@ember/object';

export default class PostNewComponent extends Component {
  @service('auth') auth;
  @service store;

  @tracked editorOptions = {
    height: 400,
    events: {
      contentChanged: function () {
        console.log(this);
      },
    },
  };
  @tracked content = htmlSafe('');
  @tracked formInvalid = true;
  @tracked errorMessage;
  @tracked postObject;

  currentPost;
  currentUser;

  get initialValues() {
    return {
      title: { value: '', error: '' },
      content: { value: htmlSafe(''), error: '' },
      published: { value: false, error: '' },
      user_id: { value: '', error: '' },
    };
  }

  constructor() {
    super(...arguments);

    if (this.args.post) {
      this.postObject = EmberObject.create({
        title: { value: this.args.post.title, error: '' },
        content: { value: htmlSafe(this.args.post.content), error: '' },
        published: { value: this.args.post.published, error: '' },
        user_id: { value: this.args.post.user_id, error: '' },
      });
    } else {
      this.postObject = EmberObject.create(this.initialValues);
    }

    this.setFormValid();
    const user = this.store.findRecord('user', this.auth.currentUser.id);
    this.currentUser =
      user || this.store.createRecord('user', this.auth.currentUser);
  }

  @action
  reset() {
    this.postObject.setProperties(this.initialValues);
  }

  @action
  validateForm(id) {
    const setValue = (id) => {
      const value = this.postObject.get(id).value;
      this.postObject.set(id, {
        value: value,
        error: !value ? 'Required Input' : '',
      });
    };
    if (id) {
      setValue(id);
    } else {
      const fieldNames = ['title', 'content'];
      fieldNames.forEach((field) => {
        setValue(field);
      });
    }
    this.setFormValid();
  }

  @action
  createPost(event) {
    this.errorMessage = null;
    event.preventDefault();
    this.#saveUpdateRecord(0);
  }

  @action
  publishPost(event) {
    this.errorMessage = null;
    event.preventDefault();
    this.#saveUpdateRecord(1);
  }

  setFormValid() {
    const isValid = ['title', 'content'].every((field) => {
      return this.postObject[field].value && !this.postObject[field].error;
    });
    this.formInvalid = isValid ? null : true;
  }

  async #saveUpdateRecord(published) {
    if (this.args.post) {
      this.currentPost = await this.store.findRecord('post', this.args.post.id);

      this.currentPost.set('title', this.postObject.get('title').value);
      this.currentPost.set(
        'content',
        this.postObject.get('content').value.string
      );
      this.currentPost.set('published', published);
      this.currentPost.set('user', this.currentUser);
    } else {
      this.currentPost = await this.store.createRecord('post', {
        title: this.postObject.title.value,
        content: this.postObject.content.value.string,
        published: published,
        user: this.currentUser,
      });
    }

    this.currentPost.save().then((resp) => {
      if (resp.id) {
        this.args.onCreatePost();
      }
    });
  }
}
