import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime'; // load on demand

import BaseScreen from '../../components/BaseScreen';
import {brandColors} from '../../components/Core/basicStyles';

//redux

import styles from './style';
import {onPressHandler} from '../../utils/hleperFuntion';
import {useDispatch} from 'react-redux';
dayjs.extend(RelativeTime);

const ChatList = () => {
  const navigation = useNavigation();
  const [message, setMessages] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const collectionRef = firestore().collection('Users');
    const unsubscribe = collectionRef.onSnapshot(
      querySnapshot => {
        const filterData =
          querySnapshot.docs.filter(
            i => i.data().userId !== auth().currentUser.uid,
          ) || [];
        setMessages(
          filterData.map(doc => {
            return {
              name: `${doc.data()?.firstName}  ${doc.data()?.lastName}`,
              image: doc.data()?.image || 'https://i.pravatar.cc/',
              message: doc.data()?.messages,
              timeStemp: dayjs(
                new Date(doc.data()?.timeStemp?.toDate()) || new Date(),
              ).fromNow(),
              _id: doc.data()?._id,
              userId: doc.data()?.userId,
              chatIdArray: doc.data()?.chatIdArray,
            };
          }),
        );
      },
      e => {
        alert(e);
      },
    );

    return () => unsubscribe();
  }, []);

  const RenderCard = ({item}) => {
    const {index, name, image, message = '', timeStemp} = item;
    return (
      <TouchableOpacity
        onPress={onPressHandler(item, navigation, dispatch)}
        key={index}
        style={styles.messageWrapper}>
        <View style={styles.flexRow}>
          <Image source={{uri: image}} style={styles.avtar} />
          <View>
            <Text style={styles.nameText}>{name}</Text>
            <View style={styles.flexRow}>
              <Text style={styles.messageText} numberOfLines={1}>
                {message}
              </Text>
              <Text
                style={[
                  styles.messageText,
                  {color: brandColors.grayLighter, maxWidth: '100%'},
                ]}>
                {' · '}
                {timeStemp}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BaseScreen title={'Messages'} icon>
      <FlatList
        data={message}
        showsVerticalScrollIndicator={false}
        renderItem={RenderCard}
        keyExtractor={(item, index) => index.toString()}
      />
    </BaseScreen>
  );
};

export default ChatList;
