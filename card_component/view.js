import { Model } from './model.js';

export const View = ((model) => {
  let _controller;

  const grid = document.getElementById('grid');
  const getController = () => _controller.deref();
  const setController = (new_controller) => {
    _controller = new WeakRef(new_controller);
  }; // use weak reference here to prevent memmory leak

  const toggleDOB = (a) => {
    for (let c of a.children) c.classList.toggle('hiddenitem');
  };

  const clear = () => {
    grid.innerHTML = '';
  };

  const render = () => {
    clear();
    // console.log('xxx', model.users);
    let cards_dom = model.users.map((user) => genCard(user));
    cards_dom.forEach((c) => grid.appendChild(c));
    const reload_btn = genReloadBtn();
    grid.appendChild(reload_btn);
  };

  const genCard = (user) => {
    const cardContainer = document.createElement('div');
    const image = document.createElement('img');
    const contentWrapper = document.createElement('div');
    const name = document.createElement('p');
    const email = document.createElement('p');
    const phone = document.createElement('p');
    const dobWrapper = document.createElement('div');
    const dobButton = document.createElement('button');
    const dobDisplay = document.createElement('p');

    cardContainer.classList.add('card');
    contentWrapper.classList.add('content');
    image.src = user.picture.large;
    name.textContent = `name: ${user.name.title} ${user.name.first}`;
    email.textContent = `email: ${user.email}`;
    phone.textContent = `phone: ${user.phone}`;
    dobButton.textContent = 'Show DOB';
    dobDisplay.textContent = user.dob.date;
    dobDisplay.classList.add('hiddenitem');
    dobWrapper.onclick = (e) => toggleDOB(dobWrapper);
    dobWrapper.append(dobButton, dobDisplay);
    contentWrapper.append(name, email, phone, dobWrapper);
    cardContainer.append(image, contentWrapper);

    return cardContainer;
  };

  const genReloadBtn = () => {
    let btn = document.createElement('button');
    btn.id = 'reload_btn';
    btn.innerHTML = 'Reload';
    btn.onclick = () => {
      grid.innerHTML = 'Reloading...';
      getController().init();
    };
    return btn;
  };

  return {
    setController,
    render,
  };
})(Model);
