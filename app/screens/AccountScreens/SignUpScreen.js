import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Screen from "../../components/Screen";
import AppText from "../../components/Text";
import { fontSize } from "../../config/fonts";
import colors from "../../config/colors";
import AppButton from "../../components/Button";
import { Formik } from "formik";
import AppFormField from "../../components/forms/FormField";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import {
  addDoc,
  getFirestore,
  collection,
  CollectionReference,
} from "firebase/firestore/lite";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../../Firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  name: Yup.string().required(),
  password: Yup.string().required().min(4).label("Password"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Confirm Password is required"),
});

function SignUpScreen({ navigation: { navigate, goBack }, route }) {
  return (
    <Screen style={styles.container} top={true}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Header />
        </View>
        {console.log(route.params.data.userType)}
        {/* Form Fields */}
        <View style={{ flex: 8 }}>
          <Form navigate={navigate} route={route} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const Form = ({ navigate, route }) => {
  const [loading, setLoading] = useState(false);
  const signUp = (values) => {
    setLoading(true);
    if (route.params.data.userType.label == "Client") {
      navigate("InformationScreen", {
        email: values.email,
        password: values.password,
        name: values.name,
        confirmPassword: values.passwordConfirm,
        data: route.params.data,
      });
    } else if (route.params.data.userType.label == "Therapist") {
      navigate("InformationScreenTherapist", {
        email: values.email,
        password: values.password,
        name: values.name,
        data: route.params.data,
        confirmPassword: values.passwordConfirm,
      });
    }
  };
  return (
    <View style={{ justifyContent: "center" }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordConfirm: "",
          name: "",
        }}
        onSubmit={(values) => signUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, setFieldTouched }) => (
          <>
            <Text style={styles.text}>Name</Text>
            <AppFormField
              name="name"
              autoCapitalize="none"
              autoCorrect={false}
              icon="contacts"
              // placeholder="Name"
              textContentType="name"
              styles={styles.AppTextInput}
              width={wp("85%")}
            />
            <Text style={styles.text}>Email</Text>
            <AppFormField
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              // placeholder="email"
              textContentType="emailAddress"
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
            {/* <AppText>Confirm Password</AppText> */}
            <Text style={styles.text}>Confirm Password</Text>
            <AppFormField
              name="passwordConfirm"
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              onBlur={() => setFieldTouched("passwordConfirm")}
              onChangeText={handleChange("passwordConfirm")}
              // placeholder="password"
              textContentType="password"
              eye
              styles={styles.AppTextInput}
              width={wp("85%")}
            />
            <AppButton title="Sign Up" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <View
        style={{
          marginVertical: 20,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <AppText style={{ textAlign: "center", fontSize: 14 }}>
          Already have an account?{" "}
        </AppText>
        <TouchableOpacity
          onPress={() => {
            navigate("LoginScreen", { data: route.params.data });
          }}
        >
          <AppText
            style={{ color: colors.dark, fontSize: 14, fontWeight: "bold" }}
          >
            Log In
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Header = () => (
  <View>
    <AppText
      style={{
        fontSize: 24,
        fontWeight: "700",
        color: colors.dark,
        paddingBottom: 5,
      }}
    >
      Welcome to TherAlign!
    </AppText>
    <AppText style={{ paddingBottom: 20, fontSize: 13 }}>
      Join 1M+ top Therapist today, for free!
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },

  AppTextInput: {
    borderWidth: 1,
    borderColor: "#a4c8d5",
    flexDirection: "row",
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: "transparent",
    color: "#A4C8D5",
    paddingVertical: "0.8%",
    alignSelf: "center",
  },
  text: {
    fontSize: RFValue(14),
    fontWeight: "500",
    color: "#000",
    marginBottom: "1%",
    marginLeft: "4%",
  },
});

export default SignUpScreen;
