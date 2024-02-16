import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Alert } from "react-native";
import { db } from "../config/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ModalComment({ data, show, close, user }) {
   const [comment, setComment] = useState('')
   const [listComment, setListComment] = useState([])
   const getListComment = async () => {
      const q = query(collection(db, "comment"), where("id_post", "==", data.id))
      const docSnap = await getDocs(q)
      let list = []
      docSnap.forEach(it => {
         list.push({ ...it.data(), id: it.id })
      })
      setListComment(list.sort((a, b) => b.created_date.toDate() - a.created_date.toDate()))
   }
   const sendComment = async () => {
      if (comment != '') {
         try {
            await addDoc(collection(db, 'comment'), {
               user: user.name,
               comment_content: comment,
               created_date: serverTimestamp(),
               id_post: data.id
            }).then(() => {
               getListComment()
               setComment("")
            })
         } catch (err) {
            Alert.alert('Gagal menambahkan komentar')
         }
      }
   }
   useEffect(() => {
      getListComment()
   }, [])
   return (
      <Modal animationType="slide" transparent={true} onRequestClose={close} visible={show}>
         <View style={styles.outer}>
            <View style={styles.commentWrap}>
               <View style={styles.listcomment}>
                  <Text style={styles.title}>Komentar</Text>
                  <ScrollView style={styles.listcommentarea}>
                     {
                        listComment.length ? listComment.map(comment => (
                           <View key={comment.id}>
                              <CardComment data={comment} logged_user={user.name || null} refresh={getListComment} />
                           </View>
                        )) : (
                           <Text>Tidak ada komentar tersedia.</Text>
                        )
                     }
                  </ScrollView>
               </View>
               {/* input new comment */}
               <KeyboardAvoidingView style={styles.givecommentarea}>
                  <TextInput
                     placeholder="Tuliskan Komentar ..."
                     value={comment}
                     onChangeText={setComment}
                     style={styles.input}
                     multiline={true}
                  />
                  <TouchableOpacity
                     style={styles.sendcommentbtn}
                     activeOpacity={0.8}
                     onPress={sendComment}
                  >
                     <Text style={{ color: 'white' }}>Kirim</Text>
                  </TouchableOpacity>
               </KeyboardAvoidingView>
            </View>
         </View>
      </Modal>
   )
}

const CardComment = ({ data, logged_user, refresh }) => {
   const { comment_content, created_date, user, id } = data
   const convTime = data => {
      let date = data.toDate()
      date = date.toISOString()
      date = date.split("T")
      let hour = date[1].split(".")
      return `${date[0]} ${hour[0]}`
   }
   const deleteComment = async () => {
      Alert.alert('Konfirmasi', 'Anda ingin menghapus komentar?', [
         {
            style: 'cancel',
            text: 'Batal'
         },
         {
            text: 'Iya',
            onPress: async () => {
               return await deleteDoc(doc(db, "comment", id)).then(res => {
                  refresh()
                  Alert.alert('Berhasil menghapus komentar.')
               })
            }
         }
      ])
   }
   return (
      <View style={styles.cardcom}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 4 }}>{user}</Text>
            {
               logged_user == user ? (
                  <TouchableOpacity activeOpacity={0.8} onPress={deleteComment}>
                     <FontAwesomeIcon icon={faTrash} size={12} color="#F45050" />
                  </TouchableOpacity>
               ) : false
            }
         </View>
         <Text style={{ marginVertical: 4, }}>{comment_content}</Text>
         <Text style={{ textAlign: 'right', color: 'rgb(150,150,150)', fontSize: 12 }}>{convTime(created_date)}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   cardcom: {
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: 'rgb(220,220,220)',
      borderRadius: 8,
      marginBottom: 8,
      padding: 8,
      paddingHorizontal: 12,
   },
   listcommentarea: {
      paddingVertical: 12,
   },
   title: {
      fontSize: 20,
      fontWeight: '500',
   },
   sendcommentbtn: {
      height: 48,
      borderRadius: 6,
      paddingHorizontal: 12,
      justifyContent: 'center',
      backgroundColor: '#068FFF',
   },
   input: {
      height: 48,
      paddingHorizontal: 12,
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: '#ddd',
      flex: 1,
      backgroundColor: 'white'
   },
   givecommentarea: {
      padding: 8,
      backgroundColor: '#f4f4f4',
      flexDirection: 'row',
      borderTopWidth: 0.5,
      borderTopColor: 'rgb(230,230,230)',
      alignItems: 'flex-start',
      gap: 8,
   },
   listcomment: {
      flex: 1,
      padding: 16,
      paddingVertical: 12,
   },
   commentWrap: {
      backgroundColor: '#fcfcfc',
      height: '100%',
   },
   outer: {
      flex: 1,
   },
})