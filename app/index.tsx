import { getWeatherIcon } from "@/constants/WeatherIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Condition = {
  text: string;
  code: number;
};

type ForcastDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition;
  };
};

type Weather = {
  location: {
    name: string;
    county: string;
    localtime: string;
  };
  current: {
    last_updated: string;
    temp_c: number;
    is_day: number;
    uv: string;
    condition: Condition;
  };
  forecast: {
    forecastday: ForcastDay[];
  };
};

type WeatherIcon =
  | "weather-sunny"
  | "weather-partly-cloudy"
  | "cloud-outline"
  | "weather-cloudy-alert"
  | "weather-sunny-off";

const ForcastDayItem = ({ forcastday }: { forcastday: ForcastDay }) => {
  return <Text>{forcastday?.date}</Text>;
};

const index = () => {
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState<boolean>();

  const requestWeather = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=c5673414b031477a9df01840240806&q=London&days=5&lang=pt
`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    requestWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> : <></>}
      <View style={styles.currentTempContainer}>
        <Text style={styles.currentTemp}>{weather?.current?.temp_c}º</Text>
        <View style={{ gap: 8 }}>
          <Text style={styles.condition}>
            {weather?.current?.condition?.text}
          </Text>
          <Text style={styles.condition}>
            Índice UV: {weather?.current?.uv}
          </Text>
        </View>
        <MaterialCommunityIcons
          name={
            getWeatherIcon(weather?.current?.condition?.code) as WeatherIcon
          }
          size={56}
          color="white"
        />
      </View>
      <FlatList
        data={weather?.forecast?.forecastday}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <ForcastDayItem forcastday={item} />}
      />
    </SafeAreaView>
  );
};
export default index;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02467a",
    flex: 1,
    padding: 24,
  },
  condition: {
    fontSize: 20,
    color: "#ffffff",
  },
  currentTempContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  currentTemp: {
    fontSize: 64,
    color: "#ffffff",
    fontWeight: "500",
  },
});
