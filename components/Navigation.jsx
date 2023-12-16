import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import homeIc from '../assets/ic_home.png'
import groupIc from '../assets/ic_group.png'
import msgIc from '../assets/ic_msg.png'
import userIc from '../assets/ic_user.png'

import Home from '../page/Home';
import Config from '../page/Config';
import Message from '../page/Message'
import Group from '../page/Group';

export default function Navigation({ navigation }) {
   return (
      <View style={styles.navwrap}>
         <MenuNav text="Home" imgsrc={homeIc} action={() => navigation.navigate('Home')} />
         <MenuNav text="Group" imgsrc={groupIc} action={() => navigation.navigate('Group')} />
         <MenuNav text="Message" imgsrc={msgIc} action={() => navigation.navigate('Message')} />
         <MenuNav text="Setting" imgsrc={userIc} action={() => navigation.navigate('Config')} />
      </View>

   )
}
const MenuNav = ({ text, imgsrc, action }) => {
   return (
      <TouchableOpacity
         style={styles.navitem}
         activeOpacity={1}
         onPress={action}
      >
         <Image source={imgsrc} style={styles.icon} />
         <Text style={styles.navtext}>{text}</Text>
      </TouchableOpacity>
   )
}
const styles = StyleSheet.create({
   icon: {
      width: 28,
      marginBottom: 2,
      height: undefined,
      opacity: 0.2,
      aspectRatio: 0.5 / 0.5
   },
   navtext: {
      fontSize: 12,
      color: 'rgb(170,170,170)',
      fontWeight: '500'
   },
   navitem: {
      padding: 8,
      alignItems: 'center'
   },
   navwrap: {
      flexDirection: 'row',
      borderWidth: 0.5,
      borderTopColor: 'rgb(200,200,200)',
      backgroundColor: 'white',
      justifyContent: 'space-around',
   }
})