# Landhaus-Bruckmann Frontend

An example template for the new frontend design of the company website. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites & Installing

Install the dependencies:

```
type "npm install" in your preferred terminal.
```

To get the development env running enter:

```
gulp dev
```
Starts the development server.
Watch for changes in the index.html file, stylesheets and javascript files. When changes were made, the files in app/temp/* are automatically updated and inserted directly into the browser without reloading the website.


## Running the build process

```
gulp build
```


## Built With

* [gulp 4](https://gulpjs.com/docs/en/getting-started/quick-start) - Toolkit for automated and improved workflows 
* [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Customized frontend Framework
* [jquery](https://api.jquery.com/) - JavaScript library 
* [jquery-smooth-scroll](https://rometools.github.io/rome/) - Allows for easy implementation of smooth scrolling for same-page links
* [lazysizes](https://rometools.github.io/rome/) - High performance lazy loader for images
* [normalize.css](https://github.com/necolas/normalize.css) - A modern alternative to CSS resets
* [picturefill](http://scottjehl.github.io/picturefill/) - A responsive image polyfill.
* [waypoints](http://imakewebthings.com/waypoints/guides/getting-started/) - the easiest way to trigger a function when scrolling to an element.


## Versioning

I use [gulp-rev](https://www.npmjs.com/package/gulp-rev) for versioning.

```
Static asset revisioning by appending content hash to filenames unicorn.css → unicorn-d41d8cd98f.css
``` 

## Authors

* **Elmar Bruckmann** - *Initial work* - [powlsn](https://github.com/powlsn)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
