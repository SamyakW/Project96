import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Stalshine": require("../assets/fonts/Stalshine.ttf")
};

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      post_id: this.props.post.key,
      post_data: this.props.post.value,
      is_liked: false,
      likes: this.props.post.value.likes
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
        .child(this.state.post_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.post_id)
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

  render() {
    let post = this.state.post_data;
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      let images = {
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
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: this.props.post
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <Image
              source={images[post.preview_image]}
              style={styles.postImage}
            ></Image>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.postTitleTextLight
                      : styles.postTitleText
                  }
                >
                  {post.title}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.postUserTextLight
                      : styles.postUserText
                  }
                >
                  {post.user}
                </Text>

                <Text
                  style={
                    this.state.light_theme
                      ? styles.subtitleTextLight
                      : styles.subtitleText
                  }
                >
                  {this.props.post.subtitle}
                </Text>
              </View>
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
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#3C2A21",
    borderRadius: RFValue(15)
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "#B76E79",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  titleTextContainer: {
    flex: 0.8
  },
  iconContainer: {
    flex: 0.2
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
  subtitleContainer: {
    marginTop: RFValue(5)
  },
  subtitleText: {
    fontFamily: "Stalshine",
    fontSize: RFValue(13),
    color: "white"
  },
  subtitleTextLight: {
    fontFamily: "Stalshine",
    fontSize: RFValue(13),
    color: "white"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
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