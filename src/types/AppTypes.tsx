import { IForecastItem, ITemperatureItem } from "../api/WeatherApi";

export namespace AppTypes {
  export interface ILocationItem {
    name: string;
    isFavorite: boolean;
    temperature: ITemperatureItem;
    icon: string;
    code: number;
    isDay: boolean;
    forecast: IForecastItem[]
  }

  export type TemperatureType = "celcius" | "fahrenheit";
}
