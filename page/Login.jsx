import { View, Image, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import illus from '../assets/loginmin.png'
import MiniMessage from "../components/MiniMessage";
import { useState } from "react";
import InputField from "../components/InputFields";
import { pageTitle } from "../misc/globalStyle";

export default function Login({ navigation }) {
   const [authData, setAuthData] = useState({ email: '', password: '' })
   const [errorMsg, setErrorMsg] = useState('')
   const handleLogin = () => {
      if (authData.email || authData.password) {
         navigation.navigate("HomeTab")
      } else {
         setErrorMsg('⚠️ Email dan Password wajib diisi.')
      }
   }
   return (
      <View style={styles.wrapper}>
         <StatusBar barStyle="dark-content" backgroundColor={'#f5f5f5'} />
         {errorMsg ? <MiniMessage msg={errorMsg} hide={() => setErrorMsg('')} /> : false}
         <ScrollView style={styles.container}>
            <View style={styles.headwrap}>
               <Image source={illus} style={styles.ilus} />
               <Text style={{ ...pageTitle, ...styles.title }} >UNSIA <Text style={styles.yellow}>Link</Text></Text>
               <Text style={styles.subtitle}>Saling Terhubung dan Berbagi</Text>
            </View>
            <View>
               <InputField
                  secure={false}
                  label="Email"
                  placeholder="e.g. admin@unsia.ac.id"
                  action={text => setAuthData(prev => ({ ...prev, email: text }))}
               />
               <InputField
                  secure={true}
                  label="Password"
                  placeholder="Type Your Password"
                  action={text => setAuthData(prev => ({ ...prev, password: text }))}
               />
            </View>
            <StatusBar style="auto" />
            <TouchableOpacity
               activeOpacity={0.9}
               style={styles.btn}
               onPress={handleLogin}
            >
               <Text style={styles.btntext}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.haveac}
               activeOpacity={1}
               onPress={() => navigation.navigate('Signup')}
            >
               <Text style={styles.haveacc}>Belum punya Akun, Daftar disini!</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   yellow: {
      color: '#F7C04A'
   },
   subtitle: {
      fontSize: 16,
      color: '#3E54AC',
      marginTop: 4,
      fontStyle: 'italic'
   },
   title: {
      marginTop: 30,
      fontSize: 40,
      color: '#3E54AC',
   },
   pageTitle,
   headwrap: {
      flexDirection: 'column',
      paddingVertical: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   ilus: {
      width: Dimensions.get("screen").width * 50 / 100,
      height: Dimensions.get("screen").width * 40 / 100,
   },
   container: {
      flex: 1,
      height: Dimensions.get("screen").height,
      paddingHorizontal: 24,
      paddingVertical: 24,
      position: 'relative',
   },
   wrapper: {
      flex: 1,
      // height: Dimensions.get("screen").height,
      backgroundColor: '#F5F5F5',
      position: 'relative'
   },
   haveac: {
      padding: 8,
      marginTop: 12,
   },
   haveacc: {
      color: '#3E54AC',
      textAlign: 'center',
      fontSize: 16,
   },
   btntext: {
      textAlign: 'center',
      fontSize: 16,
      color: 'white'
   },
   btn: {
      marginTop: 24,
      borderRadius: 8,
      padding: 16,
      backgroundColor: '#3E54AC'
   },

});
