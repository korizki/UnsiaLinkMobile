import { View, Text, StatusBar, StyleSheet, Dimensions, Button } from "react-native"

export default function Login({ navigation }) {
   return (
      <View style={styles.container}>
         <Text>Open up App.js to start working on your app!</Text>
         <StatusBar style="auto" />
         <Button title="Signup" onPress={() => navigation.navigate('Signup')}></Button>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      height: Dimensions.get("screen").height,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
