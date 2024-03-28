import { createContext } from 'react';
import { AppTypes } from './types/AppTypes';

export const TemperatureContext = createContext<AppTypes.TemperatureType>("celcius");

