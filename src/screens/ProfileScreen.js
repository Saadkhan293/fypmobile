import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import styling from "../components/styling";
import AppText from "../components/AppText";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
const { height, width } = Dimensions.get("screen");

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              delay={100}
              source={require("../../assets/graduated.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <AppText style={[styling.heading, { paddingTop: 10 }]}>
            John Doe
          </AppText>
        </View>
      </View>
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 10,
            borderBottomWidth: 0.5,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              delay={100}
              source={require("../../assets/level-up.png")}
              style={styles.iconStyle}
              resizeMode="cover"
            />
            <AppText style={{ paddingTop: 5, fontWeight: "bold" }}>
              Level: 0
            </AppText>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              delay={100}
              source={require("../../assets/brainstorming.png")}
              style={styles.iconStyle}
              resizeMode="cover"
            />
            <AppText style={{ paddingTop: 5, fontWeight: "bold" }}>
              Dyslexia: N/A
            </AppText>
          </View>
        </View>
        <Animatable.View
          style={{ marginTop: height * 0.03 }}
          animation="fadeInUpBig"
          duraton="2000"
          delay={800}
          source={require("../../assets/age.png")}
        >
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={styles.fieldText}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                }}
              >
                <FontAwesome name="user-circle-o" color="#05375a" size={25} />
                <AppText
                  style={[
                    styling.heading,
                    { fontSize: 25, paddingLeft: 15, fontWeight: null },
                  ]}
                >
                  Name
                </AppText>
              </View>
              <AppText style={[styling.heading, { paddingLeft: 30 }]}>
                John Doe
              </AppText>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={styles.fieldText}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                }}
              >
                <Fontisto name="email" color="#05375a" size={25} />

                <AppText
                  style={[
                    styling.heading,
                    { fontSize: 25, paddingLeft: 15, fontWeight: null },
                  ]}
                >
                  Email
                </AppText>
              </View>
              <AppText style={[styling.heading, { paddingLeft: 30 }]}>
                johndoe@example.com
              </AppText>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={styles.fieldText}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                }}
              >
                <FontAwesome name="child" color="#05375a" size={25} />
                <AppText
                  style={[
                    styling.heading,
                    { fontSize: 25, paddingLeft: 15, fontWeight: null },
                  ]}
                >
                  Gender
                </AppText>
              </View>
              <AppText style={[styling.heading, { paddingLeft: 30 }]}>
                Male
              </AppText>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={styles.fieldText}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                }}
              >
                <Entypo name="users" color="#05375a" size={25} />
                <AppText
                  style={[
                    styling.heading,
                    { fontSize: 25, paddingLeft: 15, fontWeight: null },
                  ]}
                >
                  Age
                </AppText>
              </View>
              <AppText style={[styling.heading, { paddingLeft: 30 }]}>
                17 Years
              </AppText>
            </View>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingTop: StatusBar.currentHeight,
    borderWidth: 2,
  },
  screenContainer: {
    height: height * 0.2,
  },
  bottom: {
    height: height * 0.6,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderTopLeftRadius: width * 0.18,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 1,
    borderColor: "black",
  },
  iconStyle: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    borderRadius: (width * 0.25) / 2,
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
  },
  fieldText: {
    paddingLeft: width * 0.1,
  },
});
