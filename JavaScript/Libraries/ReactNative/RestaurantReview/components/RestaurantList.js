import React, { Component } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import Restaurant from "./Restaurant";

export default class RestaurantList extends Component {
  state = {
    search: "",
    displayInfo: false
  };

  showInfo = () => {
    this.setState({ displayInfo: !this.state.displayInfo });
  };

  render() {
    const restaurants = [
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 1", address: "Street of restaurant 1" },
      { name: "Restaurant 2", address: "Street of restaurant 2" },
      { name: "Restaurant 3", address: "Street of restaurant 3" },
      { name: "Restaurant 4", address: "Street of restaurant 4" }
    ];
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF"
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Live Search"
          onChangeText={text => {
            this.setState({ search: text });
          }}
          value={this.state.search}
        />

        <FlatList
          data={restaurants.filter(place => {
            return (
              !this.state.search ||
              place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
            );
          })}
          renderItem={({ item, index }) => (
            <Restaurant place={item} index={index} navigation={this.props.navigation} />
          )}
          keyExtractor={item => item.name}
          initialNumToRender={16}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: "#222",
    fontSize: 30,
    fontWeight: "300",
    textAlign: "center",
    padding: 20
  },
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5"
  }
});
