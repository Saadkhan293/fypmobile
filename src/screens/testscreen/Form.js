import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import {
  Button,
  Title,
  RadioButton,
  Text,
  Paragraph,
} from "react-native-paper";
import Progress from "../../components/Progress";
import AppText from "../../components/AppText";
import styling from "../../components/styling";
import * as Animatable from "react-native-animatable";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const { width, height } = Dimensions.get("screen");
const questions = [
  {
    questionText: "Do you try to avoid reading and writing whenever possible?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText:
      "Do you struggle to remember things such as a PIN or telephone number?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText: "Do you face confusion in the order of letters in words?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText:
      "Do you face problems learning the names and sounds of letters?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText:
      "Do you face answering questions well orally, but having difficulty writing the answer down?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText:
      "Do you struggle to learn sequences, such as days of the week or the alphabets?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText: "Do you have slow writing speed?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText:
      "You have problem mispronouncing words, such as 'Aminal' to 'Animal'?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText:
      "You have trouble telling directions such as east or west, left or right?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
  {
    questionText: "You have problems with rhyming words?",
    answerOptions: [{ answerText: "Yes" }, { answerText: "No" }],
  },
];

const Form = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checked, setChecked] = useState("");
  const [nextBtn, setNextBtn] = useState(true);
  const [data, setData] = useState([]);
  const [userForm, setUserForm] = useState(false);
  const [hide, setHide] = useState(true);
  const [save, setSave] = useState(false);
  const handleNextBtn = (id, question, answer) => {
    const nextQuestion = currentQuestion + 1;
    setData((data) => [
      ...data,
      { id: id, question: question, answer: answer },
    ]);
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setChecked("");
    } else {
      setUserForm(true);
    }
    console.log(data);
  };
  useEffect(() => {
    if (checked == "") {
      setNextBtn(true);
    } else {
      setNextBtn(false);
    }
  }, [checked]);
  const Item = ({ question, answer, id }) => (
    <View style={{ paddingLeft: 10 }}>
      <AppText style={styling.text}>
        Question {id + 1}: {question}
      </AppText>
      <AppText style={[styling.text, { fontWeight: "bold" }]}>{answer}</AppText>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item question={item.question} answer={item.answer} id={item.id} />
  );
  const handleReset = () => {
    setSave(false);
    setData([]);
    setChecked("");
    setUserForm(false);
    setCurrentQuestion(0);
  };
  return (
    <View>
      {userForm ? (
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
          }}
        >
          <View style={styling.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="ios-arrow-back-circle"
                size={width * 0.08}
                color="black"
              />
            </TouchableOpacity>

            <AppText style={styling.headerText}>Self Assessment Form</AppText>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Animatable.Image
                animation="bounceIn"
                duraton="1500"
                delay={100}
                source={require("../../../assets/graduated.png")}
                style={styling.avator}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: width,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <AntDesign
                name="checkcircle"
                size={width * 0.2}
                color="#28CBB0"
              />
              <Title
                style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}
              >
                Thank You
              </Title>
              {save ? <Title>Form saved successfully</Title> : null}
              <Button
                mode="contained"
                onPress={() => setHide(!hide)}
                style={{ marginTop: 15, borderRadius: 10 }}
              >
                {hide ? "show" : "hide"} Responses
              </Button>
            </View>
          </View>
          {hide ? null : (
            <View
              style={{ borderWidth: 1, borderRadius: 20, height: height * 0.5 }}
            >
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                nestedScrollEnabled
              />
            </View>
          )}
          <View
            style={{
              width: width,
              justifyContent: "space-around",
              flexDirection: "row",
              alignItems: "center",
              paddingTop: height * 0.4,
            }}
          >
            <Button
              mode="contained"
              onPress={() => handleReset()}
              color="#F6A5CA"
              style={{ borderRadius: 10 }}
            >
              Reset Form
            </Button>
            <Button
              mode="contained"
              onPress={() => setSave(true)}
              color="#28CBB0"
              style={{ borderRadius: 10 }}
            >
              Save Form
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="ios-arrow-back-circle" size={width * 0.08} />
            </TouchableOpacity>
            <Progress step={currentQuestion + 1} steps={10} height={20} />
            <Title style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
              {questions[currentQuestion].questionText}
            </Title>
          </View>
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].answerOptions.map((answerOption, i) => (
              <View
                onPress={() => console.log("ALi Hassan")}
                key={i}
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: height * 0.028,
                }}
              >
                <View
                  style={{
                    width: "90%",
                    borderRadius: 10,
                    borderWidth: 2,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: height * 0.05,
                  }}
                >
                  <Title> {answerOption.answerText}</Title>
                  <RadioButton
                    value={answerOption.answerText}
                    status={
                      checked === answerOption.answerText
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => setChecked(answerOption.answerText)}
                  />
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Button
              mode="contained"
              style={styles.buttonsContainer}
              onPress={() =>
                handleNextBtn(
                  currentQuestion,
                  questions[currentQuestion].questionText,
                  checked
                )
              }
              disabled={nextBtn}
            >
              <Title
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                {currentQuestion == 9 ? "Submit Form" : "Next Question"}
              </Title>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    width: width,
    height: height * 0.3,
    backgroundColor: "#C3E9E5",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  optionsContainer: {
    width: width,
    height: height * 0.5,
    justifyContent: "center",
  },
  buttonsContainer: {
    height: height * 0.05,
    borderRadius: 15,
    backgroundColor: "#ea4c89",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});