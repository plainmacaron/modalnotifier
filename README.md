# modalnotifier

## About

### Author

Ryan E. Anderson

---

### Description

This customizable jQuery plug-in allows a web developer to specify a target that will trigger a specified event in order to display a modal dialog window.

  - Use different events to display a modal dialog window.
  - Create custom callback functions that can be used to handle ajax responses that occur when the event that is attached to the target element is triggered.
  - Choose between six display styles.

Modalnotifier can be downloaded from the [plainmacaron site] and [GitHub].

---

### Version

1.0.1

---

### License

GPL-2.0

## Demo

Try the [demos] on the "Controls" page of the Plain Macaron website.

Add a simple modal notifier plug-in to your project:

![screenshot 1](https://raw.githubusercontent.com/plainmacaron/modalnotifier/master/screenshots/screenshot-1.png)

Try different display styles:

![screenshot 2](https://raw.githubusercontent.com/plainmacaron/modalnotifier/master/screenshots/screenshot-2.png)

![screenshot 3](https://raw.githubusercontent.com/plainmacaron/modalnotifier/master/screenshots/screenshot-3.png)

## Installation

Install modalnotifier with npm:

```sh
$ npm i modalnotifier
```

Alternatively, you can add the JavaScript file to your project with a script tag:

```html
<script type="text/javascript" src="./js/plainmacaron/jquery.plainmacaron.modalnotifier.js"></script>
```

## Using modalnotifier

Use this plug-in in your projects. The following example demonstrates how to initialize this plug-in:

```html
    <script type="text/javascript">
        $(function() {
            $("#notifier-mask").modalnotifier({
                displayStyle: 5,
                action: "php/track_event.php",
                imagePath: "png/Close-Icon.png",
                targetEvent: "mouseover",
                targetIdentifier: "notifier"
            });
        });
    </script>
```

The following example demonstrates how to initialize this plug-in without using a selector (A default element will be used.):

```html
    <script type="text/javascript">
        $(function() {
            var modalNotifier = $.plainmacaron.modalnotifier({
                displayStyle: 5,
                action: "php/track_event.php",
                imagePath: "png/Close-Icon.png",
                targetEvent: "mouseover",
                targetIdentifier: "notifier"
            });
        });
    </script>
```

[plainmacaron site]: <http://plainmacaron.com/> "Plain Macaron website"
[GitHub]: <https://github.com/plainmacaron/modalnotifier> "GitHub Repository"
[Demos]: <http://plainmacaron.com/Controls/> "Demos Page"