import { View, Text, ScrollView, StyleSheet, Dimensions, Image, Modal, TouchableOpacity, Alert } from "react-native";
import icGroup from '../assets/ic_groups.png'
import { pageTitle, subtitle } from "../misc/globalStyle";
import ButtonAdd from "../components/ButtonAdd";
import InputField from "../components/InputFields";
import bgleft from '../assets/bgleft.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { memo, useEffect, useState } from "react";
import { addDoc, deleteDoc, doc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faTrash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt, faUser } from "@fortawesome/free-regular-svg-icons";
import ModalWaiting from "../components/Waiting";

const Group = ({ navigation }) => {
   const [showAddModal, setShowAddModal] = useState(false)
   const [user, setUser] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [listGroup, setListGroup] = useState([])
   const getDataGroup = async () => {
      const q = query(collection(db, "group"))
      const docSnap = await getDocs(q)
      let data = []
      docSnap.forEach(it => {
         data.push({ ...it.data(), id: it.id })
      })
      setListGroup(data)
   }
   const deleteData = async id => {
      setIsLoading(true)
      return await deleteDoc(doc(db, "group", id)).then(() => {
         setIsLoading(false)
         getDataGroup()
      }).catch(() => {
         setIsLoading(false)
         Alert.alert('Gagal menghapus Group.')
      })
   }
   const handleDelete = (id) => {
      Alert.alert('Konfirmasi Hapus', 'Anda yakin ingin menghapus Group?', [
         {
            text: 'Batal',
            style: 'cancel',
         },
         {
            text: 'Iya', onPress: () => {
               deleteData(id)
            }
         }
      ])
   }
   const updateUser = async () => {
      const dataUser = await AsyncStorage.getItem('user')
      if (dataUser) {
         setUser(JSON.parse(dataUser))
      }
   }
   useEffect(() => {
      updateUser()
      getDataGroup()
   }, [])
   return (
      <View style={styles.outer}>
         <ModalAddGroup
            show={showAddModal}
            close={() => setShowAddModal(false)}
            user={user ? user.name : null}
            refresh={getDataGroup}
         />
         {
            isLoading ? <ModalWaiting /> : false
         }
         {
            listGroup.length ? (
               <>
                  <View style={{ padding: 8, }}>
                     <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnadd}
                        onPress={() => setShowAddModal(true)}
                     >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>
                           <FontAwesomeIcon icon={faPlus} style={{ color: 'white' }} />
                           <Text style={styles.textadd}>Group Baru</Text>
                        </View>
                     </TouchableOpacity>
                  </View>
                  <ScrollView>
                     {
                        listGroup.map((it, index) => (
                           <View key={it.id} style={{ padding: 12, paddingTop: index == 0 ? 12 : 0 }}>
                              <CardGroup data={it} user={user} handleDelete={handleDelete} />
                           </View>
                        ))
                     }
                  </ScrollView>
               </>
            ) : (
               <View style={styles.nomsg}>
                  <Image source={icGroup} style={styles.nomsgimg} />
                  <View style={styles.wrapt}>
                     <Text style={styles.pageTitle}>Masih Sepi ya ... </Text>
                     <Text style={styles.subtitle}>Belum ada Group yang tersedia.</Text>
                  </View>
                  <ButtonAdd
                     float={false}
                     text="Buat Grup Baru"
                     action={() => setShowAddModal(true)}
                  />
               </View>
            )
         }
      </View>
   )
}

export default Group

const CardGroup = memo(({ data, user, handleDelete }) => {
   const { bidang, created_by, deskripsi, group_name, id } = data
   const [isExpand, setIsExpand] = useState(false)
   return (
      <TouchableOpacity style={styles.wrappage} onPress={() => setIsExpand(!isExpand)} activeOpacity={1}>
         <Text style={styles.titgroup}>{group_name}</Text>
         <View style={styles.cret}>
            <FontAwesomeIcon icon={faFileAlt} style={{ color: '#068FFF' }} />
            <Text style={{ color: '#068FFF', fontWeight: '500' }}> {bidang}</Text>
         </View>
         <Text style={styles.subgroup}>{deskripsi.length > 100 && !isExpand ? deskripsi.slice(0, 100) + " ..." : deskripsi}</Text>
         <View style={styles.wrapbot}>
            <View>
               <View style={styles.cret}>
                  <FontAwesomeIcon icon={faUserCheck} style={{ color: '#4D4C7D', marginLeft: 2 }} />
                  <Text style={{ color: '#4D4C7D', marginLeft: 2, fontWeight: '500' }}>{created_by ? created_by : '-'}</Text>
               </View>
            </View>
            {
               user.name == created_by ? (
                  <TouchableOpacity style={{ padding: 4 }} onPress={() => handleDelete(id)}>
                     <FontAwesomeIcon icon={faTrash} style={{ color: '#F45050' }} />
                  </TouchableOpacity>
               ) : false
            }
         </View>
      </TouchableOpacity>
   )
})

const ModalAddGroup = ({ show, close, user, refresh }) => {
   const [groupName, setGroupName] = useState('')
   const [bidang, setBidang] = useState('')
   const [deskripsi, setDeskripsi] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   // create
   const handleSubmitGroup = async () => {
      if (groupName && bidang && deskripsi) {
         setIsLoading(true)
         return await addDoc(collection(db, 'group'), {
            group_name: groupName,
            created_by: user,
            deskripsi,
            bidang,
         }).then(() => {
            refresh()
            setIsLoading(false)
            Alert.alert('Selamat, Group berhasil dibuat.')
            close()
         }).catch(() => {
            Alert.alert('Maaf, Gagal menyimpan Group!')
            setIsLoading(false)
         })
      } else {
         Alert.alert('Silahkan lengkapi data terlebih dahulu!')
      }
   }
   return (
      <Modal
         visible={show}
         transparent={true}
         animationType="slide"
         style={styles.outer}
         onRequestClose={close}
      >
         <View style={styles.wrapmodal}>
            <Text style={styles.pageTitle}>Buat Group Baru</Text>
            <Text style={styles.subtitle}>Silahkan lengkapi isian terlebih dahulu!</Text>
            <View style={styles.formmodal}>
               <InputField action={setGroupName} label={"Nama Grup"} secure={false} placeholder={"e.g Komunitas Coding Informatika"} />
               <InputField action={setBidang} label={"Ruang Lingkup"} secure={false} placeholder={"e.g Pemrograman Web"} />
               <InputField
                  action={setDeskripsi}
                  label={"Deskripsi"}
                  secure={false}
                  placeholder={"e.g Group ini merupakan tempat bertukar informasi yang relevan seputar Pemrograman Web"}
                  height={90}
               />
            </View>
            {
               isLoading ? (
                  <Text style={styles.textprocess}>Memproses permintaan ...</Text>
               ) : (
                  <TouchableOpacity activeOpacity={0.8} style={styles.btnadd} onPress={handleSubmitGroup}>
                     <Text style={styles.textadd}>Simpan Grup</Text>
                  </TouchableOpacity>
               )
            }
            <Image source={bgleft} style={styles.bgleft} />
         </View>
      </Modal>
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
   formmodal: {
      paddingVertical: 28,
   },
   wrapmodal: {
      backgroundColor: 'white',
      padding: 24,
      height: Dimensions.get("window").height
   },
   bgleft: {
      width: 150,
      height: 150,
      position: 'absolute',
      bottom: 0,
      left: 0,
   },
   outer: {
      flex: 1,
   },
   wrapt: {
      paddingVertical: 24,
      alignItems: 'center'
   },
   pageTitle,
   subtitle,
   nomsgimg: {
      width: 125,
      height: 125
   },
   nomsg: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
   },
   wrappage: {
      backgroundColor: 'white',
      padding: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
   },
   titgroup: {
      fontSize: 20,
      color: 'rgb(50,50,70)',
      fontWeight: '600',
   },
   subgroup: {
      color: 'rgb(120,120,120)',
      lineHeight: 20,
      marginVertical: 8,
      marginBottom: 20,
      fontSize: 13
   },
   cret: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
      gap: 4,
   },
   wrapbot: {
      borderTopWidth: 0.5,
      borderTopColor: 'rgb(170,170,170)',
      paddingTop: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   }
})