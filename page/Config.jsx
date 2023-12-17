import { View, Text, ScrollView, StyleSheet, Dimensions, Image, StatusBar } from "react-native";
import fotoprofile from '../assets/fotoprofile.png'

export default function Config({ navigation }) {
   return (
      <View style={styles.wrappage}>
         <StatusBar barStyle="dark-content" backgroundColor={'white'} />
         <ScrollView >
            <View style={styles.contheader}>
               <Image source={fotoprofile} style={styles.fp} />
               <View>
                  <Text style={styles.name}>Rizki Ramadhan</Text>
                  <Text style={styles.info}>rzk.ramadhan@gmail.com</Text>
                  <Text style={styles.info}>🎓 PJJ. Informatika</Text>
                  <Text style={styles.info}>🏢 Universitas Siber Asia</Text>
               </View>
            </View>
            {/* <Text>Ini Halaman Config</Text> */}
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   name: {
      fontSize: 24,
   },
   info: {
      fontSize: 14,
      color: 'rgb(120,120,120)',
      lineHeight: 20
   },
   wrappage: {
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F5'
   },
   contheader: {
      backgroundColor: 'white',
      gap: 24,
      padding: 24,
      paddingHorizontal: 24,
      flexDirection: 'row'
   },
   fp: {
      width: 100,
      height: 100,
      borderRadius: 100,
   }
})