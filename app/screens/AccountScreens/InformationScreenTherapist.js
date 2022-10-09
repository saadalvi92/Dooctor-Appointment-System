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
  Platform,
} from "react-native";
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import PhoneInput from "react-native-phone-number-input";
import colors from "../../config/colors";
import AppButton from "../../components/Button";
import { Formik } from "formik";
import AppFormField from "../../components/forms/FormField";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Yup from "yup";
import DropDownField from "../../components/forms/DropDownField";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
import axios from "axios";
import { baseUrl, imageUrl } from "../../utils/baseUrl";
import * as Location from "expo-location";
import Spinner from "react-native-loading-spinner-overlay";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore/lite";
import { app } from "../../../Firebase";
import * as ImagePicker from "expo-image-picker";
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
function InformationScreenTherapist({ navigation, route }) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState({});
  const [email, setEmail] = useState(route.params.email);
  const [designation, setDesignation] = useState("");
  const [name, setName] = useState(route.params.name);
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [practice, setPractice] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [credentials, setCredentials] = useState("");
  const [gender, setGender] = useState("");
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lat, setLat] = useState("31.123123");
  const [lng, setLng] = useState("72.123");
  const [fee, setFee] = useState("100");
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState("");
  const [malPractice, setMalPractice] = useState("");
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

  const updateProfile = async (values) => {
    const payload = {
      name: name,
      email: email,
      designation: designation,
      city: city,
      state: province,
      zip_code: zipCode,
      practice: practice,
      practice: practice,
      location: address,
      phone: phoneNumber,
      phone_code: formatedPhoneNumber.replace(phoneNumber, ""),
      gender: gender,
      lng: lng,
      lat: lat,
      fee: fee,
      image: image.uri,
      credentials: credentials,
      insurance: malPractice,
      license: license,
      type: route.params.data.userType.label,
      email: route.params.email,
      password: route.params.password,
      Unavailability: [],
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
          navigation.navigate("LoginScreen", { data: route.params.data });
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }
        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }
        alert(error);
        console.error(error);
      });
  };

  const updateImage = async () => {
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
      <Screen style={styles.container} details={true}>
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
        <View style={{ flex: 2, justifyContent: "center" }}>
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
          <View>
            <AppText
              style={{
                fontSize: RFValue(24),
                fontWeight: "bold",
                color: colors.primary,
              }}
            >
              Your information will be
            </AppText>
            <AppText
              style={{
                fontSize: RFValue(24),
                fontWeight: "bold",
                color: colors.primary,
                paddingBottom: widthPercentageToDP("8%"),
              }}
            >
              shared with the Practice
            </AppText>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          {image.uri ? (
            <Image
              style={{
                height: 120,
                width: 120,
                margin: 10,
                alignSelf: "center",
              }}
              source={{ uri: `${image.uri}` }}
            />
          ) : (
            <Image
              style={{
                height: 113,
                width: 114,
                margin: 10,
                alignSelf: "center",
                borderRadius: 4,
              }}
              source={require("../../assets/images/User.png")}
            />
          )}
          <View
            style={{
              flex: 1,
              width: "50%",
              height: "100%",
            }}
          >
            <TouchableHighlight
              onPress={() => {
                updateImage();
              }}
              style={{
                backgroundColor: colors.green,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                alignSelf: "center",
                paddingHorizontal: "10%",
                paddingVertical: "5%",
                marginTop: "10%",
                marginBottom: "1%",
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(13),
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Uplaod Your Profile Picture
              </Text>
            </TouchableHighlight>
            <Text
              style={{
                color: "#304659",
                fontSize: RFValue(12),
                marginVertical: "2%",
                marginLeft: "5%",
              }}
            >
              Bio
            </Text>

            <View style={styles.searchSection}>
              <Text style={{ fontSize: RFValue(10) }}>
                Your avatar should is a friendly
              </Text>
              <Text style={{ fontSize: RFValue(10) }}>
                and inviting head shot. Clearly
              </Text>
              <Text style={{ fontSize: RFValue(10) }}>
                indentifiable as you.
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: "5%" }}>
          <>
            <Formik
              onSubmit={(values) => {
                console.log("the values are", values);
              }}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, setFieldTouched }) => (
                <>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Full Name
                      </Text>
                      <AppFormField
                        name="FullName"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        textContentType="name"
                        styles={styles.AppTextInput}
                        value={name}
                        onChangeText={setName}
                      />
                    </View>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Email
                      </Text>
                      <AppFormField
                        name="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={email}
                        onChangeText={setEmail}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Designation
                      </Text>
                      <AppFormField
                        name="Designation"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={designation}
                        onChangeText={setDesignation}
                      />
                    </View>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        City
                      </Text>
                      <AppFormField
                        name="City"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={city}
                        onChangeText={setCity}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        State
                      </Text>
                      <AppFormField
                        name="Stat"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={province}
                        onChangeText={setProvince}
                      />
                    </View>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Zip Code
                      </Text>
                      <AppFormField
                        name="ZipCode"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={zipCode}
                        onChangeText={setZipCode}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Fee
                      </Text>
                      <AppFormField
                        name="Fee"
                        autoCapitalize="none"
                        autoCorrect={false}
                        styles={styles.AppTextInput}
                        value={fee}
                        onChangeText={setFee}
                        keyboardType="number-pad"
                        price={true}
                      />
                    </View>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Practice
                      </Text>
                      <DropDownField
                        data={[
                          "Self Employed",
                          "Employed",
                          "Student",
                          "Others",
                        ]}
                        Select={(e) => {
                          console.log(e);
                          handleChange("Practice", e);
                          setPractice(e);
                        }}
                      />
                    </View>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Credentials
                      </Text>
                      <AppFormField
                        name="Credentials"
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="contacts"
                        styles={styles.AppTextInput}
                        value={credentials}
                        onChangeText={setCredentials}
                      />
                    </View>
                    <View style={{ flex: 1, marginRight: "2%" }}>
                      <Text
                        style={{ fontSize: RFValue(13), fontWeight: "500" }}
                      >
                        Gender
                      </Text>
                      <DropDownField
                        data={["Male", "Female", "Others"]}
                        value={gender}
                        Select={(e) => {
                          console.log(e);
                          setGender(e);
                          handleChange("Gender", e);
                        }}
                      />
                    </View>
                  </View>
                  <Text style={{ fontSize: RFValue(13), fontWeight: "500" }}>
                    Address
                  </Text>
                  <AppFormField
                    name="Address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("Address")}
                    styles={styles.AppTextInput}
                    Address={true}
                    value={address}
                    onChangeText={setAddress}
                  />
                  <Text style={{ fontSize: RFValue(13), fontWeight: "500" }}>
                    Mobile Phone
                  </Text>
                  <PhoneInput
                    containerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "#A4C8D5",
                      flex: 1,
                      width: "100%",
                      height: heightPercentageToDP("7%"),
                    }}
                    textInputStyle={{
                      fontSize: RFValue(15),
                      padding: 0,
                      textAlignVertical: "center",
                      paddingTop: 5,
                    }}
                    textContainerStyle={{
                      backgroundColor: "transparent",
                      borderColor: "#A4C8D5",
                      marginLeft: "8%",
                      borderRadius: 8,
                      borderWidth: 1,
                    }}
                    codeTextStyle={{
                      fontSize: RFValue(15),
                    }}
                    countryPickerButtonStyle={{
                      borderColor: "#A4C8D5",
                      borderRadius: 8,
                      borderWidth: 1,
                      fontSize: RFValue(18),
                    }}
                    // defaultValue={phoneNumber}
                    initialValue={phoneNumber}
                    // value={phoneNumber}
                    defaultCode="US"
                    layout="first"
                    onChangeText={(text) => {
                      console.log("The number is ", text);
                      console.log("The type is ", typeof text);
                      setPhoneNumber(text);
                      // setValue(text);
                      handleChange("phoneNumber", text);
                    }}
                    onChangeFormattedText={(text) => {
                      handleChange("formatedPhoneNumber", text);
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
    marginBottom: 20,
    marginLeft: "5%",
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
    backgroundColor: "#fff",
    color: "#424242",
  },
  inputBio: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: "#424242",
    height: "100%",
  },
  container: { flex: 1, padding: 10 },
  back_btn: {
    marginVertical: 20,
    width: 50,
    height: 50,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,
    backgroundColor: "#fff",
    elevation: 3,
  },
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
});

export default InformationScreenTherapist;
