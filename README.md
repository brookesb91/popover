# popover

Create hover popups from HTML elements.

## Include the library

```html
<script src="/path/to/popover.js" type="text/javascript"></script>
```

## Define a popover target

Add an element that will act as the popover target. The popover is positioned relative to this.

```html
<div id="target-1">Hover me</div>
```

## Define the popover contents

Add your popover contents to the document.

> By default, the original popover contents do not have their visibility modified even when the popover is not visible. It is advised to use css to hide any content that is not to be seen until it has been rendered in a popover. This is shown in the example below.

```html
<div id="contents" style="display: none;">
  <div id="content-1">
    This content will be shown in a popover
  </div>
</div>
```

## Create the popover

Create a new instance of `Popover` with the target and contents elements as arguments.

```js
const target = document.querySelector('#target-1');
const contents = document.querySelector('#content-1');

const popover = new Popover(target, contents);
```
