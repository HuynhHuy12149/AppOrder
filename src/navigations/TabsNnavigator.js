import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  HomeScreen,
  NotificationScreen,
  SettingsScreen,
  SearchScreen,
} from "../screens/navigationScreen";
import {
  Animated,
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
const Tab = createBottomTabNavigator();
import plus from "../../assets/images/plus.png";
import { useNavigation } from "@react-navigation/native";
const TabsNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { height: Platform.OS == "android" ? 47 : 53 },
        }}
      >
        <Tab.Screen
          name={"Home"}
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: Platform.OS == "ios" ? 10 : 7,
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="home"
                  size={Platform.OS == "android" ? 18 : 18}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
                <Text style={{ fontSize: Platform.OS == "android" ? 12 : 12 }}>
                  Trang chủ
                </Text>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>

        <Tab.Screen
          name={"Search"}
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: Platform.OS == "ios" ? 10 : 7,
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="search"
                  size={Platform.OS == "android" ? 18 : 18}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
                <Text style={{ fontSize: Platform.OS == "android" ? 12 : 12 }}>
                  Tìm kiếm
                </Text>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          name={"ActionButton"}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={()=>{
                navigation.navigate("Empty")
              }}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: "red",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: Platform.OS == "android" ? 50 : 50,
                  }}
                >
                  <Image
                    source={plus}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </TouchableOpacity>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"Notifications"}
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: Platform.OS == "ios" ? 10 : 7,
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="bell"
                  size={Platform.OS == "android" ? 18 : 18}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
                <Text style={{ fontSize: Platform.OS == "android" ? 12 : 12 }}>
                  Thông báo
                </Text>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.12,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
        <Tab.Screen
          name={"Settings"}
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                  top: Platform.OS == "ios" ? 10 : 7,
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name="user-alt"
                  size={Platform.OS == "android" ? 18 : 18}
                  color={focused ? "red" : "gray"}
                ></FontAwesome5>
                <Text style={{ fontSize: Platform.OS == "android" ? 12 : 12 }}>
                  Cá nhân
                </Text>
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.2,
                useNativeDriver: true,
              }).start();
            },
          })}
        ></Tab.Screen>
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: "red",
          position: "absolute",
          bottom: Platform.OS == "android" ? 46 : 53,
          left: 12,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
};

export default TabsNavigator;
function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 20;
  return width / 5;
}
function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Rồng</Text>
    </View>
  );
}
