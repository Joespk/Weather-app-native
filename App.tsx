import axios from "axios";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import WeatherDTO from "./src/type/WeatherDTO";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState<string>("Bangkok");
  const apiKey = "";
  const [city, setCity] = useState<WeatherDTO | null>(null);

  const handleSearchPress = () => {
    setName(searchText);
    setSearchText(""); // ล้างค่าใน TextInput หลังจากค้นหา
  };
  const fetchData = async (cityName: string) => {
    try {
      const response = await axios.get<WeatherDTO>(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      setCity(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(name); // เรียก fetchData เมื่อ Component ถูก render ครั้งแรก
  }, [name]);

  console.log(city);

  const convertTemp = (k: any) => {
    return (k - 273).toFixed();
  };
  return (
    <ImageBackground
      source={require("./assets/home.png")}
      style={styles.background}
    >
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity onPress={handleSearchPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.City}>{city?.name}</Text>
        <Text style={styles.Temp}>
          {convertTemp(city?.main && city.main.temp)}&deg;C
        </Text>
        {city?.weather.map((city) => (
          <Text style={styles.description} key={city.id}>
            {city.description}
          </Text>
        ))}
        <View style={styles.Highlow}>
          <Text style={styles.H}>
            H:{convertTemp(city?.main && city.main.temp_max)}&deg;C
          </Text>
          <Text style={styles.H}>
            L:{convertTemp(city?.main && city.main.temp_min)}&deg;C
          </Text>
        </View>
      </View>
      <Image source={require("./assets/House.png")} style={styles.house} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 390,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // หรือ 'contain' ตามความต้องการ
    justifyContent: "center",
    alignItems: "center",
  },
  house: {
    width: 390,
    height: 390,
    alignItems: "flex-end", // หรือจะใช้ justifyContent: 'flex-end'
    padding: 20,
  },
  City: {
    color: "#FFF", // ใช้สีที่คุณต้องการ
    textAlign: "center",
    fontFamily: "SF Pro Display",
    fontSize: 34,
    fontStyle: "normal",
    fontWeight: "400",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: "#48319D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
  },
  Temp: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "SF Pro Display",
    fontSize: 96,
    fontStyle: "normal",
    fontWeight: "200",
  },
  description: {
    color: "rgba(235, 235, 245, 0.60)",
    textAlign: "center",
    fontFamily: "SF Pro Display",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.38,
  },
  Highlow: {
    flexDirection: "row", // หรือ 'column' ตามที่ต้องการ
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  H: {
    color: "rgba(235, 235, 245, 0.60)",
    fontFamily: "SF Pro Display",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0.38,
  },
});
