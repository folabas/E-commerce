import * as Font from "expo-font";

export default useFonts = async () =>
  await Font.loadAsync({
    "ArchivoBlack-Regular": require("../assets/fonts/ArchivoBlack-Regular.ttf"),
    // Add other custom fonts here if needed
  });
