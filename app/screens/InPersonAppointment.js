import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import SearchField from "../components/SearchField";
import AppointmentsCard from "../components/AppointmentsCard";
import Screen from "../components/Screen";
import Modal from "../components/Modal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import colors from "../config/colors";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { app } from "../../Firebase";
function InPersonAppointment(props) {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [session, setSession] = useState({});
  const [refresh, setRefresh] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh, isFocused]);
  const getData = async () => {
    const defaultuser = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(defaultuser);
    setUser(currentUser);
    if (currentUser.type == "Therapist") {
      const db = getFirestore(app);
      const col = collection(db, "Bookings");
      const col2 = collection(db, "Users");
      const snapShotUsers = await getDocs(col2);
      if (snapShotUsers.empty) {
        setLoading(false);
        return;
      }
      let DoctorsData = [];
      snapShotUsers.forEach((doc, index) => {
        if (doc.data().type != "Therapist") {
          DoctorsData.push({ ...doc.data(), id: doc.id });
        }
      });
      const snapShot = await getDocs(col);
      if (snapShot.empty) {
        setLoading(false);
        return;
      }
      let newData = [];
      await snapShot.forEach((doc, index) => {
        if (
          doc.data().doc_id == currentUser.id &&
          doc.data().type == "clinic"
        ) {
          DoctorsData.map((doctor, doc_index) => {
            if (doctor.id == doc.data().client_id) {
              newData.push({
                ...doc.data(),
                id: doc.id,
                name: doctor.name,
                designation: "Therapist",
                doc_id: doctor.id,
                gender: doctor.gender,
                location: doctor.location,
                image: doctor.image,
              });
            }
          });
        }
      });
      setData(newData);
      setFilteredData(newData);
      setRefreshing(false);

      setLoading(false);
    } else {
      const db = getFirestore(app);
      const col = collection(db, "Bookings");
      const col2 = collection(db, "Users");
      const snapShotUsers = await getDocs(col2);
      if (snapShotUsers.empty) {
        setLoading(false);
        return;
      }
      let DoctorsData = [];
      snapShotUsers.forEach((doc, index) => {
        if (doc.data().type == "Therapist") {
          DoctorsData.push({ ...doc.data(), id: doc.id });
        }
      });
      const snapShot = await getDocs(col);
      if (snapShot.empty) {
        setLoading(false);
        return;
      }
      let newData = [];
      await snapShot.forEach((doc, index) => {
        if (
          doc.data().client_id == currentUser.id &&
          doc.data().type == "clinic"
        ) {
          DoctorsData.map((doctor, doc_index) => {
            if (doctor.id == doc.data().doc_id) {
              newData.push({
                ...doc.data(),
                id: doc.id,
                name: doctor.name,
                designation: "Therapist",
                doc_id: doctor.id,
                gender: doctor.gender,
                location: doctor.location,
                image: doctor.image,
              });
            }
          });
        }
      });
      setData(newData);
      setFilteredData(newData);
      setRefreshing(false);

      setLoading(false);
    }
  };
  const SearchFilter = (txt) => {
    if (txt) {
      const newData = data.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(txt);
    } else {
      setFilteredData(data);
      setSearch(txt);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setRefresh(!refresh);
  };
  return (
    <Screen style={styles.container}>
      <SearchField
        navigation={props.navigation}
        TouchNavigate={false}
        showMap={false}
        search={(txt) => {
          SearchFilter(txt);
        }}
        Title="Search Appointments"
      />
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
      <FlatList
        style={styles.description}
        data={filteredData}
        key={(item) => {
          item.index;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <AppointmentsCard
            goto={() => {
              console.log("the data is here", item);
            }}
            details={item}
            color="#fff"
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </Screen>
  );
}

export default InPersonAppointment;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
