import { View, Image, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native"
import illus from '../assets/loginmin.png'
import InputField from "../components/InputFields";
import { pageTitle } from "../misc/globalStyle";

export default function Login({ navigation }) {
   return (
      <ScrollView style={styles.container}>
         <View style={styles.headwrap}>
            <Image source={illus} style={styles.ilus} />
            <Text style={{ ...pageTitle, ...styles.title }} >UNSIA <Text style={styles.yellow}>Link</Text></Text>
            <Text style={styles.subtitle}>"Saling Terhubung dan Berbagi"</Text>
         </View>
         <View>
            <InputField
               secure={false}
               label="Email"
               placeholder="e.g. admin@unsia.ac.id"
               action={() => false}
            />
            <InputField
               secure={true}
               label="Password"
               placeholder="Type Your Password"
               action={() => false}
            />
         </View>
         <StatusBar style="auto" />
         <TouchableOpacity
            activeOpacity={0.9}
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}
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
   )
}

const styles = StyleSheet.create({
   yellow: {
      color: '#F7C04A'
   },
   subtitle: {
      fontSize: 18,
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
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 24,
      paddingVertical: 24,
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
