import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {updateChatData} from './TokenManager';
import {setLoading} from '../redux/actions/action';

const onPressHandler =
  (data = {}, navigation, dispatch) =>
  async () => {
    /* Loading Start */
    dispatch(setLoading({isProcessing: true}));
    
    const currentUserId = auth().currentUser.uid;
    const userCollection = firestore().collection('Users');
    const currentUserData =
      (await (await userCollection.doc(currentUserId).get()).data()) || [];
    const chatID = `${data?.userId}_${currentUserId}`;
    const chatUserID = `${currentUserId}_${data.userId}`;

    const isCurrentUserInitialize = [...(data?.chatIdArray || [])].includes(
      chatID,
    );
    const isChatUserInitialize = [...(data?.chatIdArray || [])].includes(
      chatUserID,
    );
    const userActiveId = isChatUserInitialize ? chatUserID : chatID;

    if (!isCurrentUserInitialize && !isChatUserInitialize) {
      await chatInitialization(
        data,
        currentUserId,
        chatID,
        currentUserData,
        userCollection,
      );
    }

    /* Loading Finish */
    dispatch(setLoading({isProcessing: false}));

    // Navigate to screen
    navigation.navigate('ChatScreen', {
      ...data,
      chatID: userActiveId,
      currentUserData,
    });
  };

const chatInitialization = async (
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

export {onPressHandler, chatInitialization};
