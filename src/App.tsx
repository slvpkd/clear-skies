import { useEffect, useState } from "react";
import "./App.css";
import { Box, CssBaseline, CssVarsProvider, Grid, Stack } from "@mui/joy";
import { TemperatureContext } from "./Context";
import { WeatherAPI } from "./api/WeatherApi";
import Header from "./components/Header";
import Location from "./components/Location";
import LocationSearch from "./components/LocationSearch";
import { AppTypes } from "./types/AppTypes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const [locations, setLocations] = useState<AppTypes.ILocationItem[]>([]);

  const [temperatureType, setTemperatureType] =
    useState<AppTypes.TemperatureType>("celcius");

  useEffect(() => {
    if (locations) localStorage.setItem("Locations", JSON.stringify(locations));
  }, [locations]);

  const filteredLocations = [
    ...locations.filter((location) => location.isFavorite),
    ...locations.filter((location) => !location.isFavorite),
  ];

  const handleAddLocation = async (name: string) => {
    const hasLocation = locations.filter(
      (location) => location.name === name
    )[0];

    if (hasLocation) alert("Location already exists");

    if (!hasLocation) {
      const newLocation: AppTypes.ILocationItem = {
        name: name,
        isFavorite: false,
        temperature: { c: 0, f: 0 },
        icon: "",
        code: 0,
        isDay: true,
        forecast: [],
      };

      const weather = await WeatherAPI.fetchWeatherByLocation(name);

      newLocation.temperature.c = weather.temperature.c;
      newLocation.temperature.f = weather.temperature.f;
      newLocation.icon = WeatherAPI.getIconUrlById(weather.code, weather.isDay);
      newLocation.code = weather.code;
      newLocation.isDay = weather.isDay;
      newLocation.forecast = weather.forecast;

      setLocations([...locations, newLocation]);
    }
  };

  const handleEditLocation = async (name: string,) => {

    console.log(name)
    const weather = await WeatherAPI.fetchWeatherByLocation(name);

    const location = locations.map((loc) => {
      if (loc.name === name) {

        loc.temperature.c = weather.temperature.c;
        loc.temperature.f = weather.temperature.f;
        loc.icon = WeatherAPI.getIconUrlById(weather.code, weather.isDay);
        loc.code = weather.code;
        loc.isDay = weather.isDay;
        loc.forecast = weather.forecast;

        return loc;
      } else {
        return loc;
      }
    });

    setLocations(location);
  };

  const handleToggleFavorite = (name: string) => {
    const location = locations.map((location) => {
      if (location.name === name) location.isFavorite = !location.isFavorite;

      return location;
    });

    setLocations(location);
  };

  const handleRemoveLocation = (name: string) => {
    setLocations(locations.filter((location) => location.name !== name));
  };

  return (
    <HelmetProvider>
      <TemperatureContext.Provider value={temperatureType}>
        <CssVarsProvider disableTransitionOnChange>
          <CssBaseline />

          <Header setTemperatureClb={setTemperatureType} />

          <Box
            component="main"
            sx={{
              height: "calc(100vh - 55px)", // 55px is the height of the NavBar
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            <Stack
              sx={{
                px: { xs: 2, md: 4 },
                py: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <LocationSearch clb={handleAddLocation} />
            </Stack>

            <Stack
              sx={{
                px: { xs: 2, md: 4 },
                py: 4,
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ flexGrow: 1 }}
              >
                {filteredLocations.map((location, index) => (
                  <Location
                    location={location}
                    toggleFavoriteClb={handleToggleFavorite}
                    removeLocationClb={handleRemoveLocation}
                    editLocationClb={handleEditLocation}
                    key={index}
                  />
                ))}
              </Grid>
            </Stack>
          </Box>
        </CssVarsProvider>
      </TemperatureContext.Provider>
    </HelmetProvider>
  );
}

export default App;
