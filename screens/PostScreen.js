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
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Stalshine": require("../assets/fonts/Stalshine.ttf")
};

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      light_theme: true,
      likes: this.props.route.params.post.value.likes,
      is_liked: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  likeAction = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.post.key)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.post.key)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  async initiateTTS(title, subtitle, description, reference) {
    console.log(title)
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "white" ? "#4C0033" : "white"
    });
    if (current_color === "white") {
      Speech.speak(title);
      Speech.speak(subtitle);
      Speech.speak(description);
      Speech.speak("This information is refered from");
      Speech.speak(reference);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (this.state.fontsLoaded) {
        return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >Spedia</Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <ScrollView
              style={
                this.state.light_theme
                  ? styles.postCardLight
                  : styles.postCard
              }
            >
              <Image source={require("../assets/broken.png")} style={styles.image}
              ></Image>
              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postTitleTextLight
                        : styles.postTitleText
                    }
                  >
                    {this.props.route.params.post.value.title}
                  </Text>
                  <Text
                  style={
                    this.state.light_theme
                      ? styles.postSubtitleTextLight
                      : styles.postSubtitleText
                  }
                >
                  {this.props.route.params.post.value.subtitle}
                </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postUserTextLight
                        : styles.postUserText
                    }
                  >
                    {this.props.route.params.post.value.user}
                  </Text>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.postUserTextLight
                        : styles.postUserText
                    }
                  >
                    {this.props.route.params.post.value.created_on}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.post.value.title,
                        this.props.route.params.post.value.subtitle,
                        this.props.route.params.post.value.description,
                        this.props.route.params.post.value.reference
                      )
                    }
                  >
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.descriptionTextContainer}>              
                <Text
                  style={
                    this.state.light_theme
                      ? styles.descriptionTextLight
                      : styles.descriptionText
                  }
                >
                  {this.props.route.params.post.value.description}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.referenceTextLight
                      : styles.referenceText
                  }
                >Reference - {this.props.route.params.post.value.reference}</Text>
              </View>

              <View style={styles.actionContainer}>
              <TouchableOpacity
                  style={
                    this.state.is_liked
                      ? styles.likeButtonLiked
                      : styles.likeButtonDisliked
                  }
                  onPress={() => this.likeAction()}
                >
                  <Ionicons
                    name={"thumbs-up"}
                    size={RFValue(30)}
                    color={this.state.light_theme ? "white" : "white"}
                  />

                  <Text
                    style={
                      this.state.light_theme
                        ? styles.likeTextLight
                        : styles.likeText
                    }
                  >
                    {this.state.likes}
                  </Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A120B"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#CD104D"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Stalshine"
  },
  appTitleTextLight: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Stalshine"
  },
  postContainer: {
    flex: 1
  },
  postCard: {
    margin: RFValue(20),
    backgroundColor: "#3C2A21",
    borderRadius: RFValue(20)
  },
  postCardLight: {
    margin: RFValue(20),
    backgroundColor: "#B76E79",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  postTitleText: {
    fontFamily: "Stalshine",
    fontSize: RFValue(25),
    color: "white"
  },
  postTitleTextLight: {
    fontFamily: "Stalshine",
    fontSize: RFValue(25),
    color: "white"
  },
    postSubtitleText: {
    fontFamily: "Stalshine",
    fontSize: RFValue(20),
    color: "white"
  },
  postSubtitleTextLight: {
    fontFamily: "Stalshine",
    fontSize: RFValue(20),
    color: "white"
  },
  postUserText: {
    fontFamily: "Stalshine",
    fontSize: RFValue(18),
    color: "white"
  },
  postUserTextLight: {
    fontFamily: "Stalshine",
    fontSize: RFValue(18),
    color: "white"
  },
  iconContainer: {
    flex: 0.2
  },
  descriptionTextContainer: {
    padding: RFValue(20)
  },
  descriptionText: {
    fontFamily: "Stalshine",
    fontSize: RFValue(15),
    color: "white"
  },
  descriptionTextLight: {
    fontFamily: "Stalshine",
    fontSize: RFValue(15),
    color: "white"
  },
  referenceText: {
    fontFamily: "Stalshine",
    fontSize: RFValue(15),
    color: "white"
  },
  referenceTextLight: {
    fontFamily: "Stalshine",
    fontSize: RFValue(15),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#D61C4E",
    borderRadius: RFValue(30)
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#D61C4E",
    borderWidth: 2,
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Stalshine",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  },
  likeTextLight: {
    fontFamily: "Stalshine",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
    color: "white",
  }
});
