import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, TextInput, Alert, TouchableOpacity, Text } from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

const appIcon = require("../assets/logo.png");

export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fontsLoaded: false,
            userSignedIn: false
        };
    }
    
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    signIn = async (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.replace("Dashboard");
            })
            .catch(error => {
                Alert.alert("Try again!");
            });
    };


    render() {

        const { email, password } = this.state;

        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />

                <Text style={styles.appTitleText}>Spedia</Text>
                <Image source={appIcon} style={styles.appIcon} />

                <TextInput
                    style={styles.textinput}
                    onChangeText={text => this.setState({ email: text })}
                    placeholder={"Enter Email"}
                    placeholderTextColor={"#FFFFFF"}
                    autoFocus
                />
                <TextInput
                    style={[styles.textinput, { marginTop: 20 }]}
                    onChangeText={text => this.setState({ password: text })}
                    placeholder={"Enter Password"}
                    placeholderTextColor={"#FFFFFF"}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={[styles.button, { marginTop: 20 }]}
                    onPress={() => this.signIn(email, password)}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUpScreen")}>
                    <Text style={styles.buttonTextNewUser}>New User ?</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#B76E79",
        alignItems: "center",
        justifyContent: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appIcon: {
        width: RFValue(200),
        height: RFValue(200),
        resizeMode: "contain",
        marginBottom: RFValue(20)
    },
    appTitleText: {
        color: "white",
        textAlign: "center",
        fontSize: RFValue(40),
        marginBottom: RFValue(20),
        fontFamily: "Stalshine",
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(50),
        padding: RFValue(10),
        borderColor: "#FFDAE5",
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(20),
        color: "#FFF7FF",
        backgroundColor: "##FFF7FF",
        fontFamily: "Stalshine",
    },
    button: {
        width: RFValue(250),
        height: RFValue(50),
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: RFValue(30),
        backgroundColor: "#FFDAE5",
        marginBottom: RFValue(20)
    },
    buttonText: {
        fontSize: RFValue(24),
        color: "#FFFFFF",
        fontFamily: "Stalshine",
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
        color: "#FFFFFF",
        textDecorationLine: 'underline',
        fontFamily: "Stalshine",
    }
});