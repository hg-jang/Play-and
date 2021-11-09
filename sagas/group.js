import { all, fork, takeLatest, put, call } from 'redux-saga/effects'
import { fbStorage, fbFirestore } from '../src/fbase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import path from 'path'

import {
  LOAD_JOINED_GROUPS_REQUEST, LOAD_JOINED_GROUPS_SUCCESS, LOAD_JOINED_GROUPS_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
  LOAD_MEMBERS_REQUEST, LOAD_MEMBERS_SUCCESS, LOAD_MEMBERS_FAILURE,
  LOAD_GAMES_REQUEST, LOAD_GAMES_SUCCESS , LOAD_GAMES_FAILURE,
  LOAD_GROUP_INFO_REQUEST, LOAD_GROUP_INFO_SUCCESS, LOAD_GROUP_INFO_FAILURE,
  LOAD_WHOLE_GROUPS_REQUEST, LOAD_WHOLE_GROUPS_SUCCESS, LOAD_WHOLE_GROUPS_FAILURE,
  LOAD_AWAITING_GROUPS_REQUEST, LOAD_AWAITING_GROUPS_SUCCESS, LOAD_AWAITING_GROUPS_FAILURE,
  ADD_AWAITOR_REQUEST, ADD_AWAITOR_SUCCESS, ADD_AWAITOR_FAILURE,
  CREATE_GROUP_REQUEST, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAILURE,
  LOAD_AWAITORS_REQUEST, LOAD_AWAITORS_SUCCESS, LOAD_AWAITORS_FAILURE,
  UPLOAD_POST_IMAGE_REQUEST, UPLOAD_POST_IMAGE_SUCCESS, UPLOAD_POST_IMAGE_FAILURE,
  DOWNLOAD_POST_IMAGE_URL_REQUEST, DOWNLOAD_POST_IMAGE_URL_SUCCESS, DOWNLOAD_POST_IMAGE_URL_FAILURE,
  REMOVE_POST_IMAGE_REQUEST, REMOVE_POST_IMAGE_SUCCESS, REMOVE_POST_IMAGE_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  EDIT_POST_REQUEST, EDIT_POST_SUCCESS, EDIT_POST_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_FAILURE, LOAD_COMMENTS_SUCCESS,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE,
  LOAD_CHAT_REQUEST, LOAD_CHAT_SUCCESS, LOAD_CHAT_FAILURE,
  ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS, ADD_CHAT_FAILURE,
  FIND_GAMES_REQUEST, FIND_GAMES_SUCCESS, FIND_GAMES_FAILURE,
  LOAD_MEMBER_GAMES_REQUEST, LOAD_MEMBER_GAMES_SUCCESS, LOAD_MEMBER_GAMES_FAILURE,
  ADD_MEMBER_REQUEST, ADD_MEMBER_SUCCESS, ADD_MEMBER_FAILURE,
  REMOVE_MEMBER_REQUEST, REMOVE_MEMBER_SUCCESS, REMOVE_MEMBER_FAILURE,
  EDIT_GROUP_INFO_REQUEST, EDIT_GROUP_INFO_SUCCESS, EDIT_GROUP_INFO_FAILURE,
  REMOVE_AWAITOR_REQUEST, REMOVE_AWAITOR_SUCCESS, REMOVE_AWAITOR_FAILURE,
  ADD_JOINED_GROUP_REQUEST, ADD_JOINED_GROUP_SUCCESS, ADD_JOINED_GROUP_FAILURE,
  ADD_ADMIN_REQUEST, ADD_ADMIN_SUCCESS, ADD_ADMIN_FAILURE,
  ADD_GAME_REQUEST, ADD_GAME_SUCCESS, ADD_GAME_FAILURE,
  ADD_GAME_IN_MEMBER_REQUEST, ADD_GAME_IN_MEMBER_SUCCESS, ADD_GAME_IN_MEMBER_FAILURE,
} from '../reducers/group'

function* loadJoinedGroups(action) {
  try {
    let groupArr = []
    let groupObj = {}
    
    for(let group of action.data.groupArr) {
      groupObj = {}
      // 그룹 기본 정보 가져오기
      const groupInfoDocRef = yield call(doc, fbFirestore, group, "group information")
      const groupInfoDoc = yield call(getDoc, groupInfoDocRef)

      const GROUPINFODOC_DATA = yield groupInfoDoc.data()
      const GROUPINFODOC_EXISTS = yield groupInfoDoc.exists()
      if(GROUPINFODOC_EXISTS) {
        groupObj = {
          ...groupObj,
          groupName: GROUPINFODOC_DATA.groupName,
          groupIntorudce: GROUPINFODOC_DATA.groupIntroduce,
          numberOfMember: GROUPINFODOC_DATA.numberOfMember,
          createdDate: GROUPINFODOC_DATA.createdDate,
        }
      }

      // 관리자 여부 가져오기
      const adminDocRef = yield call(doc, fbFirestore, group, 'group data', 'admins', action.data.uid)
      const adminDoc = yield call(getDoc, adminDocRef)
      const ADMINDOC_EXISTS = adminDoc.exists()
      if(ADMINDOC_EXISTS) {
        groupObj = {
          ...groupObj,
          isAdmin: true,
        }
      }
    
      // 각 그룹 가입한 날짜 가져오기
      const dateDocRef = yield call(doc, fbFirestore, group, 'group data', 'members', action.data.uid)
      const dateDoc = yield call(getDoc, dateDocRef)

      const DATEDOC_DATA = dateDoc.data()
      const DATEDOC_EXISTS = dateDoc.exists()
      if(DATEDOC_EXISTS) {
        groupObj = {
          ...groupObj,
          joinedDate: DATEDOC_DATA.joinedDate,
        }
      }

      groupArr = groupArr.concat(groupObj)
    }
      
    yield put({
      type: LOAD_JOINED_GROUPS_SUCCESS,
      data: groupArr,
    })
    
  } catch(err) {
    yield put({
      type: LOAD_JOINED_GROUPS_FAILURE,
      error: err.message,
    })
  }
}

function* loadPosts(action) {
  try {
    let result = []
    let obj = {}

    for(let postId of action.data.postsArr) {
      obj = {}

      const postDocRef = yield call(doc, fbFirestore, action.data.group, "group data", "posts", postId)
      const postDoc = yield call(getDoc, postDocRef)
      const POST_DATA = postDoc.data()
      obj = {
        ...obj,
        writerUID: POST_DATA.writerUID,
        writerPhotoURL: POST_DATA.writerPhotoURL,
        writerDisplayName: POST_DATA.writerDisplayName,
        content: POST_DATA.content,
        imageURLs: POST_DATA.imageURLs,
        date: POST_DATA.date,
        id: POST_DATA.id,
      }

      result = result.concat(obj)
    }

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result,
    })
  } catch(err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.message
    })
  }
}

function* loadMembers(action) {
  try {
    let result = []
    let obj = {}

    for(let memberId of action.data.membersArr) {
      obj = {}

      const memberDocRef = yield call(doc, fbFirestore, action.data.group, "group data", "members", memberId)
      const memberDoc = yield call(getDoc, memberDocRef)
      const MEMBER_DATA =  memberDoc.data()
      obj = {
        ...obj,
        displayName: MEMBER_DATA.displayName,
        photoURL: MEMBER_DATA.photoURL,
        uid: MEMBER_DATA.uid,
        rating: MEMBER_DATA.rating,
        joinedDate: MEMBER_DATA.joinedDate,
        allGames: MEMBER_DATA.allGames,
        winnedGames: MEMBER_DATA.winnedGames,
        losedGames: MEMBER_DATA.losedGames,
        status: MEMBER_DATA.status,
      }
      result = result.concat(obj)
    }

    yield put({
      type: LOAD_MEMBERS_SUCCESS,
      data: result,
    })
  } catch(err) {
    yield put({
      type: LOAD_MEMBERS_FAILURE,
      error: err.message
    })
  }
}

function* loadGames(action) {
  try {
    let result =  []
    let obj = {}

    for(let gameId of action.data.gamesArr) {
      obj = {}

      const gameDocRef = yield call(doc, fbFirestore, action.data.group, "group data", "games", gameId)
      const gameDoc = yield call(getDoc, gameDocRef)
      const GAME_DATA =  gameDoc.data()
      obj = {
        ...obj,
        id: GAME_DATA.id,
        playedDate: GAME_DATA.playedDate,
        writtenDate: GAME_DATA.writtenDate,
        winners: GAME_DATA.winners,
        losers: GAME_DATA.losers,
        winnerRatingAfter: GAME_DATA.winnerRatingAfter,
        loserRatingAfter: GAME_DATA.loserRatingAfter,
        winnerRatingBefore: GAME_DATA.winnerRatingBefore,
        loserRatingBefore: GAME_DATA.loserRatingBefore,
        percentage: GAME_DATA.percentage,
        ratingChange: GAME_DATA.ratingChange,
      }

      result = result.concat(obj)
    }

    yield put({
      type: LOAD_GAMES_SUCCESS,
      data: result,
    })
  } catch(err) {
    yield put({
      type: LOAD_GAMES_FAILURE,
      error: err.message
    })
  }
}

function* loadGroupInfo(action) {
  try {
    const infoDocRef = yield call(doc, fbFirestore, action.data, 'group information')
    const infoDoc = yield call(getDoc, infoDocRef)
    const INFO_DATA = infoDoc.data()

    yield put({
      type: LOAD_GROUP_INFO_SUCCESS,
      data: {
        createdDate: INFO_DATA.createdDate,
        groupIntroduce: INFO_DATA.groupIntroduce,
        groupName: INFO_DATA.groupName,
        numberOfMember: INFO_DATA.numberOfMember,
      },
    })
  } catch(err) {
    yield put({
      type: LOAD_GROUP_INFO_FAILURE,
      error: err.message
    })
  }
}

function* loadWholeGroups(action) {
  try {
    let result = []
    let obj = {}

    for(let groupName of action.data) {
      obj = {}

      const groupDocRef = yield call(doc, fbFirestore, 'whole groups', groupName)
      const groupDoc = yield call(getDoc, groupDocRef)
      const GROUP_DATA =  groupDoc.data()
      obj = {
        ...obj,
        groupName: GROUP_DATA.groupName,
        groupIntroduce: GROUP_DATA.groupIntroduce,
      }

      result = result.concat(obj)
    }

    yield put({
      type: LOAD_WHOLE_GROUPS_SUCCESS,
      data: result,
    })
  } catch(err) {
    yield put({
      type: LOAD_WHOLE_GROUPS_FAILURE,
      error: err.message
    })
  }
}

function* loadAwaitingGroups(action) {
  try {
    let result = []
    let obj = {}

    for(let groupName of action.data.arr) {
      obj = {}

      const groupDocRef = yield call(doc, fbFirestore, 'whole users', action.data.memberId, 'awaiting groups', groupName)
      const groupDoc = yield call(getDoc, groupDocRef)
      const GROUP_DATA =  groupDoc.data()
      obj = {
        ...obj,
        groupName: GROUP_DATA.groupName,
      }

      result = result.concat(obj)
    }

    yield put({
      type: LOAD_AWAITING_GROUPS_SUCCESS,
      data: result,
    })
  } catch(err) {
    yield put({
      type: LOAD_AWAITING_GROUPS_FAILURE,
      error: err.message
    })
  }
}

function* addAwaitor(action) {
  try {
    const groupAwaitorDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'awaitors', action.data.memberId)
    yield call(setDoc, groupAwaitorDocRef, action.data.info)

    const userGroupDocRef = yield call(doc, fbFirestore, 'whole users', action.data.memberId, 'awaiting groups', action.data.group)
    yield call(setDoc, userGroupDocRef, {
      groupName: action.data.group,
    })

    yield put({
      type: ADD_AWAITOR_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: ADD_AWAITOR_FAILURE,
      error: err.message
    })
  }
}

function* createGroup(action) {
  try {
    // 그룹 - group information
    const groupInfoDocRef = yield call(doc, fbFirestore, action.data.groupName, 'group information')
    yield call(setDoc, groupInfoDocRef, {
      groupName: action.data.groupName,
      groupIntroduce: action.data.groupIntroduce,
      createdDate: action.data.date,
      numberOfMember: 1,
    })

    // 그룹 - group data - admins - 멤버
    const groupAdminDocRef = yield call(doc, fbFirestore, action.data.groupName, 'group data', 'admins', action.data.memberInfo.uid)
    yield call(setDoc, groupAdminDocRef, {
      uid: action.data.memberInfo.uid,
      displayName: action.data.memberInfo.displayName,
    })

    // 그룹 - group data - members - 멤버
    const groupMemberDocRef = yield call(doc, fbFirestore, action.data.groupName, 'group data', 'members', action.data.memberInfo.uid)
    yield call(setDoc, groupMemberDocRef, {
      ...action.data.memberInfo,
      joinedDate: action.data.date,
      status: "새로운 멤버",
      allGames: 0,
      winnedGames: 0,
      losedGames: 0,
      rating: 1500,
    })

    // whole users - 멤버 - joining groups - 그룹
    const wholeUsersDocRef = yield call(doc, fbFirestore, 'whole users', action.data.memberInfo.uid, 'joining groups', action.data.groupName)
    yield call(setDoc, wholeUsersDocRef, {
      groupName: action.data.groupName,
      groupIntroduce: action.data.groupIntroduce,
      isAdmin: true,
      joinedDate: action.data.date,
      createdDate: action.data.date,
      numberOfMember: 1,
    })

    // whole groups - 그룹
    const wholeGroupsDocRef = yield call(doc, fbFirestore, 'whole groups', action.data.groupName)
    yield call(setDoc, wholeGroupsDocRef, {
      groupName: action.data.groupName,
      groupIntroduce: action.data.groupIntroduce,
    })

    yield put({
      type: CREATE_GROUP_SUCCESS,
      data: {
        groupName: action.data.groupName,
        groupIntroduce: action.data.groupIntroduce,
      },
    })
  } catch(err) {
    yield put({
      type: CREATE_GROUP_FAILURE,
      error: err.message
    })
  }
}

function* loadAwaitors(action) {
  try {
    let result =  []
    let obj = {}

    for(let awaitorId of action.data.awaitorsArr) {
      obj = {}

      const awaitorDocRef = yield call(doc, fbFirestore, action.data.group, "group data", "awaitors", awaitorId)
      const awaitorDoc = yield call(getDoc, awaitorDocRef)
      const AWAITOR_DATA =  awaitorDoc.data()
      obj = {
        displayName: AWAITOR_DATA.displayName,
        photoURL: AWAITOR_DATA.photoURL,
        uid: AWAITOR_DATA.uid,
      }

      result = result.concat(obj)
    }
    yield put({
      type: LOAD_AWAITORS_SUCCESS,
      data: result,
    })
  } catch(err) {
    yield put({
      type: LOAD_AWAITORS_FAILURE,
      error: err.message
    })
  }
}

function* uploadPostImage(action) {
  try {
    const time = new Date().getTime()

    const ext = path.extname(action.data.src)
    const basename = path.basename(action.data.src, ext)
    const imageRef = `${action.data.group}/${basename}_${time}${ext}`  // 그룹 이름/sample_1629970096998.png

    const childRef = yield call(ref, fbStorage, imageRef)
    yield call(uploadBytes, childRef, action.data.file)

    yield put({
      type: UPLOAD_POST_IMAGE_SUCCESS,
    })
    yield put({
      type: DOWNLOAD_POST_IMAGE_URL_REQUEST,
      data: {
        imageRef,
        id: action.data.id,
      }
    })
  } catch(error) {
    yield put({
      type: UPLOAD_POST_IMAGE_FAILURE,
      data: error.message,
    })
  }
}

function* downloadPostImageURL(action) {
  try {
    const reference = yield call(ref, fbStorage, action.data.imageRef)

    const url = yield call(getDownloadURL, reference)

    yield put({
      type: DOWNLOAD_POST_IMAGE_URL_SUCCESS,
      data: {
        id: action.data.id,
        ref: action.data.imageRef,
        url,
      }
    })
  } catch(error) {
    yield put({
      type: DOWNLOAD_POST_IMAGE_URL_FAILURE,
      error: error.message,
    })
  }
}

function* removePostImage(action) {
  try {
    const childRef = yield call(ref, fbStorage, action.data.imageRef)

    yield call(deleteObject, childRef)

    yield put({
      type: REMOVE_POST_IMAGE_SUCCESS,
      data: {
        ref: action.data.imageRef,
        id: action.data.id,
      }
    })
  } catch(error) {
    yield put({
      type: REMOVE_POST_IMAGE_FAILURE,
      data: error.message,
    })
  }
}

function* addPost(action) {
  try {
    const postDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'posts', action.data.id)
    yield call(setDoc, postDocRef, action.data.postObj)

    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data.postObj,
    })
  } catch(err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.message,
    })
  }
}

function* editPost(action) {
  try {
    const postDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'posts', action.data.postId)
    yield call(setDoc, postDocRef, {
      content: action.data.content, imageURLs: action.data.imageURLs
    }, {
      merge: true,
    })

    yield put({
      type: EDIT_POST_SUCCESS,
      data: {
        postId: action.data.postId,
        content: action.data.content,
        imageURLs: action.data.imageURLs,
      },
    })
  } catch(err) {
    yield put({
      type: EDIT_POST_FAILURE,
      error: err.message
    })
  }
}

function* removePost(action) {
  try {
    const postDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'posts', action.data.postId)
    yield call(deleteDoc, postDocRef)

    yield put({
      type: REMOVE_POST_SUCCESS,
      postId: action.data.postId,
    })
  } catch(err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.message
    })
  }
}

function* addComment(action) {
  try {
    const commentDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'posts', action.data.postId, 'comments', action.data.commentId)
    yield call(setDoc, commentDocRef, action.data.commentObj)

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        commentObj: action.data.commentObj,
      },
    })
  } catch(err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.message
    })
  }
}

function* loadComments(action) {
  try {
    let result = []
    let obj = {}

    for(let commentId of action.data.commentsArr) {
      obj = {}

      const commentDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'posts', action.data.postId, 'comments', commentId)
      const commentDoc = yield call(getDoc, commentDocRef)
      const COMMENT_DATA = commentDoc.data()
      obj = {
        ...obj,
        commentWriterDisplayName: COMMENT_DATA.commentWriterDisplayName,
        commentWriterPhotoURL: COMMENT_DATA.commentWriterPhotoURL,
        commentWriterUID: COMMENT_DATA.commentWriterUID,
        content: COMMENT_DATA.content,
        date: COMMENT_DATA.date,
        id: COMMENT_DATA.id,
        like: COMMENT_DATA.like,
      }

      result = [obj, ...result]
    }

    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: {
        postId: action.data.postId,
        result,
      }
    })
  } catch(err) {
    yield put({
      type: LOAD_COMMENTS_FAILURE,
      error: err.message
    })
  }
}

function* removeComment(action) {
  try {
    const commentDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'posts', action.data.postId, 'comments', action.data.commentId)
    yield call(deleteDoc, commentDocRef)

    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: {
        postId: action.data.postId,
        commentId: action.data.commentId,
      },
    })
  } catch(err) {
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.message
    })
  }
}

function* loadChat(action) {
  try {
    yield put({
      type: LOAD_CHAT_SUCCESS,
      chatObj: action.chatObj,
    })
  } catch(err) {
    yield put({
      type: LOAD_CHAT_FAILURE,
      error: err.message
    })
  }
}

function* addChat(action) {
  try {
    const chatDocRef = yield call(doc,fbFirestore, action.data.group, 'group data', 'chats', action.data.chatId)
    yield call(setDoc, chatDocRef, action.data.chatObj)

    yield put({
      type: ADD_CHAT_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: ADD_CHAT_FAILURE,
      error: err.message
    })
  }
}

function* findGames(action) {
  try {
    let result = []
    let obj = {}

    for(let gameId of action.data.gamesArr) {
      obj = {}

      const gameDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'games', gameId)
      const gameDoc = yield call(getDoc, gameDocRef)
      const GAME_DATA = gameDoc.data()
      obj = {
        ...obj,
        id: GAME_DATA.id,
        playedDate: GAME_DATA.playedDate,
        writtenDate: GAME_DATA.writtenDate,
        winners: GAME_DATA.winners,
        losers: GAME_DATA.losers,
        winnerRatingAfter: GAME_DATA.winnerRatingAfter,
        loserRatingAfter: GAME_DATA.loserRatingAfter,
        winnerRatingBefore: GAME_DATA.winnerRatingBefore,
        loserRatingBefore: GAME_DATA.loserRatingBefore,
        percentage: GAME_DATA.percentage,
        ratingChange: GAME_DATA.ratingChange,
      }

      result = result.concat(obj)
    }

    yield put({
      type: FIND_GAMES_SUCCESS,
      result,
    })
  } catch(err) {
    yield put({
      type: FIND_GAMES_FAILURE,
      error: err.message
    })
  }
}

function* loadMemberGames(action) {
  try {
    let memberGamesArr = []
    let obj = {}

    for(let gameId of action.data.memberGamesArr) {
      obj = {}
      const gameDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', 'games', gameId)
      const gameDoc = yield call(getDoc, gameDocRef)

      const GAME_DATA = yield gameDoc.data()
      const GAME_EXISTS = yield gameDoc.exists()
      if(GAME_EXISTS) {
        obj = {
          ...obj,
          id: GAME_DATA.id,
          playedDate: GAME_DATA.playedDate,
          writtenDate: GAME_DATA.writtenDate,
          winners: GAME_DATA.winners,
          losers: GAME_DATA.losers,
          winnerRatingAfter: GAME_DATA.winnerRatingAfter,
          loserRatingAfter: GAME_DATA.loserRatingAfter,
          winnerRatingBefore: GAME_DATA.winnerRatingBefore,
          loserRatingBefore: GAME_DATA.loserRatingBefore,
          percentage: GAME_DATA.percentage,
          ratingChange: GAME_DATA.ratingChange,
        }
      }

      memberGamesArr = memberGamesArr.concat(obj)
    }

    yield put({
      type: LOAD_MEMBER_GAMES_SUCCESS,
      data: {
        memberId: action.data.memberId,
        memberGamesArr,
      },
    })
  } catch(err) {
    yield put({
      type: LOAD_MEMBER_GAMES_FAILURE,
      error: err.message
    })
  }
}

function* addMember(action) {
  try {
    // 그룹 - group data - members - 멤버
    const memberDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', action.data.uid)
    yield call(setDoc, memberDocRef, action.data.info)
   
    // whole users - 멤버 - awaiting groups - 그룹
    const userDocRef = yield call(doc, fbFirestore, 'whole users', action.dta.uid, 'awaiting groups', action.data.group)
    yield call(deleteDoc, userDocRef)

    yield put({
      type: EDIT_GROUP_INFO_REQUEST,
      data: {
        group: action.data.group,
        uid: action.data.uid,
      }
    })
    yield put({
      type: ADD_MEMBER_SUCCESS,
      data: action.data.info,
    })
  } catch(err) {
    yield put({
      type: ADD_MEMBER_FAILURE,
      error: err.message
    })
  }
}

function* removeMember(action) {
  try {
    const memberDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', action.data.uid)
    yield call(deleteDoc, memberDocRef)

    const adminDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'admins', action.data.uid)
    yield call(deleteDoc, adminDocRef)

    const joinedGroupDocRef = yield call(doc, fbFirestore, 'whole users', action.data.uid, 'joining groups', action.data.group)
    yield call(deleteDoc, joinedGroupDocRef)

    yield put({
      type: REMOVE_MEMBER_SUCCESS,
      data: action.data.uid,
    })
  } catch(err) {
    yield put({
      type: REMOVE_MEMBER_FAILURE,
      error: err.message
    })
  }
}

function* editGroupInfo(action) {
  try {
    const groupInfoDocRef = yield call(doc, fbFirestore, action.data.group, 'group information')
    const groupInfoDoc = yield call(getDoc, groupInfoDocRef)
    const GROUPINFO_DATA = groupInfoDoc.data()
    const NUMBER = GROUPINFO_DATA.numberOfMember
    yield call(setDoc, groupInfoDocRef, { numberOfMember: NUMBER + 1 }, { merge: true })

    yield put({
      type: REMOVE_AWAITOR_REQUEST,
      data: {
        group: action.data.group,
        uid: action.data.uid,
      }
    })
    yield put({
      type: EDIT_GROUP_INFO_SUCCESS,
      data: {
        number: NUMBER,
      }
    })
  } catch(err) {
    yield put({
      type: EDIT_GROUP_INFO_FAILURE,
      error: err.message
    })
  }
}

function* removeAwaitor(action) {
  try {
    const awaitorDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'awaitors', action.data.uid)
    yield call(deleteDoc, awaitorDocRef)

    yield put({
      type: REMOVE_AWAITOR_SUCCESS,
      data: {
        uid: action.data.uid,
      }
    })
  } catch(err) {
    yield put({
      type: REMOVE_AWAITOR_FAILURE,
      error: err.message
    })
  }
}

function* addJoinedGroup(action) {
  try {
    const groupDocRef = yield call(doc, fbFirestore, 'whole users', action.data.uid, 'joining groups', action.data.group)
    yield call(setDoc, groupDocRef, action.data.groupInfo)

    yield put({
      type: ADD_JOINED_GROUP_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: ADD_JOINED_GROUP_FAILURE,
      error: err.message
    })
  }
}

function* addAdmin(action) {
  try {
    const adminDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'admins', action.data.uid)
    yield call(setDoc, adminDocRef, action.data.info)

    const joinedGroupDocRef = yield call(doc, fbFirestore, 'whole users', action.data.uid, 'joining groups', action.data.group)
    yield call(setDoc, joinedGroupDocRef, { isAdmin: true }, { merge: true })

    yield put({
      type: ADD_ADMIN_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: ADD_ADMIN_FAILURE,
      error: err.message
    })
  }
}

function* addGame(action) {
  try {
    // 그룹 이름 - group data - games - gameId
    const gameDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'games', action.data.gameId)
    yield call(setDoc, gameDocRef, action.data.gameObj)

    yield put({
      type: ADD_GAME_IN_MEMBER_REQUEST,
      data: action.data,
    })
    yield put({
      type: ADD_GAME_SUCCESS,
    })
  } catch(err) {
    yield put({
      type: ADD_GAME_FAILURE,
      error: err.message
    })
  }
}

function* addGameInMember(action) {
  try {
    for(let memberId of action.data.winners) {
      // 그룹 이름 - group data - members - member - games - gameId
      const membeGamerDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', memberId, 'games', action.data.gameId)
      yield call(setDoc, membeGamerDocRef, action.data.gameObj)

      // 멤버의 전적 수정
      const memberDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', memberId)
      const memberDoc = yield call(getDoc, memberDocRef)
      const MEMBERDOC_DATA = memberDoc.data()
      yield call(setDoc, memberDocRef, {
        rating: MEMBERDOC_DATA.rating + action.data.gameObj.ratingChange,
        allGames: MEMBERDOC_DATA.allGames + 1,
        winnedGames: MEMBERDOC_DATA.winnedGames + 1,
      }, { merge: true })
    }

    for(let memberId of action.data.losers) {
      // 그룹 이름 - group data - members - member - games - gameId
      const membeGamerDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', memberId, 'games', action.data.gameId)
      yield call(setDoc, membeGamerDocRef, action.data.gameObj)

      // 멤버의 전적 수정
      const memberDocRef = yield call(doc, fbFirestore, action.data.group, 'group data', 'members', memberId)
      const memberDoc = yield call(getDoc, memberDocRef)
      const MEMBERDOC_DATA = memberDoc.data()
      yield call(setDoc, memberDocRef, {
        rating: MEMBERDOC_DATA.rating - action.data.gameObj.ratingChange,
        allGames: MEMBERDOC_DATA.allGames + 1,
        losedGames: MEMBERDOC_DATA.losedGames + 1,
      }, { merge: true })
    }

    yield put({
      type: ADD_GAME_IN_MEMBER_SUCCESS,
      data: {
        winners: action.data.winners,
        losers: action.data.losers,
        ratingChange: action.data.ratingChange,
      },
    })
  } catch(err) {
    yield put({
      type: ADD_GAME_IN_MEMBER_FAILURE,
      error: err.message
    })
  }
}

// function* loadUserGroup(action) {
//   try {

//     yield put({
//       type: ,
//       data: result,
//     })
//   } catch(err) {
//     yield put({
//       type: ,
//       error: err.message
//     })
//   }
// }

function* watchLoadJoinedGroups() {
  yield takeLatest(LOAD_JOINED_GROUPS_REQUEST, loadJoinedGroups)
}
function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
}
function* watchLoadMembers() {
  yield takeLatest(LOAD_MEMBERS_REQUEST, loadMembers)
}
function* watchLoadGames() {
  yield takeLatest(LOAD_GAMES_REQUEST, loadGames)
}
function* watchLoadGroupInfo() {
  yield takeLatest(LOAD_GROUP_INFO_REQUEST, loadGroupInfo)
}
function* watchLoadWholeGroups() {
  yield takeLatest(LOAD_WHOLE_GROUPS_REQUEST, loadWholeGroups)
}
function* watchLoadAwaitingGroups() {
  yield takeLatest(LOAD_AWAITING_GROUPS_REQUEST, loadAwaitingGroups)
}
function* watchAddAwaitor() {
  yield takeLatest(ADD_AWAITOR_REQUEST, addAwaitor)
}
function* watchCreateGroup() {
  yield takeLatest(CREATE_GROUP_REQUEST, createGroup)
}
function* watchLoadAwaitors() {
  yield takeLatest(LOAD_AWAITORS_REQUEST, loadAwaitors)
}
function* watchDownloadPostImageURL() {
  yield takeLatest(DOWNLOAD_POST_IMAGE_URL_REQUEST, downloadPostImageURL)
}
function* watchUploadPostImage() {
  yield takeLatest(UPLOAD_POST_IMAGE_REQUEST, uploadPostImage)
}
function* watchRemovePostImage() {
  yield takeLatest(REMOVE_POST_IMAGE_REQUEST, removePostImage)
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}
function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost)
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}
function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments)
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}
function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment)
}
function* watchLoadChat() {
  yield takeLatest(LOAD_CHAT_REQUEST, loadChat)
}
function* watchAddChat() {
  yield takeLatest(ADD_CHAT_REQUEST, addChat)
}
function* watchFindGames() {
  yield takeLatest(FIND_GAMES_REQUEST, findGames)
}
function* watchLoadMemberGames() {
  yield takeLatest(LOAD_MEMBER_GAMES_REQUEST, loadMemberGames)
}
function* watchAddMember() {
  yield takeLatest(ADD_MEMBER_REQUEST, addMember)
}
function* watchRemoveMember() {
  yield takeLatest(REMOVE_MEMBER_REQUEST, removeMember)
}
function* watchEditGroupInfo() {
  yield takeLatest(EDIT_GROUP_INFO_REQUEST, editGroupInfo)
}
function* watchRemoveAwaitor() {
  yield takeLatest(REMOVE_AWAITOR_REQUEST, removeAwaitor)
}
function* watchAddJoinedGroup() {
  yield takeLatest(ADD_JOINED_GROUP_REQUEST, addJoinedGroup)
}
function* watchAddAdmin() {
  yield takeLatest(ADD_ADMIN_REQUEST, addAdmin)
}
function* watchAddGame() {
  yield takeLatest(ADD_GAME_REQUEST, addGame)
}
function* watchAddGameInMember() {
  yield takeLatest(ADD_GAME_IN_MEMBER_REQUEST, addGameInMember)
}

export default function* userSaga() {
  yield all([
    fork(watchLoadJoinedGroups),
    fork(watchLoadPosts),
    fork(watchLoadMembers),
    fork(watchLoadGames),
    fork(watchLoadGroupInfo),
    fork(watchLoadWholeGroups),
    fork(watchLoadAwaitingGroups),
    fork(watchAddAwaitor),
    fork(watchCreateGroup),
    fork(watchLoadAwaitors),
    fork(watchUploadPostImage),
    fork(watchDownloadPostImageURL),
    fork(watchRemovePostImage),
    fork(watchAddPost),
    fork(watchEditPost),
    fork(watchRemovePost),
    fork(watchLoadComments),
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchLoadChat),
    fork(watchAddChat),
    fork(watchFindGames),
    fork(watchLoadMemberGames),
    fork(watchAddMember),
    fork(watchRemoveMember),
    fork(watchEditGroupInfo),
    fork(watchRemoveAwaitor),
    fork(watchAddJoinedGroup),
    fork(watchAddAdmin),
    fork(watchAddGame),
    fork(watchAddGameInMember),
  ])
}