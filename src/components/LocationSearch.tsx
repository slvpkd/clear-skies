import { Autocomplete } from "@mui/joy";
import { useEffect } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const LocationSearch = (props: { clb: (value: string) => void }) => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: "AIzaSyBiqnReQsQjDHoSYK1mT6I_KXXfFAneaYs",
  });

  useEffect(() => {
    if (placePredictions.length)
      placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => {
          console.log(placeDetails);
        }
      );
  }, [placePredictions]);

  return (
    <>
      <Autocomplete
        placeholder="Enter a location..."
        options={placePredictions.map((item) => item.description)}
        onInputChange={(_, v) => getPlacePredictions({ input: v })}
        onChange={(_, value) => {
          props.clb(value!);
        }}
        loading={isPlacePredictionsLoading}
      />
    </>
  );
};

export default LocationSearch;
