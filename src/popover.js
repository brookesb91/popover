const getViewportOffset = (el) => {
  var box = el.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left)
  };
};

class Popover {
  /**
   * @param {HTMLElement} where Target element to position the popover.
   * @param {HTMLElement} what HTML Content to show in the popover.
   */
  constructor(where, what) {
    this.where = where;
    this.what = what;
    this.popover = null;
    this._registerListeners();
  }

  show() {
    if (!this.popover) {
      this.popover = this._createPopover();
    }

    this.popover.style.visibility = 'visible';
  }

  hide() {
    if (this.popover) {
      this.popover.remove();
      this.popover = null;
    }
  }

  _createPopover() {
    const popover = this.what.cloneNode(true);
    const position = getViewportOffset(this.where);
    // Show below the target element
    position.top += this.where.offsetHeight;

    popover.classList.add('popover');
    popover.style.position = 'absolute';
    popover.style.top = `${position.top}px`;
    // Hidden so that it can be appended to the document
    // and have its offset width calculated.
    popover.style.visibility = 'hidden';
    document.body.appendChild(popover);
    // Left needs to be amended if the element is too wide to stay on the screen
    // left + el.width > vw ? {reduce left by the difference (diff = (left + width) - vw)}
    const x = position.left + popover.offsetWidth;
    const vw = document.body.offsetWidth;

    if (x > vw) {
      const diff = x - vw;
      position.left -= diff;
    }

    popover.style.left = `${position.left}px`;

    return popover;
  }

  _registerListeners() {
    this.where.addEventListener('mouseenter', () => this.show());
    this.where.addEventListener('mouseleave', () => this.hide());
  }
}