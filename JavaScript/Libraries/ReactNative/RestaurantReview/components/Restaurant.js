import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const Restaurant = ({ restaurant, index }) => {
  const [displayInfo, toggleInfo] = useState(false);
  return (
    <View style={{ backgroundColor: index % 2 ? "#ddd" : "white" }}>
      <View style={styles.item}>
        <View style={styles.edges}>
          <Text>{index + 1}</Text>
        </View>
        <View style={styles.nameAdress}>
          <Text>{restaurant.name}</Text>
          <Text style={styles.addressText}>{restaurant.address}</Text>
        </View>
        <TouchableHighlight
          onPress={() => toggleInfo(!displayInfo)}
          style={styles.edges}
          underlayColor="red"
        >
          <Text>info</Text>
        </TouchableHighlight>
      </View>
      {displayInfo && (
        <View style={styles.edges}>
          <Text>Info</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  item: { flexDirection: "row" },
  edges: { flex: 1, justifyContent: "center", alignItems: "center" },
  nameAdress: {
    flex: 8
  },
  addressText: { color: "#bbb" }
});

export default Restaurant;
