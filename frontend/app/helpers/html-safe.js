import { htmlSafe } from '@ember/template';
import { helper as buildHelper } from '@ember/component/helper';

export default buildHelper((params) => {
  return new htmlSafe(params.join(''));
});
