import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import api, { key } from "../../services/api";
import { LinearGradient } from "expo-linear-gradient";
import Conditions from "../../components/Conditions";

export default function Search() {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState(['#6be4ff', '#00bfea']);

  
  async function handleSearch() {
    // weather?key=3b2c8e5d&city_name=Campinas,SP
    const response = await api.get(`/weather?key=${key}&city_name=${input}`);
    // console.log(response.data);
    if(response.data.results.currently === 'noite'){
      setBackground(['#0353A4', '#001845']);
    }

    if (response.data.by === "default") {
      setError("Humm, cidade não encontrada!");
      setInput("");
      setCity(null);
      Keyboard.dismiss();
      return;
    }
    setCity(response.data);
    setInput("");
    Keyboard.dismiss();
  }

  if (city) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather name="chevron-left" size={32} color="#000" />
          <Text style={{ fontSize: 20 }}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.box}>
          <TextInput
            value={input}
            onChangeText={(valor) => setInput(valor)}
            placeholder="EX: Campinas, SP"
            style={styles.input}
          />

          <TouchableOpacity style={styles.icon} onPress={handleSearch}>
            <Feather name="search" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

        <LinearGradient style={styles.header} colors={["#6be4ff", "#00bfea"]}>
          <Text style={styles.date}>{city.results.date}</Text>
          <Text style={styles.city}>{city.results.city_name}</Text>

          <View>
            <Text style={styles.temp}>{city.results.temp}°</Text>
          </View>

          <Conditions weather={city} />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Feather name="chevron-left" size={32} color="#000" />
        <Text style={{ fontSize: 20 }}>Voltar</Text>
      </TouchableOpacity>

      <View style={styles.box}>
        <TextInput
          value={input}
          onChangeText={(valor) => setInput(valor)}
          placeholder="EX: Campinas, SP"
          style={styles.input}
        />

        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <Feather name="search" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {error && <Text style={{ marginTop: 25, fontSize: 18 }}>{error}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "10%",
  },
  button: {
    flexDirection: "row",
    marginLeft: 15,
    alignSelf: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  box: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#00bfea",
    width: "90%",
    height: 50,
    borderRadius: 8,
  },
  input: {
    width: "85%",
    height: 50,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
  },
  icon: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  header: {
    marginTop: "5%",
    width: "90%",
    paddingTop: "5%",
    paddingBottom: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius:8,
  },
  date: {
    color: "#FFF",
    fontSize:16,
  },
  city:{
    fontSize:20,
    fontWeight:'bold',
    color: "#FFF",
  },
  temp: {
    color: "#FFF",
    fontSize:50,
    fontWeight:'bold',
  }
});
