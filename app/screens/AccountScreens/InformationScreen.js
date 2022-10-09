import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Image,
} from "react-native";
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import PhoneInput from "react-native-phone-number-input";
import { fontSize } from "../../config/fonts";
import colors from "../../config/colors";
import AppButton from "../../components/Button";
import { Formik } from "formik";
import AppFormField from "../../components/forms/FormField";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import DropDownField from "../../components/forms/DropDownField";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import * as Location from "expo-location";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore/lite";
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { app } from "../../../Firebase";
import * as ImagePicker from "expo-image-picker";
function InformationScreen({ navigation: { navigate, goBack }, route }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [age, setAge] = useState();
  const [name, setName] = useState(route.params.name);
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState("31.123123");
  const [lng, setLng] = useState("72.123");
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status == "granted") {
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
        },
        async (location) => {
          setLat(location.coords.latitude);
          setLng(location.coords.longitude);
        }
      );
    } else {
      alert("You cant continue without loaction permission.");
      getLocation();
    }
  };
  const onChange = (event, selectedDate) => {
    console.log("SelectedDate", selectedDate);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const updateProfile = (values) => {
    if (name == "") {
      alert("Name is missing");
    } else if (age == "") {
      alert("Age is missing");
    } else if (address == "") {
      alert("Address is missing");
    } else if (occupation == "") {
      alert("Occupation is missing");
    } else if (gender == "" || gender == "Select Gender") {
      alert("Gender is missing");
    } else if (phoneNumber == "") {
      alert("Phone Number is missing");
    } else {
      setLoading(true);
      const payload = {
        name: name,
        dob: moment(date).format("YYYY-MM-DD"),
        age: age,
        location: address,
        occupation: occupation,
        gender: gender,
        phone_code: formatedPhoneNumber.replace(phoneNumber, ""),
        phone: phoneNumber,
        lng: lng,
        lat: lat,
        image: image.uri,
        type: route.params.data.userType.label,
        email: route.params.email,
      };
      const auth = getAuth(app);
      const db = getFirestore(app);

      createUserWithEmailAndPassword(
        auth,
        route.params.email,
        route.params.password
      )
        .then(async () => {
          const Users = collection(db, "Users");
          addDoc(Users, payload).then(() => {
            setLoading(false);
            navigate("LoginScreen", { data: route.params.data });
          });
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === "auth/email-already-in-use") {
            alert("That email address is already in use!");
          }
          if (error.code === "auth/invalid-email") {
            alert("That email address is invalid!");
          }
          alert(error);
          console.error(error);
        });
    }
  };
  const updateImage = async (Image, type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.cancelled == false) {
      console.log(result);
      setLoading(true);
      setImage(result.uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      UploadData(blob);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const UploadData = (blob) => {
    const storage = getStorage(app);
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(storage, name);
    uploadBytes(storageRef, blob, metadata)
      .then((snapshot) => {
        setLoading(false);
        console.log("Uploaded a blob or file!", snapshot);
        const pathReference = ref(storage, name);
        getUrl(pathReference);
      })
      .catch((err) => {
        setLoading(false);
        console.log("err is", err);
      });
  };
  const getUrl = (path) => {
    getDownloadURL(path)
      .then((url) => {
        setImage({
          uri: url,
        });
        console.log(("the url is", url));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Screen style={styles.container} top={true}>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        {loading ? (
          <Spinner
            visible={true}
            textContent={""}
            textStyle={{
              color: "#FFF",
            }}
            color={colors.danger}
          />
        ) : null}
        <View style={{ flex: 2, justifyContent: "center" }}>
          <View>
            {/* <AppText style={{paddingBottom: 20}}>Step 1 of 1</AppText> */}
            <AppText
              style={{
                fontSize: fontSize.h4,
                fontWeight: "700",
                color: colors.primary,
              }}
            >
              Your information will be
            </AppText>
            <AppText
              style={{
                fontSize: fontSize.h4,
                fontWeight: "700",
                color: colors.primary,
                paddingBottom: 5,
              }}
            >
              shared with your therapist
            </AppText>
          </View>
        </View>
        {image.uri ? (
          <Image
            style={{
              height: hp("22%"),
              width: wp("37.5%"),
              margin: 10,
              alignSelf: "center",
              borderRadius: 4,
            }}
            source={{ uri: `${image.uri}` }}
          />
        ) : (
          <Image
            style={{
              height: hp("22%"),
              width: wp("37.5%"),
              margin: 10,
              alignSelf: "center",
              borderRadius: 4,
            }}
            source={require("../../assets/images/User.png")}
          />
        )}
        <TouchableHighlight
          onPress={() => {
            updateImage();
          }}
          style={{
            width: "65%",
            height: "5%",
            backgroundColor: colors.green,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            alignSelf: "center",
            marginVertical: "5%",
          }}
        >
          <Text
            style={{
              fontSize: RFValue(13),
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Upload Your Profile Picture
          </Text>
        </TouchableHighlight>
        <View style={{ flex: 8 }}>
          <>
            <Formik
              initialValues={{ name: "", Address: "" }}
              onSubmit={(values) => {
                updateProfile(values);
              }}
            >
              {({ handleChange, handleSubmit, setFieldTouched }) => (
                <>
                  <Text style={[styles.text]}>Full Name</Text>
                  <AppFormField
                    name="name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="contacts"
                    textContentType="name"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                    }}
                    styles={styles.AppTextInput}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text style={[styles.text]}>Date of birth</Text>
                      <TouchableOpacity
                        onPress={() => {
                          showDatepicker();
                        }}
                        style={styles.searchSection}
                      >
                        <Image
                          source={require("../../assets/images/Calendarr.png")}
                          style={{ marginLeft: 10 }}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Date of birth"
                          value={moment(date).format("DD/MM/YYYY")}
                          editable={false}
                          underlineColorAndroid="transparent"
                          onChangeText={(text) => {
                            setDOB(text);
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.text]}>Age</Text>
                      <View style={styles.searchSection}>
                        <TextInput
                          style={styles.input}
                          value={age}
                          keyboardType="number-pad"
                          onChangeText={(txt) => {
                            setAge(txt);
                          }}
                          underlineColorAndroid="transparent"
                        />
                      </View>
                    </View>
                  </View>

                  <Text style={[styles.text]}>Address</Text>
                  <AppFormField
                    name="Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("Address")}
                    onChangeText={(text) => {
                      setAddress(text);
                    }}
                    // placeholder="Address"
                    styles={styles.AppTextInput}
                    Address={true}
                  />
                  <Text style={[styles.text]}>Occupation</Text>

                  <AppFormField
                    name="Occupation"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("Occupation")}
                    onChangeText={(text) => {
                      setOccupation(text);
                    }}
                    styles={styles.AppTextInput}
                  />
                  <Text style={[styles.text]}>Gender</Text>
                  <DropDownField
                    data={["Select Gender", "Male", "Female", "Others"]}
                    Select={(e) => {
                      setGender(e);
                    }}
                  />
                  <Text style={[styles.text]}>Phone Number</Text>
                  <PhoneInput
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "#A4C8D5",
                      flex: 1,
                      width: "100%",
                      height: hp("8%"),
                    }}
                    textInputStyle={{
                      fontSize: RFValue(18),
                      padding: 0,
                      margin: 0,
                      textAlignVertical: "center",
                    }}
                    textContainerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "#A4C8D5",
                      marginLeft: "8%",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    codeTextStyle={{
                      fontSize: RFValue(16),
                      padding: 0,
                      margin: 0,
                    }}
                    countryPickerButtonStyle={{
                      borderColor: "#A4C8D5",
                      borderRadius: 8,
                      borderWidth: 1,
                      fontSize: RFValue(18),
                    }}
                    defaultValue={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    onChangeText={(text) => {
                      console.log("The number is ", text);
                      console.log("The type is ", typeof text);
                      setPhoneNumber(text);
                    }}
                    onChangeFormattedText={(text) => {
                      setFormatedPhoneNumber(text);
                    }}
                    withDarkTheme={false}
                    withShadow={false}
                  />
                  <View style={{ marginTop: "5%" }}>
                    <AppButton
                      title="Save & Continue"
                      onPress={() => {
                        updateProfile();
                      }}
                      background={false}
                      color={"primary"}
                    />
                  </View>
                </>
              )}
            </Formik>
          </>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: "#424242",
  },
  container: { flex: 1, padding: 10, paddingBottom: "5%" },

  AppTextInput: {
    borderWidth: 1,
    borderColor: "#A4C8D5",
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "transparent",
    color: "#A4C8D5",
    paddingVertical: "0.8%",
  },
  text: { fontSize: 13, fontWeight: "600", marginBottom: "1%" },
});

export default InformationScreen;
