import { Modal, StyleSheet, View, Text, Image } from "react-native"
import codingillus from '../assets/Coding.png'

export default function ModalWaiting({ isLoading }) {
   return (
      <Modal visible={isLoading} transparent={true} animationType="slide">
         <View style={styles.modalwrapper}>
            <View style={styles.modalwait}>
               <Image source={codingillus} style={styles.img} />
               <View style={styles.center}>
                  <Text style={styles.modTitle}>Mohon Tunggu</Text>
                  <Text style={styles.sub}>Permintaan sedang diproses ...</Text>
               </View>
            </View>
         </View>
      </Modal>
   )
}

const styles = StyleSheet.create({
   center: {
      alignItems: 'center'
   },
   img: {
      height: '50%',
      width: '50%'
   },
   modalwrapper: {
      flex: 1,
      justifyContent: 'flex-end',
   },
   modTitle: {
      fontSize: 24,
      color: 'rgb(50,70,70)',
      fontWeight: '500',
      paddingBottom: 8,
   },
   sub: {
      fontSize: 16,
      color: 'rgb(150,150,150)'
   },
   modalwait: {
      backgroundColor: 'white',
      borderTopStartRadius: 16,
      gap: 32,
      borderTopEndRadius: 16,
      borderWidth: 0.5,
      borderColor: 'rgb(230,230,230)',
      height: '50%',
      alignItems: 'center',
      justifyContent: 'center'
   },
})