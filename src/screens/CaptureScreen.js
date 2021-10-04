import React, { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,ScrollView
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import ProgressCircle from "react-native-progress/Circle";
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from "react-native-tesseract-ocr";
import RBSheet from "react-native-raw-bottom-sheet";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Speech from "expo-speech";

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function CaptureScreen({ navigations }) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState("");
  const [speaker, setSpeaker] = useState(false);
  const refRBSheet = useRef();
  useEventListener("onProgressChange", (p) => {
    setProgress(p.percent / 100);
  });
  const UpdateSpeaker = () => {
    if (speaker) {
      setSpeaker(!speaker);
      Speech.stop();
    } else {
      setSpeaker(!speaker);
      const thingToSay ="'"+text+"'";
      Speech.speak(thingToSay);
    }
  };

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions
      );
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText("");
    }

    setIsLoading(false);
    setProgress(0);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({ uri: image.path });
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== "User cancelled image selection") {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImgSrc({ uri: image.path });
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== "User cancelled image selection") {
        console.error(err);
      }
    }
  };

  return (
    <ScrollView style={{flex:1,backgroundColor: "#F5FCFF",}}><View style={styles.container}>
      <RBSheet
        closeOnDragDown
        ref={refRBSheet}
        height={250}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
        }}
      >
        <TouchableOpacity
          style={styles.button}
          disabled={isLoading}
          onPress={() => {
            recognizeFromCamera();
          }}
        >
          <View style={styles.options}>
            <FontAwesome5
              style={{ marginRight: 10 }}
              name="camera"
              color="grey"
              size={20}
            />
            <Text style={{ fontSize: 20, justifyContent: "center" }}>
              Open Camera
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          disabled={isLoading}
          onPress={() => {
            recognizeFromPicker();
            refRBSheet.current.close()
          }}
        >
          <View style={styles.options}>
            <FontAwesome5
              style={{ marginRight: 10 }}
              name="image"
              color="grey"
              size={20}
            />
            <Text style={{ fontSize: 20, justifyContent: "center" }}>
              Select Image from Gallery
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          disabled={isLoading}
          onPress={() => {
            refRBSheet.current.close();
          }}
        >
          <View style={styles.options}>
            <FontAwesome5
              style={{ marginRight: 10 }}
              name="times"
              color="grey"
              size={20}
            />
            <Text style={{ fontSize: 20, justifyContent: "center" }}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
      <Text style={{textAlign:"center"}}>IF YOU WANT TO EXTRACT TEXT FROM THE IMAGE PLEASE PRESS ON THIS BUTTON</Text>
      <View style={styles.options}>
        
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Camera"
            onPress={() => {
              refRBSheet.current.open();
            }}
          />
        </View>
      </View>
      
      {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {isLoading ? (
            <ProgressCircle showsText progress={progress} />
          ) : (<View style={{flexDirection:"column"}}>
            <Text style={{textAlign:"center",fontSize:20}}>{text}</Text>
            <TouchableOpacity onPress={UpdateSpeaker}>
              {speaker ? (
                <FontAwesome5 name="volume-up" color="green" size={30} />
              ) : (
                <FontAwesome5 name="volume-mute" color="#05375a" size={30} />
              )}
            </TouchableOpacity></View>
            
          )}
         
        </View>
      )}<Button title="press me" onPress={console.log(JSON.stringify(text))}></Button>
    </View></ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  options: {
    flexDirection: "row",
    padding: 5,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#ffff",
    padding: "5%",
    justifyContent: "space-between",
  },
});

export default CaptureScreen;
