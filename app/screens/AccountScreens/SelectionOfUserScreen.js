import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RadioButtonRN from "radio-buttons-react-native";
import AppText from "../../components/Text";
import colors from "../../config/colors";
import Screen from "../../components/Screen";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
const DATA = [
  { id: 1, label: "Client" },
  { id: 2, label: "Therapist" },
];
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../../utils/baseUrl";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../Firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
function SelectionOfUserScreen({ navigation, route }) {
  const [userType, setUserType] = useState(DATA[1]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    LoginFunction();
  }, []);
  const LoginFunction = async (values) => {
    setLoading(true);
    const credsSting = await AsyncStorage.getItem("creds");
    const creds = JSON.parse(credsSting);
    if (creds != null) {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, creds.email, creds.password)
        .then(() => {
          AsyncStorage.setItem(
            "creds",
            JSON.stringify({ email: creds.email, password: creds.password })
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
            if (doc.data().email == creds.email) {
              newData = { ...doc.data(), id: doc.id };
            }
          });
          console.log(creds.email);
          console.log(newData);
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
    } else {
      setLoading(false);
    }
  };

  return (
    <Screen style={styles.container}>
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
      <View style={{ width: "100%", flex: 1, justifyContent: "space-evenly" }}>
        <RadioButtonRN
          boxStyle={{
            flexDirection: "row-reverse",
            paddingVertical: 20,
            backgroundColor: "transparent",
          }}
          activeColor={colors.green}
          deactiveColor={"#a4c8d5"}
          textStyle={{ justifyContent: "flex-end", fontSize: 16 }}
          data={DATA}
          initial={1}
          selectedBtn={(e) => setUserType(e)}
          circleSize={18}
          icon={
            <MaterialCommunityIcons
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: 50,
              }}
              name="check"
              size={22}
              color={colors.primary}
            />
          }
        />
      </View>
      <TouchableOpacity
        style={{
          flex: 0.25,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          // backgroundColor: '#000',
        }}
        onPress={() => navigation.navigate("LoginOrSignUpScreen", { userType })}
      >
        <AppText
          style={{
            color: colors.dark,
            fontSize: 16,
            textDecorationLine: "underline",
          }}
        >
          Continue
        </AppText>
        <MaterialCommunityIcons
          name="arrow-right"
          size={16}
          color={colors.dark}
        />
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: "2%", paddingBottom: 3 },
});

export default SelectionOfUserScreen;
