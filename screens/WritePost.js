import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

import * as Font from "expo-font";

let customFonts = {
  "Stalshine": require("../assets/fonts/Stalshine.ttf"),
};

export default class WritePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropdownHeight: 40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async addPost() {
    if (this.state.title && this.state.subtitle && this.state.description && this.state.reference) {
      var d = new Date()
      let postData = {
        preview_image: this.state.previewImage,
        title: this.state.title,
        subtitle: this.state.subtitle,
        description: this.state.description,
        reference: this.state.reference,
        // user: firebase.auth().currentUser.displayName,
        created_on: d.toString(),
        user_uid: firebase.auth().currentUser.uid,
        likes: 0
      }
      console.log(postData)
      await firebase
        .database()
        .ref("/posts/" + (Math.random().toString(36).slice(2)))
        .set(postData)
        .then(function (snapshot) {

        })
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Home")
    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
    if (this.state.fontsLoaded) {
      let preview_images = {
        image1: require("../assets/image1.png"),
        image2: require("../assets/image2.png"),
        image3: require("../assets/image3.png"),
        image4: require("../assets/image4.png"),
        image5: require("../assets/image5.png"),
        image6: require("../assets/image6.png"),
        image7: require("../assets/image7.png"),
        image8: require("../assets/image8.png"),
        image9: require("../assets/image9.png"),
        image10: require("../assets/image10.png"),
        image11: require("../assets/image11.png"),
        image12: require("../assets/image12.png"),
        image13: require("../assets/image13.png"),
        image14: require("../assets/image14.png"),
        image15: require("../assets/image15.png"),
        image16: require("../assets/image16.png"),
        image17: require("../assets/image17.png"),
        image18: require("../assets/image18.png"),
        image19: require("../assets/image19.png"),
        image20: require("../assets/image20.png"),
        image21: require("../assets/image21.png"),
        image22: require("../assets/image22.png"),
        image23: require("../assets/image23.png"),
        image24: require("../assets/image24.png"),
        image25: require("../assets/image25.png")
      };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            ></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                items={[
                  { label: "Agriculture", value: "image1" },
                  { label: "Cinema", value: "image2" },
                  { label: "Commerce", value: "image3" },
                  { label: "Enviroment", value: "image4" },
                  { label: "Defence", value: "image5" },
                  { label: "Food", value: "image6" },
                  { label: "Housing", value: "image7" },
                  { label: "Administration", value: "image8" },
                  { label: "Industries", value: "image9" },
                  { label: "Law and Justice", value: "image10" },
                  { label: "Broadcasting", value: "image11" },
                  { label: "Rural", value: "image12" },
                  { label: "Social Development", value: "image13" },
                  { label: "Travel and Tourism", value: "image14" },
                  { label: "Arts and Culture", value: "image15" },
                  { label: "Communication", value: "image16" },
                  { label: "Education", value: "image17" },
                  { label: "Finance", value: "image18" },
                  { label: "Foreign Affairs", value: "image19" },
                  { label: "Health", value: "image20" },
                  { label: "Infrastructure", value: "image21" },
                  { label: "Technology", value: "image22" },
                  { label: "Science", value: "image23" },
                  { label: "Sports", value: "image24" },
                  { label: "Youth", value: "image25" }
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropdownHeight == 170 ? true : false}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "white",
                }}
                textStyle={{
                  color: this.state.dropdownHeight == 170 ? "black" : "white",
                  fontFamily: "Stalshine",
                }}
                onSelectItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  })
                }
              />
            </View>
            <ScrollView>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={"Title"}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(subtitle) => this.setState({ subtitle })}
                placeholder={"Subtitle"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(description) => this.setState({ description })}
                placeholder={"Description"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(reference) => this.setState({ reference })}
                placeholder={"Reference"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addPost()}
                  title="Submit"
                  color="#841584"
                />
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42032C",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Stalshine",
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Stalshine",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center"
  }
});
