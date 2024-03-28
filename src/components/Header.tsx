import { Surfing } from "@mui/icons-material";
import { Box, IconButton, Switch } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useEffect, useState } from "react";
import { AppTypes } from "../types/AppTypes";
import ColorSchemeToggle from "./ColourSchemeToggle";

const Header = (props: {setTemperatureClb: (value: AppTypes.TemperatureType) => void}) => {
  

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {

    props.setTemperatureClb(checked ? "fahrenheit" : "celcius");
  }, [checked]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: "background.body",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "sticky",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton size="sm" variant="soft">
          <Surfing />
        </IconButton>
        <Typography component="h1" fontWeight="xl">
          Clear Skies
        </Typography>
        <Typography level="body-md" color="neutral">
          Forecasting Clarity, Always.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: "center",
            display: { xs: "none", sm: "flex" },
          }}
        ></Box>
        <Switch
          startDecorator={<Typography>&#8451;</Typography>}
          endDecorator={<Typography>&#x2109;</Typography>}
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <ColorSchemeToggle sx={{ alignSelf: "center" }} />
      </Box>
    </Box>
  );
};

export default Header;
