import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    condition: {
      text: string;
      code: number;
    };
  };
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
      </View>
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
