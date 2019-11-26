# Geocoding API and Maps JavaScript API with Axios

Add your API_KEY into index.html and replace geoKey value with your API_KEY into src/main.js

### Init Dev

You can create a fast npm init generate it without having it ask any questions:

        $ npm init -y

## Dependencies

- @babel/polyfill
- axios

### Install Dependencies

        $ npm i @babel/polyfill axios

## devDependencies

- @babel/cli
- @babel/core
- @babel/preset-env

### Install devDependencies

        $ npm i @babel/cli @babel/core @babel/preset-env -D

Remember create **.babelrc** an add the following code if you want re edit the main.js final file

        { "presets": ["@babel/preset-env"] }

## Scripts

        "scripts": {
          "build": "babel src -d build -w"
        }
