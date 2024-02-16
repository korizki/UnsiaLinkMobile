import { View, TextInput, Text, ScrollView, StyleSheet, Dimensions, Image, BackHandler, Alert, StatusBar, TouchableOpacity } from "react-native";
import { useFocusEffect } from '@react-navigation/native'
import postIc from '../assets/ic_feed.png'
import { pageTitle, subtitle } from "../misc/globalStyle";
import { useEffect, useState } from "react";
import { db } from '../config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDocs, deleteDoc, collection, query, addDoc, doc, serverTimestamp, orderBy, where } from "firebase/firestore";
import CardPost from "../components/CardPost";
import ModalWaiting from "../components/Waiting";
import ModalComment from "../components/ModalComment";

export default function Home({ navigation }) {
   const [posts, setListPost] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [newPost, setNewPost] = useState('')
   const [user, setUser] = useState(null)
   const [postComment, setPostComment] = useState(null)
   // get listpost
   const getListPost = async () => {
      try {
         const q = query(collection(db, "post"), orderBy("created_date", "desc"))
         const docSnap = await getDocs(q)
         let listPost = []
         docSnap.forEach(it => {
            listPost.push({ ...it.data(), id: it.id })
         })
         setListPost(listPost)
      }
      catch (err) {
         Alert.alert('Gagal mendapatkan data Post terbaru.')
      }
   }
   const deletePost = async (id) => {
      setIsLoading(true)
      return await deleteDoc(doc(db, "post", id)).then(() => {
         setIsLoading(false)
         getListPost()
      }).catch(() => {
         setIsLoading(false)
         Alert.alert('Gagal menghapus postingan.')
      })
   }
   // update user info
   const updateUserInfo = async () => {
      const userInfo = await AsyncStorage.getItem('user')
      setUser(JSON.parse(userInfo))
   }
   // add new post
   const addNewPost = async () => {
      if (newPost != '') {
         setIsLoading(true)
         await addDoc(collection(db, 'post'), {
            id_user: 'Rizki Ramadhan',
            created_date: serverTimestamp(),
            content: newPost,
         }).then(() => {
            setIsLoading(false)
            setNewPost("")
            getListPost()
            Alert.alert('Berhasil menambahkan postingan baru')
         }).catch(() => {
            setIsLoading(false)
            Alert.alert('Maaf, gagal menambahkan postingan!')
         })
      }
   }
   useFocusEffect(() => {
      const backAction = () => {
         Alert.alert('Informasi', 'Apakah anda ingin Log Out ?', [
            { text: 'Batal', onPress: () => null, style: 'cancel' },
            { text: 'Keluar', onPress: () => navigation.navigate('Login'), style: 'default' },
         ])
         return true
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
      return () => backHandler.remove()
   })
   useEffect(() => {
      getListPost()
      updateUserInfo()
   }, [])
   return (
      <View style={styles.wrappage}>
         <ModalWaiting isLoading={isLoading} />
         { /* tampilkan komentar dari postingan */
            postComment ? (
               <ModalComment data={postComment} close={() => setPostComment(null)} user={user} />
            ) : false
         }
         <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor={'white'}
         />
         <View style={styles.header}>
            <TextInput
               placeholder="Mulai bagikan sesuatu ..."
               style={styles.inppost}
               value={newPost}
               onChangeText={setNewPost}
               selectionColor={'#31304D'}
               multiline={true}
            />
            <TouchableOpacity
               style={styles.sharebtn}
               activeOpacity={0.8}
               onPress={addNewPost}
            >
               <Text style={styles.text}>Bagikan</Text>
            </TouchableOpacity>
         </View>
         <ScrollView style={styles.listcontent}>
            {
               posts.length ? posts.map(it => (
                  <View key={it.created_date}>
                     <CardPost
                        data={it}
                        name={user.name || null}
                        deleteData={deletePost}
                        openComment={setPostComment}
                     />
                  </View>
               )) : (
                  <View style={styles.nomsg}>
                     <Image source={postIc} style={styles.nomsgimg} />
                     <View style={styles.wrapt}>
                        <Text style={styles.pageTitle}>Tidak Ada Berita</Text>
                        <Text style={styles.subtitle}>Belum ada yang mem-posting sesuatu.</Text>
                     </View>
                     {/* <ButtonAdd float={false} text={"Buat Pesan Baru"} /> */}
                  </View>
               )
            }
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   postWrap: {
      backgroundColor: 'white',
      padding: 16,
      borderBottomWidth: 4,
      borderBottomColor: 'rgb(230,230,230)',
      flexDirection: 'row',
      gap: 12
   },
   wrapcont: {
      flex: 1,
   },
   profimg: {
      height: 25,
      width: 25,
      backgroundColor: 'white',
      borderRadius: 50,
   },
   wrapAdd: {
      flexDirection: 'row',
      gap: 16,
   },
   icwrap: {
      flexDirection: 'row',
      gap: 4,
   },
   like: {
      color: 'crimson',
   },
   postDate: {
      color: 'rgb(170,170,170)',
      marginTop: 4,
   },
   botPost: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',

   },
   postContent: {
      marginVertical: 8,
      marginBottom: 12,
      lineHeight: 20
   },
   postUser: {
      fontSize: 18,
      fontWeight: '500',
   },
   listcontent: {
      flex: 1,
   },
   text: {
      color: 'white'
   },
   sharebtn: {
      backgroundColor: '#3E54AC',
      paddingHorizontal: 12,
      justifyContent: 'center',
      height: 40,
      borderRadius: 4,
   },
   inppost: {
      backgroundColor: 'rgb(250,250,250)',
      paddingHorizontal: 8,
      minHeight: 40,
      flex: 1,
      borderWidth: 0.5,
      borderColor: 'rgb(230,230,230)',
      borderRadius: 4,
   },
   header: {
      gap: 12,
      flexDirection: 'row',
      padding: 4,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'rgb(230,230,230)',
      alignItems: 'flex-start',
   },
   wrappage: {
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      backgroundColor: '#F5F5F5'
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
      height: Dimensions.get('window').height,
      justifyContent: 'center',
   },
})