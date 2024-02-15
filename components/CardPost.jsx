import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faTrash, faHeart as heartfil } from "@fortawesome/free-solid-svg-icons";
import imguser from '../assets/ic_user.png'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { memo, useState } from "react";

const CardPost = memo(({ data, name, deleteData }) => {
   const { created_date, id_user, content, id } = data
   const [like, setLike] = useState(false)
   const handleDelete = () => {
      Alert.alert('Konfirmasi Hapus', 'Anda yakin ingin menghapus postingan?', [
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
   const convTime = data => {
      let date = data.toDate()
      date = date.toISOString()
      date = date.split("T")
      let hour = date[1].split(".")
      return `${date[0]} ${hour[0]}`
   }
   return (
      <View style={styles.postWrap}>
         <Image style={styles.profimg} source={imguser} />
         <View style={styles.wrapcont}>
            <Text style={styles.postUser}>{id_user}</Text>
            <Text style={styles.postContent}>{content}</Text>
            <View style={styles.botPost}>
               <View>
                  <Text style={styles.postDate}>Diposting pada :</Text>
                  <Text style={{ color: 'rgb(60,60,60)' }}>{convTime(created_date)}</Text>
               </View>
               <View style={styles.wrapAdd}>
                  <TouchableOpacity
                     activeOpacity={0.4}
                     style={styles.icwrap}
                     onPress={() => setLike(!like)}
                  >
                     {
                        like ? (
                           <FontAwesomeIcon icon={heartfil} style={styles.like} />
                        ) : (
                           <FontAwesomeIcon icon={faHeart} />
                        )
                     }
                     <Text>{like ? 1 : 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.icwrap}
                     activeOpacity={0.4}
                  >
                     <FontAwesomeIcon icon={faMessage} />
                     <Text>0</Text>
                  </TouchableOpacity>
                  {
                     id_user == name ? (
                        <TouchableOpacity
                           style={styles.icwrap}
                           activeOpacity={0.4}
                           onPress={handleDelete}
                        >
                           <FontAwesomeIcon icon={faTrash} style={styles.trash} />
                        </TouchableOpacity>
                     ) : false
                  }
               </View>
            </View>
         </View>
      </View>
   )
})

export default CardPost

const styles = StyleSheet.create({
   trash: {
      color: 'rgb(160,160,160)'
   },
   postWrap: {
      backgroundColor: 'white',
      padding: 16,
      borderBottomWidth: 6,
      borderBottomColor: 'rgb(235,235,235)',
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
   },
   icwrap: {
      flexDirection: 'row',
      gap: 6,
      padding: 12,
      alignItems: 'center'
   },
   like: {
      color: 'crimson',
   },
   postDate: {
      color: 'rgb(170,170,170)',
      marginBottom: 2,
      fontSize: 13,
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
   }
})