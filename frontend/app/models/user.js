import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') name;
  @attr('string') username;
  @attr('string') email;
  @attr('date') dob;
  @attr('string') gender;
  @attr('string') password;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  @hasMany('post') post;
}
