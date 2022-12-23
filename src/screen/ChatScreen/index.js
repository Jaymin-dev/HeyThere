import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {GiftedChat} from 'react-native-gifted-chat';

import BaseScreen from '../../components/BaseScreen';
import {brandColors} from '../../components/Core/basicStyles';

//redux

import styles from './style';

const ChatScreen = ({route}) => {
  const {
    params: {currentUserData = {}, chatID, userId},
  } = route;
  const dispatch = useDispatch();
  const [searchPatient, setSearchPatient] = useState();
  const [contactList, setContactList] = useState([]);
  const [contactListSearch, setContactListSerch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const updateLastMessage = async () => {
    if (messages.length) {
      const userCollection = firestore().collection('Users');
      userCollection.doc(userId).update({
        timeStemp: messages[messages.length - 1]?.createdAt,
        messages: messages[messages.length - 1]?.text,
      });
      userCollection.doc(currentUserData.userId).update({
        timeStemp: messages[messages.length - 1]?.createdAt,
        messages: messages[messages.length - 1]?.text,
      });
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Chats')
      .doc(chatID)
      .onSnapshot(documentSnapshot => {
        setMessages(
          [...(documentSnapshot.data()?.chats || [])].reverse()?.map(doc => ({
            _id: doc._id,
            createdAt: doc.createdAt?.toDate(),
            text: doc.text,
            user: {
              _id: doc.user._id,
              name: doc.user.name,
              avatar: doc.user.avatar || 'https://placeimg.com/140/140/any',
            },
          })),
        );
      });
    return () => {
      subscriber();
      updateLastMessage();
    };
  }, []);
  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    const activeChatCollection = firestore().collection('Chats').doc(chatID);
    const dataMessages = await (await activeChatCollection.get()).data();
    const previousMsg = dataMessages?.chats?.length ? dataMessages.chats : [];
    console.log('activeChatCollesdscsdsdsdstsdisdon', dataMessages);
    try {
      activeChatCollection.set({
        chatID,
        chats: [
          ...previousMsg,
          {
            _id,
            createdAt,
            text,
            user: {
              _id: currentUserData.userId,
              name: `${currentUserData.firstName} ${currentUserData.lastName}`,
              avatar:
                currentUserData.avatar || 'https://placeimg.com/140/140/any',
            },
          },
        ],
      });
    } catch (error) {
      alert(error);
    }
  }, []);
  console.log('messages', messages);
  return (
    <BaseScreen title={'Messages'} back>
      <GiftedChat
        messagesContainerStyle={styles.container}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUserData.userId,
        }}
      />
    </BaseScreen>
  );
};

export default ChatScreen;
