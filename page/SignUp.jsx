import { View, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Touchable } from "react-native"
import InputField from "../components/InputFields";
import { pageTitle, headcont, subtitle } from "../misc/globalStyle";

export default function SignUp({ navigation }) {
   return (
      <View style={styles.container}>
         <View style={styles.headcont}>
            <Text style={pageTitle}>Hello, Welcome to club 🥳</Text>
            <Text style={subtitle}>Please complete form below.</Text>
         </View>
         <InputField
            label="Email"
            placeholder="e.g. admin@unsia.ac.id"
            action={() => false}
         />
         <InputField
            label="Password"
            placeholder="Type Your Password"
            action={() => false}
         />
         <InputField
            label="Confirm Password"
            placeholder="Re-Type Your Password"
            action={() => false}
         />
         <TouchableOpacity activeOpacity={0.9} style={styles.btn}>
            <Text style={styles.btntext}>Register</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.haveac}
            activeOpacity={1}
            onPress={() => navigation.navigate('Login')}
         >
            <Text style={styles.haveacc}>Already have an Account</Text>
         </TouchableOpacity>
         <StatusBar style="auto" />
      </View>
   )
}

const styles = StyleSheet.create({
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
   },
});
