import { View, Text, ScrollView, StyleSheet, Dimensions, BackHandler, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native'

export default function Home({ navigation }) {
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
         <ScrollView>
            <Text>Ini Halaman Home</Text>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   wrappage: {
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F5'
   }
})