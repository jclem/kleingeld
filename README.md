# Kleingeld

Kleingeld is a simple jQuery plugin (written in CoffeeScript) for tokenizing text inputs.

It contains almost no styling. Given a set of tags entered—alpha, beta, gamma—the input that Kleingeld is applied to will have a value of `alpha,beta,gamma`.

## Example:

Using data attributes:

```html
<input type='text' data-kleingeld>
```

Using jQuery:

```javascript
$('.tags').kleingeld();
```

![example](http://cl.ly/image/1y373v0q031h/output.gif)

## License.

MIT.

## Thanks, Heroku

While I created and maintain this project, it was done while I was an employee
of [Heroku][heroku] on the Human Interfaces Team, and they were kind enough to
allow me to open source the work. Heroku is awesome.

[heroku]: https://www.heroku.com/home
