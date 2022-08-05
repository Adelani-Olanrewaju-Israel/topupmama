import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Modal,
} from "react-native";
import {
  FontAwesome,
  EvilIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import moment from "moment";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [renderInput, setRenderInput] = useState(false);
  const [weather, setWeather] = useState([
    {
      wind_cdir: "SSE",
      rh: 70,
      pod: "n",
      timestamp_utc: "2022-08-05T08:00:00",
      pres: 945.5,
      solar_rad: 0,
      ozone: 293,
      weather: {
        icon: "c02n",
        code: 802,
        description: "Scattered clouds",
      },
      wind_gust_spd: 3.87,
      timestamp_local: "2022-08-05T04:00:00",
      snow_depth: 0,
      clouds: 25,
      ts: 1659686400,
      wind_spd: 3.03,
      pop: 0,
      wind_cdir_full: "south-southeast",
      slp: 1019.5,
      dni: 0,
      dewpt: 15.3,
      snow: 0,
      uv: 0,
      wind_dir: 161,
      clouds_hi: 100,
      precip: 0,
      vis: 23.392,
      dhi: 0,
      app_temp: 20.9,
      datetime: "2022-08-05:08",
      temp: 21,
      ghi: 0,
      clouds_mid: 3,
      clouds_low: 0,
    },
  ]);
  const [location, setLocation] = useState("Abeokuta");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleRenderInput = () => {
    setRenderInput(!renderInput);
  };

  const handleModal = (params) => {
    setShowModal(params);
  };

  const renderBar = () => {
    return (
      <View style={styles.bar}>
        {renderInput ? renderSearchField() : null}

        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            handleRenderInput();
          }}
        >
          <View style={styles.iconView}>
            <FontAwesome name="search" size={18} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.iconView}>
            <FontAwesome name="heart" size={18} color="white" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.iconView}>
            <FontAwesome name="globe" size={18} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchField = () => {
    return (
      <>
        <TextInput style={styles.searchinput} />
      </>
    );
  };

  const renderWeather = () => {
    return (
      <View>
        <Text style={styles.location}>{location}</Text>
        <EvilIcons name="location" size={15} color="white" />

        {weather.map((item, index) => {
          return (
            <TouchableOpacity onPress={() => {
              handleModal(true);
              setModalData(item);
            }}>
              <View key={index} style={styles.weather}>
                <View style={styles.tempView}>
                  <Text style={styles.temp}>{item.temp} </Text>
                  <Text style={styles.weatherDesc}>
                    {item.weather.description}
                  </Text>
                </View>

                <View style={styles.tempViewLeft}>
                  {/* <Text style={styles.date}>
                    {moment().format(item.datetime)}
                  </Text> */}
                  <View style={styles.subView}>
                    <View style={styles.eachView}>
                      <FontAwesome5 name="wind" size={15} color="white" />
                      <Text style={styles.subhead}>Wind Speed </Text>
                      <Text>{item.wind_spd}</Text>
                    </View>
                    <View style={styles.eachView}>
                      <Entypo name="direction" size={15} color="white" />
                      <Text style={styles.subhead}>Wind Dir </Text>
                      <Text>{item.wind_cdir}</Text>
                    </View>
                    <View style={styles.eachView}>
                      <MaterialCommunityIcons
                        name="car-brake-low-pressure"
                        size={15}
                        color="white"
                      />
                      <Text style={styles.subhead}>Pressure</Text>
                      <Text>{item.pres}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal animatedtype="slide" visible={showModal} transparent={true}>
        <View>
            <Text>{modalData.datetime}</Text>
          </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderBar()}
      <ScrollView showsVerticalScrollIndicator={false}>{renderWeather()}</ScrollView>
      {renderModal()}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003040",
    paddingHorizontal: 15,
  },
  bar: {
    borderRadius: 10,
    marginTop: 40,
    height: 45,
    paddingHorizontal: 25,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "rgba(192,192,192, 0.3)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  iconView: {
    marginLeft: 10,
  },
  searchinput: {
    width: "70%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
  },
  location: {
    color: "white",
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
  },
  tempView: {
    justifyContent: "space-between",
    width: "50%",
  },
  temp: {
    fontSize: 80,
    fontWeight: "800",
  },
  weatherDesc: {
    color: "white",
  },
  weather: {
    backgroundColor: "rgba(192,192,192, 0.1)",
    marginVertical: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  tempViewLeft: {
    width: "50%",
  },
  subView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  eachView: {
    alignItems: "center",
    justifyContent: "center",
  },
  subhead: {
    fontSize: 10,
    marginVertical: 5,
    fontWeight: "500",
  },
  favIcon: {
    marginTop: 15,
  },
});
