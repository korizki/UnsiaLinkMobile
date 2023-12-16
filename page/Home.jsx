import { View, TextInput, Text, ScrollView, StyleSheet, Dimensions, Image, BackHandler, Alert, StatusBar, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import postIc from '../assets/ic_feed.png'
import { pageTitle, subtitle } from "../misc/globalStyle";
import { SafeAreaView } from "react-native";

export default function Home({ navigation }) {
   const listContent = []
   useFocusEffect(() => {
      const backAction = () => {
         Alert.alert('Informasi', 'Apakah anda ingin Log Out ?', [
            { text: 'Batal', onPress: () => null, style: 'cancel' },
            { text: 'Keluar', onPress: () => navigation.navigate('Login'), style: 'default' },
         ])
         return true
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
      return () => backHandler.remove()
   })
   return (
      <View style={styles.wrappage}>
         <StatusBar barStyle="dark-content" backgroundColor={'#F3F3F3'} />
         <SafeAreaView style={styles.header}>
            <TextInput placeholder="Apa yang anda pikirkan ..." style={styles.inppost} />
            <TouchableOpacity style={styles.sharebtn}>
               <Text style={styles.text}>Bagikan</Text>
            </TouchableOpacity>
         </SafeAreaView>
         <ScrollView style={styles.listcontent}>
            {
               listContent.length ? (
                  <Text>Ini Halaman Homse</Text>
               ) : (
                  <View style={styles.nomsg}>
                     <Image source={postIc} style={styles.nomsgimg} />
                     <View style={styles.wrapt}>
                        <Text style={styles.pageTitle}>Tidak Ada Berita</Text>
                        <Text style={styles.subtitle}>Belum ada yang mem-posting sesuatu.</Text>
                     </View>
                     {/* <ButtonAdd float={false} text={"Buat Pesan Baru"} /> */}
                  </View>
               )
            }
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   listcontent: {
      flex: 1,
   },
   text: {
      color: 'white'
   },
   sharebtn: {
      backgroundColor: '#3E54AC',
      padding: 12,
      borderRadius: 4,
   },
   inppost: {
      backgroundColor: 'rgb(250,250,250)',
      padding: 8,
      paddingHorizontal: 12,
      flex: 1,
      borderWidth: 0.5,
      borderColor: 'rgb(230,230,230)',
      borderRadius: 4,
   },
   header: {
      gap: 8,
      flexDirection: 'row',
      padding: 12,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(230,230,230)',
      alignItems: 'center',
   },
   wrappage: {
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F5'
   },
   wrapt: {
      paddingVertical: 24,
      alignItems: 'center'
   },
   pageTitle,
   subtitle,
   nomsgimg: {
      width: 125,
      height: 125
   },
   nomsg: {
      alignItems: 'center',
      flex: 1,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
   },
})