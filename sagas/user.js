import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import path from 'path';
import { fbAuth, fbStorage, fbFirestore } from '../src/fbase'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  doc,
  setDoc,
} from 'firebase/firestore';


import {
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
  ADD_PROFILE_IMAGE_REQUEST, ADD_PROFILE_IMAGE_SUCCESS, ADD_PROFILE_IMAGE_FAILURE,
  DOWNLOAD_PROFILE_IMAGE_URL_REQUEST, DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS, DOWNLOAD_PROFILE_IMAGE_URL_FAILURE,
  EDIT_PROFILE_IMAGE_REQUEST, EDIT_PROFILE_IMAGE_SUCCESS, EDIT_PROFILE_IMAGE_FAILURE,
  EDIT_NAME_REQUEST, EDIT_NAME_SUCCESS, EDIT_NAME_FAILURE,
} from '../reducers/user'

export const getDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  month = month >= 10 ? month : `0${month}`
  date = date >= 10 ? date : `0${date}`

  return `${year}${month}${date}`                            // 20211016
}

export const getDateWithTime = () => {
  const today = new Date()

  const year = today.getFullYear()
  let month = today.getMonth() + 1
  let date = today.getDate()

  let hour = today.getHours()
  let minute = today.getMinutes()
  let second = today.getSeconds()

  month = month < 10 ? `0${month}` : month
  date = date < 10 ? `0${date}` : date
  hour = hour < 10 ? `0${hour}` : hour
  minute = minute < 10 ? `0${minute}` : minute
  second = second < 10 ? `0${second}` : second

  return `${year}${month}${date}-${hour}${minute}${second}`      // 20211016-211745
}

function* logIn(action) {
  try{
    const result = yield call(signInWithEmailAndPassword, fbAuth, action.data.email, action.data.password);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.user,
    })
  } catch(err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.message,
    })
  }
}

function* logOut() {
  try{
    yield call(signOut, fbAuth)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.message,
    })
  }
}

function* signUp(action) {
  try {
    const user = yield call(createUserWithEmailAndPassword, fbAuth, action.data.email, action.data.password)

    yield call(updateProfile, fbAuth.currentUser, {
      displayName: "익명",
      photoURL: "",
    })

    const memberDocRef = yield call(doc, fbFirestore, "모두의 그룹", "group data", "members", user.user.uid)
    yield call(setDoc, memberDocRef, {
      displayName: "익명",
      joinedDate: getDate(),
      photoURL: "",
      uid: user.user.uid,
      rating: 1500,
      allGames: 0,
      winnedGames: 0,
      losedGames: 0,
      status: "새로운 가입자",
    })

    const adminDocRef = yield call(doc, fbFirestore, "모두의 그룹", "group data", "admins", user.user.uid)
    yield call(setDoc, adminDocRef, {
      displayName: "익명",
      uid: user.user.uid,
    })

    const userDocRef = yield call(doc, fbFirestore, "whole users", user.user.uid)
    yield call(setDoc, userDocRef, {
      displayName: "익명",
      photoURL: "",
    })

    const userGroupDocRef = yield call(doc, fbFirestore, "whole users", user.user.uid, "joining groups", "모두의 그룹")
    yield call(setDoc, userGroupDocRef, {
      createdDate: "20211012",
      groupIntroduce: "안녕하세요~",
      groupName: "모두의 그룹",
      isAdmin: true,
      joinedDate: getDate(),
      numberOfMember: 999,
    })

    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.message,
    })
  }
}

function* uploadProfileImage(action) {
  try {
    const ext = path.extname(action.data.src)              // 확장자 추출
    const basename = path.basename(action.data.src, ext)   // 확장자 뺀 이름 추출
    const imageRef = 'images/' + basename + '_' + new Date().getTime() + ext   // images/sample_1629970096998.png

    const childRef = yield call(ref, fbStorage, imageRef)

    yield call(uploadBytes, childRef, action.data.file)

    yield put({
      type: ADD_PROFILE_IMAGE_SUCCESS,
    })
    yield put({
      type: DOWNLOAD_PROFILE_IMAGE_URL_REQUEST,
      data: imageRef,
    })
  } catch(err) {
    yield put({
      type: ADD_PROFILE_IMAGE_FAILURE,
      error: err.message,
    })
  }
}

function* downloadProfileImageURL(action) {
  try {
    const reference = yield call(ref, fbStorage, action.data)

    const url = yield call(getDownloadURL, reference)

    yield put({
      type: DOWNLOAD_PROFILE_IMAGE_URL_SUCCESS,
      data: url,
    })
    yield put({
      type: EDIT_PROFILE_IMAGE_REQUEST,
      data: url,
    })
  } catch(error) {
    yield put({
      type: DOWNLOAD_PROFILE_IMAGE_URL_FAILURE,
      error: error.message,
    })
  }
}

function* editProfileImage(action) {
  try {
    console.log('0');
    yield updateProfile(fbAuth.currentUser, {
      photoURL: action.data !== '' ? action.data : user.photoURL,
    })

    const docRef =  yield call(doc, fbFirestore, 'whole users', fbAuth.currentUser.uid)

    yield call(setDoc, docRef, { photoURL: action.data !== '' ? action.data : user.photoURL, }, { merge: true })

    yield put({
      type: EDIT_PROFILE_IMAGE_SUCCESS,
      data: action.data !== '' ? action.data : user.photoURL,
    })
  } catch(error) {
    yield put({
      type: EDIT_PROFILE_IMAGE_FAILURE,
      error: error.message,
    })
  }
}

function* editName(action) {
  try {
    yield updateProfile(fbAuth.currentUser, {
      displayName: action.data,
    })

    const docRef = yield call(doc, fbFirestore, 'whole users', fbAuth.currentUser.uid)

    yield call(setDoc, docRef, { displayName: action.data, }, { merge: true })

    yield put({
      type: EDIT_NAME_SUCCESS,
      data: action.data,
    })
  } catch(err) {
    yield put({
      type: EDIT_NAME_FAILURE,
      error: err.message,
    })
  }
}


function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp)
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn)
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut)
}
function* watchUploadProfileImage() {
  yield takeLatest(ADD_PROFILE_IMAGE_REQUEST, uploadProfileImage)
}
function* watchDownloadProfileImageURL() {
  yield takeLatest(DOWNLOAD_PROFILE_IMAGE_URL_REQUEST, downloadProfileImageURL)
}
function* watchEditName() {
  yield takeLatest(EDIT_NAME_REQUEST, editName)
}
function* watchEditProfileImage() {
  yield takeLatest(EDIT_PROFILE_IMAGE_REQUEST, editProfileImage)
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchUploadProfileImage),
    fork(watchDownloadProfileImageURL),
    fork(watchEditName),
    fork(watchEditProfileImage),
  ])
}