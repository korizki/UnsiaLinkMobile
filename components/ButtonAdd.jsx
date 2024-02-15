import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

export default function ButtonAdd({ float, text, action }) {
   return (
      <View style={float ? styles.btnadd : styles.pad}>
         <TouchableOpacity
            style={float ? styles.btn : styles.btnnofloat}
            activeOpacity={0.8}
            onPress={action}
         >
            <Text style={float ? styles.text : styles.textnofloat}>{text}</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   pad: {
      marginTop: 24,
      paddingHorizontal: 24,
      width: Dimensions.get('window').width,
      flexDirection: 'column',
   },
   text: {
      fontSize: 28,
      color: 'white'
   },
   textnofloat: {
      color: 'white',
      fontSize: 18,
   },
   btn: {
      backgroundColor: '#3E54AC',
      width: 50,
      borderRadius: 8,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },
   btnadd: {
      position: 'absolute',
      right: 24,
      bottom: 82,
   },
   btnnofloat: {
      backgroundColor: '#3E54AC',
      padding: 16,
      width: 'auto',
      alignItems: 'center',
      paddingHorizontal: 24,
      elevation: 20,
      shadowColor: '#3E54AC',
      borderRadius: 8,
   }
})