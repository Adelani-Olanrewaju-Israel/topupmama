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
import Images from "../utility/Images";
import { useDispatch } from "react-redux";
import { getweather } from "../store/reducers/WeatherReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Home = () => {
  const dispatch = useDispatch();
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
  const [location, setLocation] = useState("Nigeria, Abeokuta");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [favouriteData, setFavouriteData] = useState([]);
  const [showRFavourite, setShowRFavourite] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // getdata();
    localfavour();
    localweather();
  }, []);

  useEffect(() => {
    if (showRFavourite === false) {
      setData(weather);
    } else if (showRFavourite === true) {
      setData(favouriteData);
    }
  }, [showRFavourite]);

  const handleRenderInput = () => {
    setRenderInput(!renderInput);
  };

  const handleModal = (params) => {
    setShowModal(params);
  };

  const handleShowRFavourite = () => {
    setShowRFavourite(!showRFavourite);
  };

  const getdata = async () => {
    let data = {
      lat: 38.5,
      long: -78.5,
      hours: 48,
    };
    let res = await dispatch(getweather(data));
    setWeather(res.payload.data);
    // console.log("res from Internet: ", res);
    if (res.payload.data === null) {
      localweather();
    }
  };

  const localweather = async () => {
    let data = await AsyncStorage.getItem("weather");
    let res = JSON.parse(data);
    setWeather(res);
    // console.log("res Local: ", res);
  };

  const localfavour = async () => {
    let data = await AsyncStorage.getItem("favour");
    let res = JSON.parse(data);
    setFavouriteData(res);
    // console.log("res Local Favour: ", res);
  };

  const savefavourrite = async (data) => {
    // let data2 = setFavouriteData([...favouriteData, data]);
    let data2 = [...favouriteData, data];
    AsyncStorage.setItem("favour", JSON.stringify(data2));
    console.log("Saving......................................");
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

        <TouchableOpacity
          onPress={() => {
            handleShowRFavourite();
          }}
        >
          <View style={styles.iconView}>
            <FontAwesome
              name="heart"
              size={18}
              color={showRFavourite ? "#240135" : "white"}
            />
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
        <EvilIcons name="location" size={15} color="black" />

        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                handleModal(true);
                setModalData(item);
              }}
              key={index}
              onLongPress={() => {
                console.log("Favourite: ", item);
                savefavourrite(item);
              }}
            >
              <View style={styles.weather}>
                <View style={styles.tempView}>
                <Text style={styles.temp}>{item.temp}° </Text>
                  {/* <View style={styles.degree}>
                    <Text style={styles.temp}>{item.temp} </Text>
                    <Entypo name="circle" size={10} color="black" />
                  </View> */}
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
                      <Text style={styles.head}>{item.wind_spd}</Text>
                    </View>
                    <View style={styles.eachView}>
                      <Entypo name="direction" size={15} color="white" />
                      <Text style={styles.subhead}>Wind Dir </Text>
                      <Text style={styles.head}>{item.wind_cdir}</Text>
                    </View>
                    <View style={styles.eachView}>
                      <MaterialCommunityIcons
                        name="car-brake-low-pressure"
                        size={15}
                        color="white"
                      />
                      <Text style={styles.subhead}>Pressure</Text>
                      <Text style={styles.head}>{item.pres}</Text>
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
      <Modal
        animatedtype="slide"
        visible={showModal}
        transparent={true}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.bigmodal}>
          <View style={styles.modal}>
            {/* <Text>{modalData.datetime}</Text> */}
            <View style={styles.modalheader}>
              <Text style={styles.modalHead2}>
                {modalData.weather.description}
              </Text>
              <Text style={styles.modalHead}>{modalData.temp}° </Text>
              <Text style={styles.modalHead2}>{modalData.datetime}</Text>
            </View>

            <View style={styles.segment}>
              <View style={styles.segmentleft}>
                <Text style={styles.sidesegment}>Wind : </Text>
              </View>

              <View style={styles.windItemView}>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Current Dir.</Text>
                  <Text style={styles.windvalue}>{modalData.wind_cdir}</Text>
                </View>

                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Current Dir. Full</Text>
                  <Text style={styles.windvalue}>
                    {modalData.wind_cdir_full}
                  </Text>
                </View>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Wind Dir.</Text>
                  <Text style={styles.windvalue}>{modalData.wind_dir}</Text>
                </View>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Wind Speed</Text>
                  <Text style={styles.windvalue}>{modalData.wind_spd}</Text>
                </View>
              </View>
            </View>

            <View style={styles.segment}>
              <View style={styles.segmentleft}>
                <Text style={styles.sidesegment}>Atmosph. : </Text>
              </View>

              <View style={styles.windItemView}>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Pressure</Text>
                  <Text style={styles.windvalue}>{modalData.pres}</Text>
                </View>

                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Ozone</Text>
                  <Text style={styles.windvalue}>{modalData.ozone}</Text>
                </View>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Snow</Text>
                  <Text style={styles.windvalue}>{modalData.snow}</Text>
                </View>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Dew Point</Text>
                  <Text style={styles.windvalue}>{modalData.dewpt}</Text>
                </View>
              </View>
            </View>

            <View style={styles.segment}>
              <View style={styles.segmentleft}>
                <Text style={styles.sidesegment}>Clouds : </Text>
              </View>

              <View style={styles.windItemView}>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Current. Clouds</Text>
                  <Text style={styles.windvalue}>{modalData.clouds}</Text>
                </View>

                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Clouds Mid.</Text>
                  <Text style={styles.windvalue}>{modalData.clouds_mid}</Text>
                </View>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Clouds Low</Text>
                  <Text style={styles.windvalue}>{modalData.clouds_low}</Text>
                </View>
                <View style={styles.eachWind}>
                  <Text style={styles.windhead}>Clouns High</Text>
                  <Text style={styles.windvalue}>{modalData.clouds_hi}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground source={Images.weather} style={styles.container}>
      {renderBar()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderWeather()}
      </ScrollView>
      {modalData != null ? renderModal() : null}
    </ImageBackground>
  );
};

export default Home;

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
    color: "black",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  tempView: {
    justifyContent: "space-between",
    width: "50%",
  },
  temp: {
    fontSize: 60,
    fontWeight: "600",
  },
  weatherDesc: {
    color: "#240135",
  },
  weather: {
    backgroundColor: "rgba(243, 169, 169, 0.5)",
    marginVertical: 10,
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
  head: {
    color: "#240135",
  },
  modal: {
    padding: 15,
    flex: 1,
    marginTop: 250,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalheader: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalHead: {
    fontSize: 100,
    fontWeight: "600",
    color: "rgba(36, 1, 53, 0.82)",
  },
  modalHead2: {
    fontSize: 20,
    fontWeight: "200",
  },
  segment: {
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(36, 1, 53, 0.82)",
    padding: 10,
  },
  windItemView: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  segmentleft: {
    width: "20%",
  },
  eachWind: {
    alignItems: "center",
    justifyContent: "center",
  },
  windhead: {
    fontSize: 11,
    fontWeight: "300",
    color: "rgba(36, 1, 53, 0.82)",
  },
  windvalue: {
    fontSize: 11,
  },
  sidesegment: {
    fontSize: 12,
  },
  bigmodal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  degree: {
    flexDirection: "row",
  },
});
