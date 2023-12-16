import { useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
export default function MiniMessage({ msg, hide }) {
   useEffect(() => {
      setTimeout(() => {
         hide()
      }, 6000)
   }, [])
   return (
      <View style={styles.msgwrapper}>
         <Text style={styles.text}>{msg}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   text: {
      padding: 4,
      color: 'white',
   },
   msgwrapper: {
      borderRadius: 6,
      position: 'absolute',
      padding: 8,
      backgroundColor: 'rgba(30,30,30,0.8)',
      left: 24,
      width: Dimensions.get("screen").width - 48,
      top: 24,
      zIndex: 10,
   }
})