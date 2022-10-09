import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, ScrollView } from "react-native";
import Header from "../components/Header";
import Screen from "../components/Screen";
import SearchField from "../components/SearchField";
import ListingTherapist from "../components/ListingTherapist";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import colors from "../config/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";
import { app } from "../../Firebase";
function TherapistListingScreen(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const db = getFirestore(app);
    const Users = collection(db, "Users");
    const snapShot = await getDocs(Users);
    if (snapShot.empty) {
      setLoading(false);
      return;
    }
    let newData = [];
    snapShot.forEach((doc, index) => {
      if (doc.data().type == "Therapist") {
        newData.push({
          id: doc.id,
          name: doc.data().name,
          designation: doc.data().type,
          image: doc.data().image,
          fee: doc.data().fee,
          distance: doc.data().distance,
          rating:
            doc.data().avg_rating == null || doc.data().avg_rating == undefined
              ? 5
              : doc.data().avg_rating,
          reviews: 0,
          location: doc.data().location,
          email: doc.data().email,
          age: doc.data().age,
          lng: doc.data().lng,
          lat: doc.data().lat,
          unAvailability: doc.data().Unavailability,
        });
      }
    });
    setData(newData);
    setLoading(false);
  };
  return (
    <Screen style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Header />
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
        <SearchField
          navigation={props.navigation}
          TouchNavigate={false}
          search={(txt) => {
            setSearch(txt);
            getData();
          }}
        />
        <FlatList
          style={styles.description}
          data={data}
          key={(item) => {
            item.index;
          }}
          renderItem={({ item }) => (
            <ListingTherapist
              goto={() => {
                props.navigation.navigate("AppointmentScreen", {
                  isFocus: true,
                  data: item,
                });
              }}
              details={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    </Screen>
  );
}

export default TherapistListingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 3,
  },
  backContainer: {
    marginVertical: 25,
  },
  profileCard: {
    height: hp("20%"),
    flexDirection: "row",
  },
});
