import { weatherConditions } from "../data/WeatherConditions";

export interface IWeatherItem {
  temperature: ITemperatureItem;
  code: number;
  isDay: boolean;
  forecast: IForecastItem[];
}

export interface ITemperatureItem {
  c: number;
  f: number;
}

export interface IForecastItem {
  date: string;
  temperature: ITemperatureItem;
}

export namespace WeatherAPI {
  export const fetchWeatherByLocation = async (
    location: string
  ): Promise<IWeatherItem> => {
    const API_KEY = "a152c58412e84fb2953215350242603";

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5&lang=en`
    );
    const res = await response.json();

    const forecast: IForecastItem[] = res.forecast.forecastday.map(
      (e: { date: any; day: { avgtemp_c: any; avgtemp_f: any } }) => ({
        date: e.date,
        temperature: { c: e.day.avgtemp_c, f: e.day.avgtemp_f },
      })
    );

    console.log(forecast);
    return {
      isDay: Boolean(res.current.is_day),
      temperature: {
        c: res.current.temp_c,
        f: res.current.temp_f,
      },
      code: res.current.condition.code,
      forecast: forecast,
    };
  };

  export const getWeatherConditionByCode = (code: number) => {
    return weatherConditions.filter((condition) => condition.code === code)[0];
  };

  export const getIconUrlById = (code: number, isDay = true) => {
    const condition = getWeatherConditionByCode(code);
    return `https://cdn.weatherapi.com/weather/128x128/${
      isDay ? "day" : "night"
    }/${condition.icon}.png`;
  };

  export const formatDate = (date: string) => {
    const daysOfTheWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const dayOfWeek = daysOfTheWeek[new Date(date).getDay()];

    return `${dayOfWeek}`;
  };
}
