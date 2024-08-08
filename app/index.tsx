import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#f2f" }}>Home Screen</Text>
      <Link href={"/test/explore"}>Test</Link>
    </View>
  );
}
