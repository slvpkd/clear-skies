import {
  Delete,
  Edit,
  Favorite,
  HeartBroken
} from "@mui/icons-material";
import {
  AspectRatio,
  ButtonGroup,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Grid,
  IconButton,
  Sheet,
  Switch,
  Typography,
  styled
} from "@mui/joy";
import { useContext, useEffect, useState } from "react";
import { TemperatureContext } from "../Context";
import { WeatherAPI } from "../api/WeatherApi";
import { AppTypes } from "../types/AppTypes";
import LocationSearch from "./LocationSearch";

export const Location = (props: {
  location: AppTypes.ILocationItem;
  toggleFavoriteClb: (name: string) => void;
  removeLocationClb: (name: string) => void;
  editLocationClb: (name: string) => void;
}) => {
  const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
    ...theme.typography["body-sm"],
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));

  const weatherCondition = WeatherAPI.getWeatherConditionByCode(
    props.location.code
  );

  const [checked, setChecked] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const temperatureType = useContext(TemperatureContext);
  const isCelcius = temperatureType === "celcius";
  const tempSuffix = isCelcius && !checked ? <>&#8451;</> : <>&#x2109;</>;

  useEffect(() => {
    setChecked(!isCelcius);
  }, [temperatureType]);

  const temperature =
    isCelcius && !checked
      ? `${props.location.temperature.c}`
      : `${props.location.temperature.f}`;

  return (
    <Grid xs={12} sm={12} md={4} lg={4}>
      <Item>
        <Card variant="outlined" sx={{ width: "100%" }}>
          <CardOverflow>
            <AspectRatio objectFit="contain">
              <img src={props.location.icon} srcSet={props.location.icon} />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            {editMode ? (
              <LocationSearch clb={props.editLocationClb} />
            ) : (
              <Typography level="title-lg">{props.location.name}</Typography>
            )}

            <Typography level="body-md">
              {temperature} {tempSuffix}
            </Typography>

            <Typography level="body-md">
              {props.location.isDay
                ? weatherCondition.day
                : weatherCondition.night}
            </Typography>

            {props.location.forecast.map((e, i) => {
              const forecastTemperature =
                isCelcius && !checked
                  ? `${e.temperature.c}`
                  : `${e.temperature.f}`;
              return (
                <Card size="sm" sx={{ p: 0.5 }} key={i}>
                  {WeatherAPI.formatDate(e.date)} - {forecastTemperature}{" "}
                  {tempSuffix}
                </Card>
              );
            })}
          </CardContent>
          <CardOverflow variant="soft">
            <Divider inset="context" />
            <CardContent
              orientation="horizontal"
              sx={{ justifyContent: "space-between" }}
            >
              <Switch
                startDecorator={<Typography>&#8451;</Typography>}
                endDecorator={<Typography>&#x2109;</Typography>}
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
              />
              <ButtonGroup
                size="md"
                buttonFlex={1}
                aria-label="flex button group"
                sx={{
                  p: 0,
                  overflow: "auto",
                }}
              >
                <IconButton
                  onClick={() => props.removeLocationClb(props.location.name)}
                >
                  <Delete />
                </IconButton>
                <IconButton onClick={() => setEditMode(true)}>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => props.toggleFavoriteClb(props.location.name)}
                >
                  {props.location.isFavorite ? (
                    <Favorite color="error" />
                  ) : (
                    <HeartBroken color="error" />
                  )}
                </IconButton>
              </ButtonGroup>
            </CardContent>
          </CardOverflow>
        </Card>
      </Item>
    </Grid>
  );
};

export default Location;
