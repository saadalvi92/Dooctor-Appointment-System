import React from 'react';
import AppText from './Text';
import colors from '../config/colors';
import RatingStars from './RatingStars';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {baseUrl, imageUrl} from '../utils/baseUrl';
function ChatListItem(props) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 20,
        paddingBottom: 0,
        flex: 1,
      }}
      onPress={() => {
        props.goto();
      }}>
      <View style={styles.profileCard}>
        <View
          style={{
            flex: 0.7,
            marginRight: '3%',
            paddingBottom: 0,
            marginBottom: '2%',
          }}>
          {props.currentChat.image ? (
            <Image
              source={{
                uri: `${imageUrl}${props.currentChat.image}`,
              }}
              resizeMode="cover"
              style={{
                height: hp('7.5%'),
                width: wp('14%'),
                borderRadius: 14,
              }}
            />
          ) : (
            <Image
              source={require('../assets/images/User.png')}
              resizeMode="cover"
              style={{
                height: hp('8%'),
                width: wp('15%'),

                borderRadius: 14,
              }}
            />
          )}
        </View>
        <View
          style={{
            flex: 3,
            height: 60,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: colors.dark,
              fontSize: RFValue(15),
              fontWeight: 'bold',
              marginBottom: '1%',
            }}>
            {props.currentChat.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: colors.dark,
                fontSize: RFValue(13),
                flex: 3,
                fontWeight: 'bold',
              }}>
              {props.currentChat.message}
            </Text>
            <Text
              style={{
                color: colors.medium,
                fontSize: RFValue(13),
                marginLeft: '2%',
                flex: 1,
              }}>
              06:02
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ChatListItem;
const styles = StyleSheet.create({
  profileCard: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
// import React from 'react';
// import AppText from './Text';
// import colors from '../config/colors';
// import RatingStars from './RatingStars';
// import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
// function ChatListItem(props) {
//   return (
//     <TouchableOpacity
//       style={{
//         paddingVertical: 20,
//         paddingBottom: 0,
//         flex: 1,
//       }}
//       onPress={() => {
//         props.goto();
//       }}>
//       <View style={styles.profileCard}>
//         <View
//           style={{
//             flex: 1,
//             marginRight: '2%',
//             paddingBottom: 0,
//           }}>
//           <Image
//             source={require('../assets/images/dr1.jpg')}
//             resizeMode="cover"
//             style={{
//               height: 60,
//               width: 70,
//               borderRadius: 15,
//             }}
//           />
//         </View>
//         <View
//           style={{
//             flex: 3,
//             height: 60,
//           }}>
//           <Text
//             style={{
//               color: colors.dark,
//               fontSize: 20,
//               fontWeight: 'bold',
//             }}>
//             {props.currentChat.name}
//           </Text>
//           <View style={{flexDirection: 'row'}}>
//             <Text
//               style={{
//                 color: colors.medium,
//                 fontSize: 16,
//                 flex: 3,
//               }}>
//               {props.currentChat.message}
//             </Text>
//             <Text
//               style={{
//                 color: colors.medium,
//                 fontSize: 16,
//                 marginLeft: '2%',
//                 flex: 1,
//               }}>
//               06:02 PM
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// }

// export default ChatListItem;
// const styles = StyleSheet.create({
//   profileCard: {
//     height: '20%',
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
// });
