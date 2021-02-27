export default class Section {
  constructor({ items, renderer }, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(sectionSelector);
  }

  addItem(item) {
    this._element.prepend(item);
  }

  renderItems(items = this._items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
