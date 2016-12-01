Oakland, CA crime data
======

A repository for making visualizations of Oakland's crime and police data.

Available to everyone. Target audience is journalists and citizens interested in government and our local crime fighting apparatus

### T0do

- production database
- crimes by beat sortage

### Documentation

Full [documentation here](http://oakland-crime.herokuapp.com/#/documentation)

### Contributing

```
$ npm install && bower install
$ mongod
$ node server
```
Open a web browser to `localhost:8080`

### Deploy to Heroku

Heroku is a service for deploying web apps to the internet. Salesforce owns it.

```
$ heroku login
$ heroku create myAppName
```

You also need to set up [MongoLab](https://devcenter.heroku.com/articles/mongolab) because the application requires a database. To do this add the Mongolab add-on to your created app.

Once added, get the MONGODB_URI:

```
$ heroku config | grep MONGODB_URI
$ heroku config:set NODE_ENV=production
```

Copy and paste that into `production.database` in **server/config/environments.js** file.

To deploy, add and commit your changes with git and then run `$ git push heroku master`.



### Resources

`data/OPD_140722_1.csv` is in .gitignore cause it exceeds github's 100mb file limit. You can download the file [here](http://data.openoakland.org/dataset/crime-reports/resource/d146d06d-57c3-4680-a320-5d7dec31bfd8)

City of Oakland [crime database](http://gismaps.oaklandnet.com/crimewatch/) (maintained by third-party crimemapping.com)

Data Visualization Challenge: [Using Data to Improve Justice](http://nij.gov/funding/Pages/fy14-data-visualization-challenge.aspx?utm_source=twitter&utm_medium=social-media&utm_campaign=dataviz-challenge)

Foul play with Chicago's crime [statistics article](http://www.chicagomag.com/Chicago-Magazine/May-2014/Chicago-crime-rates/)

n + 1 Raise the Crime Rate ([article](https://nplusonemag.com/issue-13/politics/raise-the-crime-rate/))

Chicago crime mapping ([app](http://crimearound.us/))

Chicago crime [graphs and visualizations](http://heyjackass.com/)

interactive analysis of crime in Chicago's 50 wards [Crime in chicago](http://www.crimeinchicago.org/)

### Dev Resources

#### Angular.js

[angular-slider](http://venturocket.github.io/angular-slider/)

[angular-tags](http://mbenford.github.io/ngTagsInput/)

