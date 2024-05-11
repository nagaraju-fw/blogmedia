// Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => {
//   return arg1 == arg2 ? options.fn(this) : options.inverse(this);
// });
import { helper as buildHelper } from '@ember/component/helper';

export function ifEquals(params) {
  return params[0] === params[1];
}

export default buildHelper(ifEquals);
