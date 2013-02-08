# Kleingeld

Kleingeld is a simple jQuery plugin (written in CoffeeScript) for tokenizing text inputs.

It contains almost no styling by default. Given a set of tags entered—alpha, beta, gamma—the input that Kleingeld is applied to will have a value of `alpha,beta,gamma`.

## Example:

Using data attributes:

```html
<input type='text' data-kleingeld>
```

Using jQuery:

```javascript
$('.tags').kleingeld();
```

![example](http://cl.ly/image/2J0w1K2u0U32/output.gif)

## License.

MIT.
