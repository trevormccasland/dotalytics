# dotalytics

This repository is the UI for a dota2 analytical website. It uses any given account ID's to query match history and display some charts.

## Developer Setup

### Install

Simply run `npm i`

### dockerfile

A dockerfile is provided for this project and can be built and ran like so:
```bash
docker build -t dotalytics .
docker run -p 8080:8080 dotalytics
```

### dotalytics-api

The API is required to use the UI and can be found at [dotalytics-api](https://github.com/trevormccasland/dotalytics-api)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
