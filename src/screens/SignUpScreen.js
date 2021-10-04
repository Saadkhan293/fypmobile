import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Error from "./Error";
// import baseURL from "../../assets/common/baseURL"
import Feather from "react-native-vector-icons/Feather";
import Toast from "react-native-toast-message";
const SignUpScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [data, setDate] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    name_textInputChange: false,
    age_textInputChange: false,
    gender_textInputChange: false,
    email_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
  });
  const register = () => {
    console.log(data);
    if (
      data.name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.age === ""
    ) {
      setError("Please enter your crendentials");
    }if(data.password!=data.confirmPassword){
      setError("Your password does not match with confirm password. please enter correct password")
    }
     else {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
        age: data.age,
      };
   
      
      axios
        .post("http://192.168.42.161:4000/v1/api/users/register", user)
        .then((response) => {
          if (response.status == 200) {
            Toast.show({
              topOffset:60,
              type:"success",
              text1:"registration is successful",
              text2:"please login to your account"
            })
            setTimeout(()=>{
              navigation.navigate("SignInScreen")
            },500)
          }
        })
        .catch((e) => {
          Toast.show({
            topOffset:60,
            type:"error",
            text1:"Something went wrong",
            text2:"please try later",
          })
        });
    }
  };
  const NameTextInputChange = (val) => {
    if (val.length !== 0) {
      setDate({
        ...data,
        name: val,
        name_textInputChange: true,
      });
    } else {
      setDate({
        ...data,
        name: val,
        name_textInputChange: false,
      });
    }
  };
  const ageTextInputChange = (val) => {
    if (val.length !== 0 && val <= 99) {
      setDate({
        ...data,
        age: val,
        age_textInputChange: true,
      });
    } else {
      setDate({
        ...data,
        age: val,
        age_textInputChange: false,
      });
    }
  };
  const genderTextInputChange = (val) => {
    if (val.length !== 0) {
      setDate({
        ...data,
        gender: val,
        gender_textInputChange: true,
      });
    } else {
      setDate({
        ...data,
        gender: val,
        gender_textInputChange: false,
      });
    }
  };
  const emailTextInputChange = (val) => {
    if (val.length !== 0) {
      setDate({
        ...data,
        email: val,
        email_textInputChange: true,
      });
    } else {
      setDate({
        ...data,
        email: val,
        email_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setDate({ ...data, password: val });
  };
  const updateSecureTextEntry = () => {
    setDate({ ...data, secureTextEntry: !data.secureTextEntry });
  };
  const handleConfirmPasswordChange = (val) => {
    setDate({ ...data, confirmPassword: val });
  };

  const updateConfirmSecureTextEntry = () => {
    setDate({ ...data, confirmSecureTextEntry: !data.confirmSecureTextEntry });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView>
          <Text style={styles.text_footer}>Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-circle-o" color="#05375a" size={20} />

            <TextInput
              placeholder="Your Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => NameTextInputChange(val)}
            />
            {data.name_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, { marginTop: 10 }]}>Age</Text>
          <View style={styles.action}>
            <FontAwesome name="child" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Age"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => ageTextInputChange(val)}
            />
            {data.age_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 10 }]}>Gender</Text>
          <View style={styles.action}>
            <FontAwesome name="child" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Gender"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => genderTextInputChange(val)}
            />
            {data.gender_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, { marginTop: 10 }]}>Email</Text>
          <View style={styles.action}>
            <Fontisto name="email" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => emailTextInputChange(val)}
            />
            {data.email_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.text_footer, { marginTop: 10 }]}>Password</Text>

          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Enter Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="#05375a" size={20} />
              ) : (
                <Feather name="eye" color="#05375a" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={[styles.text_footer, { marginTop: 10 }]}>
            Confirm Password
          </Text>

          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={data.confirmSecureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirmSecureTextEntry ? (
                <Feather name="eye-off" color="#05375a" size={20} />
              ) : (
                <Feather name="eye" color="#05375a" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {error ? <Error message={error} /> : null}
          <View style={styles.button}>
            <LinearGradient
              colors={["#aed3ec", "#CDCFCE"]}
              style={styles.signIn}
            >
              <TouchableOpacity
                onPress={register}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Sign Up</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
              style={[
                styles.signIn,
                { borderColor: "#05375a", borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text style={[styles.textSign, { color: "#05375a" }]}>
                Already have account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aed3ec",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});