import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tab } from './components/NavTab';
import Login from './page/Login';
import Home from './page/Home';
import SignUp from './page/SignUp';
import Config from './page/Config';
import Message from './page/Message'
import Group from './page/Group';
import homeIc from './assets/ic_home.png'
import groupIc from './assets/ic_group.png'
import msgIc from './assets/ic_msg.png'
import userIc from './assets/ic_user.png'

const Stack = createNativeStackNavigator()
// yellow = F7C04A // birudark = 3E54AC // bg = F5F5F5
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Signup"
            component={SignUp}
            options={{
              headerShown: false,
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="HomeTab"
            component={HomeTabs}
            options={{
              headerShown: false,
              animation: 'fade'
            }}
          />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}
// ketika user sudah login
const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="User"
      screenOptions={{
        tabBarActiveTintColor: '#3E54AC',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500'
        },
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: 'rgb(200,200,200)',
        tabBarStyle: {
          padding: 6,
          height: 56,
          paddingBottom: 8,
          position: 'absolute',
        }
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor, focused }) => (
            <Image source={homeIc} style={focused ? { ...styles.icon, ...styles.activeIc } : styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name="Pesan"
        component={Message}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Image source={msgIc} style={focused ? { ...styles.icon, ...styles.activeIc } : styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarIcon: ({ tintColor, focused }) => (
            <Image source={groupIc} style={focused ? { ...styles.icon, ...styles.activeIc } : styles.icon} />
          )
        }}
      />
      <Tab.Screen
        name="User"
        component={Config}
        options={{
          headerShown: false,
          tabBarIcon: ({ tintColor, focused }) => (
            <Image source={userIc} style={focused ? { ...styles.icon, ...styles.activeIc } : styles.icon} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIc: {
    opacity: 1,
  },
  icon: {
    width: 24,
    opacity: 0.2,
    marginBottom: 0,
    height: undefined,
    aspectRatio: 0.5 / 0.5
  },
  navtext: {
    fontSize: 12,
    color: 'rgb(170,170,170)',
    fontWeight: '500'
  },
  navitem: {
    padding: 8,
    alignItems: 'center'
  },
  navwrap: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderTopColor: 'rgb(200,200,200)',
    backgroundColor: 'white',
    justifyContent: 'space-around',
  }
});
