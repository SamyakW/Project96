import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class SignOut extends Component {
  componentDidMount() {
    firebase.auth().signOut();
    this.props.navigation.replace("SignIn");
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>SignOut</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
