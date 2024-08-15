import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
    condition: {
      text: string;
      code: number;
    };
  };
};

const index = () => {
  const [weather, setWeather] = useState<Weather>();
  const requestWeather = useCallback(async () => {
    try {
      const response =
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=c5673414b031477a9df01840240806&q=London&days=5&lang=pt
`);
      setWeather(response.data);
    } catch (error) {
    } finally {
    }
  }, []);
  useEffect(() => {
    requestWeather();
  }, []);
  return (
    <View style={styles.container}>
      <Text>{weather?.current?.temp_c}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
