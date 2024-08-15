import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const index = () => {
  return (
    <View style={styles.container}>
      <Text>Tela inicial</Text>
    </View>
  );
};

export default index;
