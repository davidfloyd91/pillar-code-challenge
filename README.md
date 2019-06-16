Hey Michael,

I took a crack at it, here it is!

To start it up, nothing out of the ordinary: clone the repo down, `cd` into the directory and run `yarn start`. It'll come up on `localhost:3000`.

The UI should be straightforward, if clunky. You'll be prompted to allow the app to access your location (this works well on Firefox, but not on Chrome. Could be due to privacy settings or the new-ish rule that geolocation queries have to come from secure origins ... although I thought `localhost` was considered secure ...)

You can change your location (or set it, if you refuse the geolocation permission) using the form at the top. Choose an input method -- zip, city name or latitude and longitude -- enter your location, and press `Search`. (You do actually have to hit `Search`, I'm afraid.)

That should populate three graphs -- temperature, pressure and humidity -- with three-hourly forecasts for the next five days. If I had more time, I'd write a bit of logic to give the graphs vertical axes that make sense. At the moment the values are hard-coded. Also the temeprature is still in Kelvin. I would definitely change that.
