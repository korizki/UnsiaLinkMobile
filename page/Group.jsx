import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import icGroup from '../assets/ic_groups.png'
import { pageTitle, subtitle } from "../misc/globalStyle";
import ButtonAdd from "../components/ButtonAdd";

export default function Group({ navigation }) {
   const group = []

   return group.length ? (
      <View style={styles.wrappage}>
         <ScrollView>
            <Text>Ini Halaman Group</Text>
         </ScrollView>
         <ButtonAdd float={true} text="+" />
      </View>
   ) : (
      <View style={styles.nomsg}>
         <Image source={icGroup} style={styles.nomsgimg} />
         <View style={styles.wrapt}>
            <Text style={styles.pageTitle}>Masih Sepi ya ... </Text>
            <Text style={styles.subtitle}>Belum ada Group yang tersedia.</Text>
         </View>
         <ButtonAdd float={false} text="Buat Grup Baru" />
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