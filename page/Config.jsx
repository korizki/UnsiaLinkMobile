import { View, Text, ScrollView, StyleSheet, TextInput, Dimensions, Image, StatusBar, TouchableOpacity, Alert, Modal } from "react-native";
import { useIsFocused } from '@react-navigation/native'
import fotoprofile from '../assets/prof.jpg'
import unsia from '../assets/unsia.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pageTitle, subtitle } from "../misc/globalStyle";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import bgleft from '../assets/bgleft.png'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDoorOpen, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, query, collection, where, getDocs } from "firebase/firestore";

export default function Config({ navigation }) {
   const isFocused = useIsFocused()
   const [user, setUser] = useState(null)
   const [updateName, setUpdateName] = useState('')
   const [showUpdateModal, setShowUpdateModal] = useState(false)
   const getDataUser = async () => {
      await AsyncStorage.getItem('user').then(res => {
         setUser(JSON.parse(res))
      })
   }
   const handleLogout = () => {
      Alert.alert('Konfirmasi', 'Anda yakin ingin Log Out', [
         {
            style: 'cancel',
            text: 'Batal',
         },
         {
            text: 'Log Out',
            style: 'default',
            onPress: async () => {
               await AsyncStorage.removeItem('user')
               navigation.navigate('Login')
            }
         }
      ])
   }
   const gettingUpdatedUser = async () => {
      const q = query(collection(db, "user"), where("email", "==", user.email.toLowerCase()))
      const docSnap = await getDocs(q);
      let data = []
      docSnap.forEach(it => {
         data.push({ ...it.data(), id: it.id })
      })
      if (data.length) {
         let user = data[0]
         setUser(user)
         await AsyncStorage.setItem('user', JSON.stringify(user))
      }
   }
   useEffect(() => {
      getDataUser()
   }, [isFocused])
   return (
      <View style={styles.wrappage}>
         <ModalUpdate
            data={user || { name: '', email: '' }}
            show={showUpdateModal}
            closeModal={() => setShowUpdateModal(false)}
            refresh={gettingUpdatedUser}
         />
         <StatusBar barStyle="dark-content" backgroundColor={'white'} />
         <View style={styles.heads}>
            <Image source={fotoprofile} style={styles.fp} />
            {
               user ? (
                  <View>
                     <Text style={styles.name}>{user.name}</Text>
                     <View style={{ marginTop: 12, }}>
                        <View style={styles.headbtn}>
                           <FontAwesomeIcon icon={faEnvelope} style={styles.ichead} size={20} />
                           <Text style={styles.info}>{user.email}</Text>
                        </View>
                        <View style={styles.headbtn}>
                           <Image source={unsia} style={styles.unsia} />
                           <Text style={styles.info}>Universitas Siber Asia</Text>
                        </View>
                     </View>
                  </View>
               ) : false
            }
         </View>
         <ScrollView style={styles.contheader} >
            { /* jika sudah ada data user */
               user ? (
                  <>
                     <ComponentUpdate title="Nama Lengkap" val={user.name} />
                     <ComponentUpdate title="Jurusan" val={user.jurusan || '-'} />
                     <ComponentUpdate title="Email" val={user.email} />
                  </>
               ) : false
            }
            <TouchableOpacity
               style={styles.btnup}
               onPress={() => setShowUpdateModal(true)}
               activeOpacity={0.8}
            >
               <Text style={{ fontSize: 16, color: 'rgb(6, 143, 255)', textAlign: 'center', fontWeight: '500' }}>Update Data</Text>
            </TouchableOpacity>

         </ScrollView>
         <TouchableOpacity style={styles.btnlogout} activeOpacity={0.8} onPress={handleLogout}>
            <View style={styles.btnwrap}>
               <FontAwesomeIcon icon={faDoorOpen} style={{ color: 'white' }} size={20} />
               <Text style={{ fontSize: 18, color: 'white', fontWeight: '500' }}>Log Out</Text>
            </View>
         </TouchableOpacity>
      </View>
   )
}

const ModalUpdate = ({ data, show, closeModal, refresh }) => {
   const [completeName, setCompleteName] = useState(data.name)
   const [newEmail, setNewEmail] = useState(data.email)
   const [jurusan, setJurusan] = useState(data.jurusan || '')
   const [isLoading, setIsLoading] = useState(false)
   const handleUpdate = async () => {
      setIsLoading(true)
      return await updateDoc(doc(db, "user", data.id), {
         name: completeName,
         jurusan,
         email: newEmail
      }).then(() => {
         setIsLoading(false)
         Alert.alert('Berhasil, data telah diupdate.')
         closeModal()
         refresh()
      }).catch(() => {
         setIsLoading(false)
         Alert.alert('Maaf, Update User gagal!')
      })
   }
   useEffect(() => {
      setCompleteName(data.name)
      setNewEmail(data.email)
      setJurusan(data.jurusan || '')
   }, [data])
   return (
      <Modal visible={show} onRequestClose={closeModal} animationType="slide">
         <View style={styles.wrapmodal}>
            <Text style={styles.pageTitle}>Update User </Text>
            <Text style={styles.subtitle}>Silahkan lengkapi isian berikut!</Text>
            <View style={styles.formmodal}>
               <InputField
                  setVal={setCompleteName}
                  val={completeName}
                  label={"Nama Lengkap"}
                  placeholder={"e.g Rizki Ramadhan"}
               />
               <InputField
                  setVal={setNewEmail}
                  val={newEmail}
                  label={"Email"}
                  placeholder={"e.g rzk.ramadhan@gmail.com"}
               />
               <InputField
                  setVal={setJurusan}
                  val={jurusan}
                  label={"Jurusan"}
                  placeholder={"e.g Teknik Informatika"}
               />
            </View>
            {
               isLoading ? (
                  <Text style={styles.textprocess}>Memproses permintaan ...</Text>
               ) : (
                  <TouchableOpacity activeOpacity={0.8} style={styles.btnadd} onPress={handleUpdate}>
                     <Text style={styles.textadd}>Simpan Update</Text>
                  </TouchableOpacity>
               )
            }
            <Image source={bgleft} style={styles.bgleft} />
         </View>
      </Modal>
   )
}

const InputField = ({ label, placeholder, val, setVal }) => {
   return (
      <View style={styles.container}>
         <StatusBar style="auto" />
         <Text style={styles.textinp}>{label}</Text>
         <TextInput
            style={[styles.input]}
            placeholder={placeholder}
            value={val}
            selectionColor={'#31304D'}
            onChangeText={text => setVal(text)}
         />
      </View>
   )
}

const ComponentUpdate = ({ title, val }) => {
   return (
      <>
         <TouchableOpacity style={styles.updwrap} activeOpacity={0.8}>
            <Text style={styles.textupd}>{title}</Text>
            <Text style={styles.textval}>{val}</Text>
         </TouchableOpacity>
      </>
   )
}


const styles = StyleSheet.create({
   textprocess: {
      textAlign: 'center',
      fontSize: 20,
      paddingHorizontal: 20,
      color: '#3E54AC',
      fontWeight: '500'
   },
   textadd: {
      color: 'white',
      fontSize: 16,
   },
   btnadd: {
      paddingHorizontal: 24,
      width: '100%',
      borderRadius: 8,
      backgroundColor: '#3E54AC',
      alignItems: 'center',
      padding: 16,
   },
   updwrap: {
      padding: 20,
      borderBottomColor: 'rgb(240,240,240)',
      borderBottomWidth: 1.5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   formmodal: {
      paddingVertical: 28,
   },
   textval: {
      fontSize: 16,
      fontWeight: '500'
   },
   name: {
      fontSize: 24,
   },
   textupd: {
      fontSize: 16,
      color: 'rgb(50,70,70)'
   },
   bgleft: {
      width: 150,
      height: 150,
      position: 'absolute',
      bottom: 0,
      left: 0,
   },
   wrapmodal: {
      backgroundColor: 'white',
      padding: 24,
      height: Dimensions.get("window").height
   },
   headbtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
   },
   pageTitle,
   subtitle,
   heads: {
      flexDirection: 'row',
      gap: 24,
      backgroundColor: '#faf9f9',
      width: Dimensions.get('window').width,
      position: 'relative',
      padding: 24,
   },
   info: {
      fontSize: 14,
      color: 'rgb(120,120,120)',
      lineHeight: 20
   },
   wrappage: {
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      position: 'relative',
   },
   contheader: {
      backgroundColor: 'white',
      height: Dimensions.get('screen').height,
   },
   fp: {
      width: 100,
      height: 100,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: '#fff'
   },
   ichead: {
      color: 'rgb(150,150,150)',
   },
   btnlogout: {
      backgroundColor: 'transparent',
      marginTop: 24,
      alignItems: 'center',
      bottom: 140,
      padding: 20,
   },
   btnwrap: {
      gap: 16,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F45050',
      position: 'absolute',
      padding: 14,
      width: '100%',
   },
   unsia: {
      width: 20,
      height: 20,
      borderRadius: 50,
   },
   btnup: {
      padding: 16,
      backgroundColor: 'rgba(6, 143, 255, 0.1)',

   },
   wrapmodal: {
      backgroundColor: 'white',
      padding: 24,
      height: Dimensions.get("window").height
   },
   wred: {
      padding: 8,
      paddingHorizontal: 24,
      gap: 8,
   },
   updatebt: {
      backgroundColor: '#068FFF',
      padding: 14,
      borderRadius: 8
   },
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
})