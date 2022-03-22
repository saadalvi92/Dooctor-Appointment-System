import { Platform } from "react-native";
import colors from "./colors";
import { fontSize } from "./fonts";

export default {
  colors,
  fontSize,
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
};
