import { Theme, DefaultTheme } from "@react-navigation/native";
import { Platform } from "react-native"

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export const lightTheme: Theme = {
    dark: false,
    colors: {
        background: '#F8EDE3',
        text: '#09080e',
        primary: '#583dd4',
        card: '#527a75',
        border: '#305774',
        notification: '#87449e',
    },
    fonts: Platform.select({
        web: {
          regular: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '400',
          },
          medium: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '500',
          },
          bold: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '600',
          },
          heavy: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '700',
          },
        },
        ios: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '700',
          },
        },
        default: {
          regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
          },
          bold: {
            fontFamily: 'sans-serif',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'sans-serif',
            fontWeight: '700',
          },
        },
      }),
}

export const darkTheme: Theme = {
    dark: true,
    colors: {
        background: '#130f25',
        text: '#F8EDE3',
        primary: '#d18b77',
        card: '#1b1826',
        notification: '#b5e3d9',
        border: '#FCD190',
    },
    fonts: Platform.select({
        web: {
          regular: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: '400'
          },
          medium: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: "500"
          },
          bold: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: "600",
          },
          heavy: {
            fontFamily: WEB_FONT_STACK,
            fontWeight: "700",
          },
        },
        ios: {
          regular: {
            fontFamily: 'System',
            fontWeight: "400",
          },
          medium: {
            fontFamily: 'System',
            fontWeight: "500",
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '700',
          },
        },
        default: {
          regular: {
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
          },
          medium: {
            fontFamily: 'sans-serif-medium',
            fontWeight: 'normal',
          },
          bold: {
            fontFamily: 'sans-serif',
            fontWeight: '600',
          },
          heavy: {
            fontFamily: 'sans-serif',
            fontWeight: '700',
          },
        },
      }),
}