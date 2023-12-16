import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import Navigation from "../components/Navigation";

export default function Home({ navigation }) {
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