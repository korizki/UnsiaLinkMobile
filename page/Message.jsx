import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import msgIc from '../assets/ic_msg.png'
import { pageTitle, subtitle } from "../misc/globalStyle";

export default function Message({ navigation }) {
   const message = []

   return message.length ? (
      <View style={styles.wrappage}>
         <ScrollView>
            <Text>Ini Halaman Message</Text>
         </ScrollView>
      </View>
   ) : (
      <View style={styles.nomsg}>
         <Image source={msgIc} style={styles.nomsgimg} />
         <View style={styles.wrapt}>
            <Text style={styles.pageTitle}>Yah, masih kosong</Text>
            <Text style={styles.subtitle}>Belum ada percakapan yang tersimpan</Text>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
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
      justifyContent: 'center',
   },
   wrappage: {
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F5'
   }
})