# About

This application provides a RESTful API for simple time conversion between Unix timestamps and natural language.

Full list of requirements can be found at [respective Free Code Camp page](https://www.freecodecamp.com/challenges/timestamp-microservice).

# Usage

- The API endpoint is the site name itself (e.g. `https://freetimestamp.herokuapp.com`)
- The API accepts a string with Unix timestamp or date in English (in a GET request):
    - `https://freetimestamp.herokuapp.com/1450137600`
    - `https://freetimestamp.herokuapp.com/January%201,%202016`
- In any case, its response contains both Unix timestamp and date in English. If request is wrong, both fields are set to `null`.
```
{
  unix: 1643673600,
  natural: "February 1, 2022"
}
```