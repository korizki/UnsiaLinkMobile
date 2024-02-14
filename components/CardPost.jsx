import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartfil, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import imguser from '../assets/ic_user.png'
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";

export default function CardPost({ data }) {
   const { created_date, id_user, content } = data
   const [like, setLike] = useState(false)
   const convTime = data => {
      let date = data.toDate()
      date = date.toISOString()
      date = date.split("T")
      date = date.join(" ")
      return date.replace(".038Z", "")
   }
   return (
      <View style={styles.postWrap} key={created_date}>
         <Image style={styles.profimg} source={imguser} />
         <View style={styles.wrapcont}>
            <Text style={styles.postUser}>{id_user}</Text>
            <Text style={styles.postContent}>{content}</Text>
            <View style={styles.botPost}>
               <View>
                  <Text>Diposting pada :</Text>
                  <Text style={styles.postDate}>{convTime(created_date)}</Text>
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
                     <Text>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={styles.icwrap}
                     activeOpacity={0.4}
                  >
                     <FontAwesomeIcon icon={faMessage} />
                     <Text>Comment</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
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
   }
})