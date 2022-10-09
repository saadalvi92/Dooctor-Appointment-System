import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AppButton from "../../components/Button";
import AppFormField from "../../components/forms/FormField";
import AppText from "../../components/Text";
import colors from "../../config/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import Screen from "../../components/Screen";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../Firebase";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation, route }) {
  const [validEmail, setValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(email) === false) {
      setValidEmail(false);
      return false;
    }
    setValidEmail(true);
    return true;
  };
  const LoginFunction = async (values) => {
    setLoading(true);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        AsyncStorage.setItem(
          "creds",
          JSON.stringify({ email: values.email, password: values.password })
        );
        console.log("the login works");
      })
      .then(async () => {
        const db = getFirestore(app);
        const Users = collection(db, "Users");
        const snapShot = await getDocs(Users);
        if (snapShot.empty) {
          return;
        }
        let newData = {};
        snapShot.forEach((doc, index) => {
          if (doc.data().email == values.email) {
            newData = { ...doc.data(), id: doc.id };
          }
        });
        await AsyncStorage.setItem("user", JSON.stringify(newData));
        route.params.setUser({
          ...newData,
          state: null,
          province: newData.state,
        });
        route.params.setState(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }
        alert(error);
        console.error(error);
      });
  };

  return (
    <Screen style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
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
        <View
          style={{
            flex: 9.5,
            justifyContent: "center",
          }}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              console.log("The values are here", values);
              LoginFunction(values);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => (
              <>
                <Text style={styles.text}>Email</Text>
                <AppFormField
                  name="email"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  // placeholder="email"
                  textContentType="emailAddress"
                  onChangeText={(text) => {
                    validateEmail(text);
                    setFieldValue("email", text);
                    setEmail(text);
                  }}
                  validEmail={validEmail}
                  styles={styles.AppTextInput}
                  width={wp("85%")}
                />
                <Text style={styles.text}>Password</Text>
                <AppFormField
                  name="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  onBlur={() => setFieldTouched("password")}
                  onChangeText={handleChange("password")}
                  // placeholder="password"
                  textContentType="password"
                  eye
                  styles={styles.AppTextInput}
                  width={wp("85%")}
                />

                <View style={{ alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      width: wp("85%"),
                      height: hp("7%"),
                      backgroundColor: "#40AE49",
                      borderRadius: 4,
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: "2%",
                      marginBottom: "10%",
                    }}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Log In
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        <View
          style={{
            flex: 1 / 2,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: "10%",
          }}
        >
          <Text style={{ fontSize: RFValue("16"), color: "#000" }}>
            Don't have an account?{" "}
            <AppText
              onPress={() =>
                navigation.navigate("SignUpScreen", { data: route.params.data })
              }
              style={{
                color: colors.black,
                fontSize: RFValue(16),
                fontWeight: "bold",
              }}
            >
              Sign Up
            </AppText>
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
  AppTextInput: {
    borderWidth: 1,
    borderColor: "#a4c8d5",
    flexDirection: "row",
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "transparent",
    color: "#A4C8D5",
    alignSelf: "center",
  },
  text: {
    fontSize: RFValue(14),
    fontWeight: "600",
    marginBottom: "1%",
    marginLeft: "6%",
  },
});

export default LoginScreen;
