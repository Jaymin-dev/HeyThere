import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime'; // load on demand

import {useDispatch, useSelector} from 'react-redux';

import BaseScreen from '../../components/BaseScreen';
import {brandColors} from '../../components/Core/basicStyles';

//redux

import styles from './style';
import {updateChatData} from '../../utils/TokenManager';
dayjs.extend(RelativeTime);

const ChatList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchPatient, setSearchPatient] = useState();
  const [contactList, setContactList] = useState([]);
  const [contactListSearch, setContactListSerch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessages] = useState(false);
  const message2 = [
    {
      name: 'Robort',
      image: 'https://i.pravatar.cc/',
      message: 'Hi',
      timeStemp: '1d',
    },
    {
      name: 'wendy',
      image: 'https://i.pravatar.cc/',
      message: 'Hi',
      timeStemp: '1d',
    },
  ];

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
              image: 'https://i.pravatar.cc/',
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

  const chatIntialization = async (
    data,
    currentUserId,
    chatID,
    currentUserData,
    userCollection,
  ) => {
    try {
      updateChatData(
        userCollection,
        data?.userId,
        currentUserData?.chatIdArray,
        chatID,
      );
      updateChatData(userCollection, currentUserId, data?.chatIdArray, chatID);

      firestore()
        .collection('Chats')
        .doc(chatID)
        .set({})
        .then(() => {
          console.log('chat added!');
        });
    } catch (error) {
      alert(error);
    }
  };

  const onPressHandler =
    (data = {}) =>
    async () => {
      const currentUserId = auth().currentUser.uid;
      const userCollection = firestore().collection('Users');
      const currentUserData =
        (await (await userCollection.doc(currentUserId).get()).data()) || [];
      const chatID = `${data?.userId}_${currentUserId}`;
      const chatUserID = `${currentUserId}_${data.userId}`;

      const isCurrentUserIntialize = [...(data?.chatIdArray || [])].includes(
        chatID,
      );
      const isChatUserIntialize = [...(data?.chatIdArray || [])].includes(
        chatUserID,
      );
      const userActiveId = isChatUserIntialize ? chatUserID : chatID;
      if (!isCurrentUserIntialize && !isChatUserIntialize) {
        await chatIntialization(
          data,
          currentUserId,
          chatID,
          currentUserData,
          userCollection,
        );
      }
      navigation.navigate('ChatScreen', {
        ...data,
        chatID: userActiveId,
        currentUserData,
      });
    };

  const RenderCard = ({item, type}) => {
    const {index, name, image, message = '', timeStemp} = item;
    return (
      <TouchableOpacity
        onPress={onPressHandler(item)}
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
