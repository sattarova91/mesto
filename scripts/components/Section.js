export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(sectionSelector);
  }

  addItem(item) {
    this._element.prepend(item);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
