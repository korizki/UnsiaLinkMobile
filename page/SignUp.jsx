import { View, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native"
import InputField from "../components/InputFields";
import bgleft from '../assets/bgleft.png'
import { pageTitle, headcont, subtitle } from "../misc/globalStyle";

export default function SignUp({ navigation }) {
   return (
      <View style={styles.container}>
         <View style={styles.headcont}>
            <Text style={pageTitle}>Hello, Ayo Bergabung 🥳</Text>
            <Text style={subtitle}>Silahkan lengkapi form berikut.</Text>
         </View>
         <InputField
            label="Email"
            placeholder="e.g. admin@unsia.ac.id"
            action={() => false}
            secure={false}
         />
         <InputField
            label="Password"
            placeholder="Ketikkan Password"
            action={() => false}
            secure={true}
         />
         <InputField
            secure={true}
            label="Confirm Password"
            placeholder="Ulangi Ketik Password"
            action={() => false}
         />
         <TouchableOpacity activeOpacity={0.9} style={styles.btn}>
            <Text style={styles.btntext}>Daftar</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.haveac}
            activeOpacity={1}
            onPress={() => navigation.navigate('Login')}
         >
            <Text style={styles.haveacc}>Sudah punya Akun, silahkan Login.</Text>
         </TouchableOpacity>
         <StatusBar barStyle="dark-content" backgroundColor={'#f5f5f5'} />
         <Image source={bgleft} style={styles.bgleft} />
      </View>
   )
}

const styles = StyleSheet.create({
   bgleft: {
      width: 150,
      height: 150,
      position: 'absolute',
      bottom: 0,
      left: 0,
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
   pageTitle,
   headcont,
   subtitle,
   container: {
      flex: 1,
      height: Dimensions.get("screen").height,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 24,
      paddingVertical: 24,
      paddingTop: 52,
   },
});
