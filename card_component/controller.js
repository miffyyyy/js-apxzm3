import { Model } from './model.js';
import { View } from './view.js';

export const Controller = ((model, view) => {
  const init = async () => {
    view.setController(Controller);
    model.users = await model.getUser(20);
    view.render();
  };

  return {
    init,
  };
})(Model, View);
