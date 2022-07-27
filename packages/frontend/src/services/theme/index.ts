import Color from "color";
import vibrant from "node-vibrant";
import { DefaultTheme } from "styled-components";
import { defaultTypography } from "../../components/typography/default";

export const generateTheme = async (
  backgroundImage: string,
): Promise<DefaultTheme> => {
  const palette = await vibrant.from(backgroundImage).getPalette();

  return {
    primaryColor: palette.Vibrant?.hex ?? "#000",
    primaryContainer: Color(palette.Vibrant?.hex).lighten(0.1).hex(),
    secondaryColor: palette.LightVibrant?.hex ?? "#000",
    secondaryContainer: Color(palette.LightVibrant?.hex).lighten(0.1).hex(),
    secondaryContainerVariant: Color(palette.LightVibrant?.hex)
      .lighten(0.3)
      .hex(),
    backgroundColor: Color(palette.LightMuted?.hex).lighten(0.1).hex(),
    textColor: Color(palette.DarkVibrant?.hex).darken(0.4).hex(),
    textColorMuted: Color(palette.DarkVibrant?.hex).lighten(0.2).hex(),
    surfaceColor: Color(palette.LightVibrant?.hex).desaturate(0.1).hex(),
    typography: defaultTypography,
  };
};
