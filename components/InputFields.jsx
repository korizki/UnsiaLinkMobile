import { TextInput, View, Text, StatusBar, StyleSheet, Dimensions } from "react-native"

export default function InputField({ label, placeholder, action }) {
   return (
      <View style={styles.container}>
         <StatusBar style="auto" />
         <Text style={styles.textinp}>{label}</Text>
         <TextInput style={styles.input} placeholder={placeholder} onChange={action} />
      </View>
   )
}
// hitam 31304D // coklat 6C5F5B
const styles = StyleSheet.create({
   container: {
      marginVertical: 10,
   },
   textinp: {
      color: 'rgb(120,120,120)',
      marginBottom: 8,
      fontSize: 16,
   },
   input: {
      color: '#232D3F',
      borderWidth: 0.5,
      padding: 12,
      fontSize: 16,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: 'rgb(253,253,250)',
      borderColor: 'rgb(220,220,220)'
   }
});