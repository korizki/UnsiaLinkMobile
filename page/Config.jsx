import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

export default function Config({ navigation }) {
   return (
      <View style={styles.wrappage}>
         <ScrollView>
            <Text>Ini Halaman Config</Text>
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