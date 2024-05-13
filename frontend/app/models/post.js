import Model, { attr, belongsTo } from '@ember-data/model';

export default class PostModel extends Model {
  @attr('string') title;
  @attr('string') content;
  @attr('number') published;

  @attr('date') created_at;
  @attr('date') updated_at;

  @belongsTo('user') user;
}
