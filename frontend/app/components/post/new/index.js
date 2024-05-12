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
    this.postObject = EmberObject.create(this.initialValues);
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
    const currentUser = this.auth.currentUser;
    this.currentPost = this.store.createRecord('post', {
      title: this.postObject.title.value,
      content: this.postObject.content.value.string,
      published: 0,
      user: this.store.createRecord('user', currentUser),
    });
    this.currentPost.save().then((resp) => {
      if (resp.id) {
        this.args.onCreatePost();
      }
    });
  }

  @action
  publishPost() {
    const currentUser = this.auth.currentUser;
    this.currentPost = this.store.createRecord('post', {
      title: this.postObject.title.value,
      content: this.postObject.content.value.string,
      published: 1,
      user: this.store.createRecord('user', currentUser),
    });
    this.currentPost.save().then((resp) => {
      if (resp.id) {
        this.args.onCreatePost();
      }
    });
  }

  setFormValid() {
    const isValid = ['title', 'content'].every((field) => {
      return this.postObject[field].value && !this.postObject[field].error;
    });
    this.formInvalid = isValid ? null : true;
  }
}
