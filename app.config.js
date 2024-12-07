import 'dotenv/config';

export default {
  expo: {
    name: "KoreanRecipes",
    slug: "korean-recipes",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash.png", // 스플래시 이미지 경로
      resizeMode: "contain",       // "contain" 또는 "cover" 선택 가능
      backgroundColor: "#FFFFFF", // 배경색 설정
    },
    userInterfaceStyle: "automatic",
    extra: {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
      NEXT_PUBLIC_DISQUS_SHORTNAME: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_CLIENT: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY_CLIENT,
      GOOGLE_MAPS_API_KEY_SERVER: process.env.GOOGLE_MAPS_API_KEY_SERVER,
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-localization"
    ],
    newArchEnabled: true, // Bridgeless mode 활성화
  },
};
