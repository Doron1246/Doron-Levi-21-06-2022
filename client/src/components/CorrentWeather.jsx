import React from "react";

export default function CorrentWeather({ weather, location, favorites }) {
  // console.log({ location });
  // console.log({ favorites });

  return (
    <div>
      {`${location.LocalizedName}`}
      {<br />}
      {`${weather.cityWeather[0].Temperature.Metric.Value}C`}
      {<br />}
      {`${weather.cityWeather[0].WeatherText}`}
    </div>
  );
}
