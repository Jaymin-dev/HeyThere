import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import {removeToken} from './http';

const tokenString = 'token';
const idString = 'userId';

const saveToken = token => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.set(tokenString, token, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
};

const retrieveToken = () => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.get(tokenString).then(
      token => {
        resolve(token);
      },
      () => {
        resolve(null);
      },
    );
  });
};

const deleteToken = () => {
  return new Promise(function (resolve, reject) {
    // Remove token from axios headers
    removeToken();
    RNSecureKeyStore.remove(tokenString).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
};

const saveUserId = userId => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.set(idString, userId.toString(), {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
};

const retrieveUserId = () => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.get(idString).then(
      userId => {
        resolve(userId);
      },
      err => {
        reject(err);
      },
    );
  });
};

const deleteUserId = () => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.remove(idString).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
};

export const updateChatData = async (
  collection,
  userId,
  chatIdArray = [],
  chat_id,
) => {
  try {
    await collection.doc(userId).update({
      chatIdArray: [...chatIdArray, chat_id],
    });
  } catch (error) {
    alert(error);
  }
};

export default {
  saveToken,
  retrieveToken,
  deleteToken,
  saveUserId,
  retrieveUserId,
  deleteUserId,
  updateChatData
};
