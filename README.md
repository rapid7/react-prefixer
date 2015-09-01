# react-prefixer

react-prefixer is a tiny package designed to provide vender-specific prefixes to the style objects you use in your React project. It's usage is pretty straightforward:

```
var prefix = require("react-prefixer"),
    styles = prefix({
      userSelect:"none"
    });
    
console.log(styles); // {WebkitUserSelect:"none"}
```

It also works on deeply-nested objects:

```
var prefix = require("react-prefixer"),
    styles = prefix({
      some:{
        really:{
          deep:{
            style:{
              userSelect:"none"
            }
          }
        }
      }
    });
    
console.log(styles); // {some:{really:{deep:{style:{WebkitUserSelect:"none"}}}}}
```

And will appropriately modify your values for legacy syntaxes on transition:

```
var prefix = require("react-prefixer"),
    styles = prefix({
      transition:"transform 200ms"
    });
    
console.log(styles); // {WebkitTransition:"-webkit-transform 200ms"}, if on Safari for example
```

It will also do the tweener or most recent vendor syntax for flexbox:

```
var prefix = require("react-prefixer"),
    styles = prefix({
      display:"flex"
    });
    
console.log(styles); 
// {display:"-webkit-flex"}, if on Safari
// {display:"-ms-flexbox"}, if on IE10
```

Browser support:
* IE10+ and Edge
* Firefox
* Chrome
* Safari
* Opera

Happy prefixing!
