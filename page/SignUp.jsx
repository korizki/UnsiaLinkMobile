import { View, Modal, Text, StatusBar, StyleSheet, Dimensions, TouchableOpacity, Image, Alert } from "react-native"
import InputField from "../components/InputFields";
import bgleft from '../assets/bgleft.png'
import { pageTitle, headcont, subtitle } from "../misc/globalStyle";
import { db } from "../config/firebase";
import ModalWaiting from "../components/Waiting";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function SignUp({ navigation }) {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confPassword, setConfPassword] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const handleSubmit = async () => {
      if (email != '' && password != '') {
         if (password != '' && (password == confPassword)) {
            setIsLoading(true)
            return await addDoc(collection(db, 'user'), {
               email: email.toLowerCase(), password
            }).then(res => {
               setIsLoading(false)
               Alert.alert("Akun berhasil dibuat, silahkan Log In!")
               navigation.navigate('Login')
            }).catch(err => {
               setIsLoading(false)
               Alert.alert("Gagal mendaftarkan User, silahkan coba kembali!")
            })
         }
         return Alert.alert("Password tidak sesuai!")
      }
      return Alert.alert("Ops, data belum lengkap!")
   }
   return (
      <View style={styles.container}>
         { /* jika loading */
            <ModalWaiting isLoading={isLoading} />
         }
         <View style={styles.headcont}>
            <Text style={pageTitle}>Hello, Ayo Bergabung 🥳</Text>
            <Text style={subtitle}>Silahkan lengkapi form berikut.</Text>
         </View>
         <InputField
            label="Email"
            action={prev => setEmail(prev)}
            placeholder="e.g. admin@unsia.ac.id"
            keyboardType="email"
            secure={false}
         />
         <InputField
            label="Password"
            placeholder="Ketikkan Password"
            action={setPassword}
            secure={true}
         />
         <InputField
            secure={true}
            action={setConfPassword}
            label="Confirm Password"
            placeholder="Ulangi Ketik Password"
         />
         <TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btntext}>Daftar</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={styles.haveac}
            activeOpacity={1}
            onPress={() => navigation.navigate("Login")}
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
      paddingTop: 56,
   },
});
