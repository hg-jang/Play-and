export const initialState = {
  isJoinedGroupsLoading: false,     // 유저가 가입된 그룹 목록 가져오기
  isJoinedGroupsLoaded: false,
  joinedGroupsLoadError: null,
  isPostsLoading: false,         // 포스트 목록 가져오기
  isPostsLoaded: false,
  postsLoadError: null,
  isMembersLoading: false,       // 멤버 목록 가져오기
  isMembersLoaded: false,
  membersLoadError: null,
  isGamesLoading: false,         // 게임 기록 가져오기
  isGamesLoaded: false,
  gamesLoadError: null,
  isGroupInfoLoading: false,     // 그룹 정보 가져오기
  isGroupInfoLoaded: false,
  groupInfoLoadError: null,
  isAwaitorsLoading: false,      // 가임 대기자 목록 가져오기
  isAwaitorsLoaded: false,
  awaitorsLoadError: null,
  isWholeGroupsLoading: false,   // 모든 그룹 목록 가져오기
  isWholeGroupsLoaded: false,
  wholeGroupsLoadError: null,
  isAwaitingGroupsLoading: false,   // 가입 대기중인 그룹 목록 가져오기
  isAwaitingGroupsLoaded: false,
  awaitingGroupsLoadError: null,
  isAwaitorAdding: false,           // 가입 대기자 추가
  isAwaitorAdded: false,
  awaitorAddError: null,
  isGroupCreating: false,           // 그룹 생성 요청
  isGroupCreated: false,
  groupCreateError: null,
  
  isPostImageUploading: false,         // 포스트 이미지 업로드
  isPostImageUploaded: false,
  postImageUploadError: null,
  isPostImageURLDownloading: false,   // 포스트 이미지 경로 다운로드
  isPostImageURLDownloaded: false,
  postImageURLDownloadError: null,
  isPostImageRemoving: false,         // 포스트 이미지 제거
  isPostImageRemoved: false,
  postImageRemoveError: null,
  isPostAdding: false,                // 포스트 추가
  isPostAdded: false,
  postAddError: null,
  isPostEditing: false,               // 포스트 수정
  isPostEdited: false,
  postEditError: null,
  isPostRemoving: false,              // 포스트 삭제
  isPostRemoved: false,
  postRemoveError: null,
  isCommentsLoading: false,           // 코멘트 불러오기
  isCommentsLoaded: false,
  commentsLoadError: null,
  isCommentAdding: false,             // 코멘트 추가
  isCommentAdded: false,
  commentAddError: null,
  isCommentRemoving: false,           // 코멘트 제거
  isCommentRemoved: false,
  commentRemoveError: null,
  isChatLoading: false,               // 채팅 로드
  isChatLoaded: false,
  chatLoadError: null,
  isChatAdding: false,                // 채팅 추가
  isChatAdded: false,
  chatAddError: null,
  isGamesFinding: false,              // 특정 날짜 게임 찾기
  isGamesFinded: false,
  gamesFindError: null,

  isMemberGamesLoading: false,         // 특정 멤버의 게임 기록 가져오기
  isMemberGamesLoaded: false,
  memberGamesLoadError: null,

  isMemberAdding: false,               // 멤버 추가
  isMemberAdded: false,
  memberAddError: null,
  isMemberRemoving: false,             // 멤버 제거
  isMemberRemoved: false,
  memberRemoveError: null,
  isGroupInfoEditing: false,           // 그룹 정보 수정
  isGroupInfoEdited: false,
  groupInfoEditError: null,
  isAwaitorRemoving: false,            // 가입 대기자 처리
  isAwaitorRemoved: false,
  awaitorRemoveError: null,
  isJoinedGroupAdding: false,          // 유저의 가입한 그룹 목록에 추가
  isJoinedGroupAdded: false,
  joinedGroupAddError: null,
  isAdminAdding: false,                // 관리자 추가
  isAdminAdded: false,
  adminAddError: null,
  isGameAdding: false,                 // 게임 추가
  isGameAdded: false,
  gameAddError: null,
  isGameAddingInMember: false,         // 멤버 문서에 게임 추가
  isGameAddedInMember: false,
  gameAddErrorInMember: null,

  content: 'admin-dashboard',    // admin 현재 컨텐트
  postImageURLs: [],             // 포스트 이미지 목록
  wholeGroups: null,             // 전체 그룹 목록
  joinedGroups: null,            // 가입된 그룹 목록
  awaitingGroups: null,          // 가입 신청한 그룹 목록
  currentGroup: {
    games: [],
    members: [],
  },            // 현재 그룹
  detailedMember: null,          // 멤버 상세 정보 대상
}



export const LOAD_GROUP_REQUEST = 'LOAD_GROUP_REQUEST'
export const LOAD_GROUP_SUCCESS = 'LOAD_GROUP_SUCCESS'
export const LOAD_GROUP_FAILURE = 'LOAD_GROUP_FAILURE'

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const LOAD_MEMBERS_REQUEST = 'LOAD_MEMBERS_REQUEST'
export const LOAD_MEMBERS_SUCCESS = 'LOAD_MEMBERS_SUCCESS'
export const LOAD_MEMBERS_FAILURE = 'LOAD_MEMBERS_FAILURE'

export const LOAD_GAMES_REQUEST = 'LOAD_GAMES_REQUEST'
export const LOAD_GAMES_SUCCESS = 'LOAD_GAMES_SUCCESS'
export const LOAD_GAMES_FAILURE = 'LOAD_GAMES_FAILURE'

export const LOAD_JOINED_GROUPS_REQUEST = 'LOAD_JOINED_GROUPS_REQUEST'
export const LOAD_JOINED_GROUPS_SUCCESS = 'LOAD_JOINED_GROUPS_SUCCESS'
export const LOAD_JOINED_GROUPS_FAILURE = 'LOAD_JOINED_GROUPS_FAILURE'

export const LOAD_GROUP_INFO_REQUEST = 'LOAD_GROUP_INFO_REQUEST'
export const LOAD_GROUP_INFO_SUCCESS = 'LOAD_GROUP_INFO_SUCCESS'
export const LOAD_GROUP_INFO_FAILURE = 'LOAD_GROUP_INFO_FAILURE'

export const LOAD_WHOLE_GROUPS_REQUEST = 'LOAD_WHOLE_GROUPS_REQUEST'
export const LOAD_WHOLE_GROUPS_SUCCESS = 'LOAD_WHOLE_GROUPS_SUCCESS'
export const LOAD_WHOLE_GROUPS_FAILURE = 'LOAD_WHOLE_GROUPS_FAILURE'

export const LOAD_AWAITING_GROUPS_REQUEST = 'LOAD_AWAITING_GROUPS_REQUEST'
export const LOAD_AWAITING_GROUPS_SUCCESS = 'LOAD_AWAITING_GROUPS_SUCCESS'
export const LOAD_AWAITING_GROUPS_FAILURE = 'LOAD_AWAITING_GROUPS_FAILURE'

export const ADD_AWAITOR_REQUEST = 'ADD_AWAITOR_REQUEST'
export const ADD_AWAITOR_SUCCESS = 'ADD_AWAITOR_SUCCESS'
export const ADD_AWAITOR_FAILURE = 'ADD_AWAITOR_FAILURE'

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE'

export const LOAD_AWAITORS_REQUEST = 'LOAD_AWAITORS_REQUEST'
export const LOAD_AWAITORS_SUCCESS = 'LOAD_AWAITORS_SUCCESS'
export const LOAD_AWAITORS_FAILURE = 'LOAD_AWAITORS_FAILURE'

export const  UPLOAD_POST_IMAGE_REQUEST = 'UPLOAD_POST_IMAGE_REQUEST'
export const  UPLOAD_POST_IMAGE_SUCCESS = 'UPLOAD_POST_IMAGE_SUCCESS'
export const  UPLOAD_POST_IMAGE_FAILURE = 'UPLOAD_POST_IMAGE_FAILURE'

export const DOWNLOAD_POST_IMAGE_URL_REQUEST = 'DOWNLOAD_POST_IMAGE_URL_REQUEST'
export const DOWNLOAD_POST_IMAGE_URL_SUCCESS = 'DOWNLOAD_POST_IMAGE_URL_SUCCESS'
export const DOWNLOAD_POST_IMAGE_URL_FAILURE = 'DOWNLOAD_POST_IMAGE_URL_FAILURE'

export const REMOVE_POST_IMAGE_REQUEST = 'REMOVE_POST_IMAGE_REQUEST'
export const REMOVE_POST_IMAGE_SUCCESS = 'REMOVE_POST_IMAGE_SUCCESS'
export const REMOVE_POST_IMAGE_FAILURE = 'REMOVE_POST_IMAGE_FAILURE'

export const INIT_IMAGEURLS = 'INIT_IMAGEURLS'

export const ADD_POST_REQUEST ='ADD_POST_REQUEST'
export const ADD_POST_SUCCESS ='ADD_POST_SUCCESS'
export const ADD_POST_FAILURE ='ADD_POST_FAILURE'

export const SET_POST_EDIT = 'SET_POST_EDIT'

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST'
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS'
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST'
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS'
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST'
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS'
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE'

export const LOAD_CHAT_REQUEST = 'LOAD_CHAT_REQUEST'
export const LOAD_CHAT_SUCCESS = 'LOAD_CHAT_SUCCESS'
export const LOAD_CHAT_FAILURE = 'LOAD_CHAT_FAILURE'

export const ADD_CHAT_REQUEST = 'ADD_CHAT_REQUEST'
export const ADD_CHAT_SUCCESS = 'ADD_CHAT_SUCCESS'
export const ADD_CHAT_FAILURE = 'ADD_CHAT_FAILURE'

export const SET_MEMBER = 'SET_MEMBER'

export const FIND_GAMES_REQUEST = 'FIND_GAMES_REQUEST'
export const FIND_GAMES_SUCCESS = 'FIND_GAMES_SUCCESS'
export const FIND_GAMES_FAILURE = 'FIND_GAMES_FAILURE'

export const LOAD_MEMBER_GAMES_REQUEST = 'LOAD_MEMBER_GAMES_REQUEST'
export const LOAD_MEMBER_GAMES_SUCCESS = 'LOAD_MEMBER_GAMES_SUCCESS'
export const LOAD_MEMBER_GAMES_FAILURE = 'LOAD_MEMBER_GAMES_FAILURE'

export const CHANGE_CONTENT = 'CHANGE_CONTENT'

// used in admin page
export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST'
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS'
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE'

export const REMOVE_MEMBER_REQUEST = 'REMOVE_MEMBER_REQUEST'
export const REMOVE_MEMBER_SUCCESS = 'REMOVE_MEMBER_SUCCESS'
export const REMOVE_MEMBER_FAILURE = 'REMOVE_MEMBER_FAILURE'

export const EDIT_GROUP_INFO_REQUEST = 'EDIT_GROUP_INFO_REQUEST'
export const EDIT_GROUP_INFO_SUCCESS = 'EDIT_GROUP_INFO_SUCCESS'
export const EDIT_GROUP_INFO_FAILURE = 'EDIT_GROUP_INFO_FAILURE'

export const REMOVE_AWAITOR_REQUEST = 'REMOVE_AWAITOR_REQUEST'
export const REMOVE_AWAITOR_SUCCESS = 'REMOVE_AWAITOR_SUCCESS'
export const REMOVE_AWAITOR_FAILURE = 'REMOVE_AWAITOR_FAILURE'

export const ADD_JOINED_GROUP_REQUEST = 'ADD_JOINED_GROUP_REQUEST'
export const ADD_JOINED_GROUP_SUCCESS = 'ADD_JOINED_GROUP_SUCCESS'
export const ADD_JOINED_GROUP_FAILURE = 'ADD_JOINED_GROUP_FAILURE'

export const ADD_ADMIN_REQUEST = 'ADD_ADMIN_REQUEST'
export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS'
export const ADD_ADMIN_FAILURE = 'ADD_ADMIN_FAILURE'

export const ADD_GAME_REQUEST = 'ADD_GAME_REQUEST'
export const ADD_GAME_SUCCESS = 'ADD_GAME_SUCCESS'
export const ADD_GAME_FAILURE = 'ADD_GAME_FAILURE'

export const ADD_GAME_IN_MEMBER_REQUEST = 'ADD_GAME_IN_MEMBER_REQUEST'
export const ADD_GAME_IN_MEMBER_SUCCESS = 'ADD_GAME_IN_MEMBER_SUCCESS'
export const ADD_GAME_IN_MEMBER_FAILURE = 'ADD_GAME_IN_MEMBER_FAILURE'


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_JOINED_GROUPS_REQUEST:
      return {
        ...state,
        isJoinedGroupsLoading: true,
        isJoinedGroupsLoaded: false,
        joinedGroupsLoadError: null,
      }
    case LOAD_JOINED_GROUPS_SUCCESS:
      return {
        ...state,
        isJoinedGroupsLoading: false,
        isJoinedGroupsLoaded: true,
        joinedGroups: action.data,
      }
    case LOAD_JOINED_GROUPS_FAILURE:
      return {
        isJoinedGroupsLoading: false,
        joinedGroupsLoadError: action.error,
      }
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        isPostsLoading: true,
        isPostsLoaded: false,
        postsLoadError: null,
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        isPostsLoading: false,
        isPostsLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          posts: action.data,
        }
      }
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        isPostsLoading: false,
        postsLoadError: action.error,
      }
    case LOAD_MEMBERS_REQUEST:
      return {
        ...state,
        isMembersLoading: true,
        isMembersLoaded: false,
        membersLoadError: null,
      }
    case LOAD_MEMBERS_SUCCESS:
      console.log('reducer :', action.data);
      return {
        ...state,
        isMembersLoading: false,
        isMembersLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          members: action.data,
        }
      }
    case LOAD_MEMBERS_FAILURE:
      return {
        ...state,
        isMembersLoading: false,
        membersLoadError: action.error,
      }
    case LOAD_GAMES_REQUEST:
      return {
        ...state,
        isGamesLoading: true,
        isGamesLoaded: false,
        gamesLoadError: null,
      }
    case LOAD_GAMES_SUCCESS:
      return {
        ...state,
        isGamesLoading: false,
        isGamesLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          games: action.data,
        }
      }
    case LOAD_GAMES_FAILURE:
      return {
        ...state,
        isGamesLoading: false,
        gamesLoadError: action.error,
      }
    case LOAD_GROUP_INFO_REQUEST:
      return {
        ...state,
        isGroupInfoLoading: true,
        isGroupInfoLoaded: false,
        groupInfoLoadError: null,
      }
    case LOAD_GROUP_INFO_SUCCESS:
      return {
        ...state,
        isGroupInfoLoading: false,
        isGroupInfoLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          createdDate: action.data.createdDate,
          groupIntroduce: action.data.groupIntroduce,
          groupName: action.data.groupName,
          numberOfMember: action.data.numberOfMember,
        }
      }
    case LOAD_GROUP_INFO_FAILURE:
      return {
        ...state,
        isGroupInfoLoading: false,
        groupInfoLoadError: action.error,
      }
    case LOAD_WHOLE_GROUPS_REQUEST:
      return {
        ...state,
        isWholeGroupsLoading: true,
        isWholeGroupsLoaded: false,
        wholeGroupsLoadError: null,
      }
    case LOAD_WHOLE_GROUPS_SUCCESS:
      return {
        ...state,
        isWholeGroupsLoading: false,
        isWholeGroupsLoaded: true,
        wholeGroups: action.data,
      }
    case LOAD_WHOLE_GROUPS_FAILURE:
      return {
        ...state,
        isWholeGroupsLoading: false,
        wholeGroupsLoadError: action.error,
      }
    case LOAD_AWAITING_GROUPS_REQUEST:
      return {
        ...state,
        isAwaitingGroupsLoading: true,
        isAwaitingGroupsLoaded: false,
        awaitingGroupsLoadError: null,
      }
    case LOAD_AWAITING_GROUPS_SUCCESS:
      return {
        ...state,
        isAwaitingGroupsLoading: false,
        isAwaitingGroupsLoaded: true,
        awaitingGroups: action.data,
      }
    case LOAD_AWAITING_GROUPS_FAILURE:
      return {
        ...state,
        isAwaitingGroupsLoading: false,
        awaitingGroupsLoadError: action.error,
      }
    case ADD_AWAITOR_REQUEST:
      return {
        ...state,
        isAwaitorAdding: true,
        isAwaitorAdded: false,
        awaitorAddError: null,
      }
    case ADD_AWAITOR_SUCCESS:
      return {
        ...state,
        isAwaitorAdding: false,
        isAwaitorAdded: true,
      }
    case ADD_AWAITOR_FAILURE:
      return {
        ...state,
        isAwaitorAdding: false,
        awaitorAddError: action.error,
      }
    case CREATE_GROUP_REQUEST:
      return {
        ...state,
        isGroupCreating: true,
        isGroupCreated: false,
        createGroupError: null,
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        isGroupCreating: false,
        isGroupCreated: true,
        wholeGroups: [...wholeGroups, {
          groupName: action.data.groupName,
          groupIntroduce: action.data.groupIntroduce,
        }]
      }
    case CREATE_GROUP_FAILURE:
      return {
        ...state,
        isGroupCreating: false,
        createGroupError: action.error,
      }
    case LOAD_AWAITORS_REQUEST:
      return {
        ...state,
        isAwaitorsLoading: true,
        isAwaitorsLoaded: false,
        awaitorsLoadError: null,
      }
    case LOAD_AWAITORS_SUCCESS:
      return {
        ...state,
        isAwaitorsLoading: false,
        isAwaitorsLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          awaitors: action.data,
        }
      }
    case LOAD_AWAITORS_FAILURE:
      return {
        ...state,
        isAwaitorsLoading: false,
        awaitorsLoadError: action.error,
      }
    case UPLOAD_POST_IMAGE_REQUEST:
      return {
        ...state,
        isPostImageUploading: true,
        isPostImageUploaded: false,
        postImageUploadError: null,
      }
    case UPLOAD_POST_IMAGE_SUCCESS:
      return {
        ...state,
        isPostImageUploading: false,
        isPostImageUploaded: true,
      }
    case UPLOAD_POST_IMAGE_FAILURE:
      return {
        ...state,
        isPostImageUploading: false,
        postImageUploadError: action.error,
      }
    case DOWNLOAD_POST_IMAGE_URL_SUCCESS:
      return {
        ...state,
        isPostImageURLDownloading: false,
        isPostImageURLDownloaded: true,
        postImageURLs: 
        state.postImageURLs.length === 0 ? 
        // 첫 사진 추가일 경우
          [
            ...state.postImageURLs, {
              id: action.data.id,
              imageURLs: [{ url: action.data.url, ref: action.data.ref }]
            }
          ]
          // 두 번째 사진 추가부터
          :
          state.postImageURLs.map((postImageURL) => {
            if(postImageURL.id === action.data.id) {
              return {
                ...postImageURL,
                imageURLs: [...postImageURL.imageURLs, { url: action.data.url, ref: action.data.ref }]
              }
            } else {
              return postImageURL
            }
          })
      }
    case DOWNLOAD_POST_IMAGE_URL_FAILURE:
      return {
        ...state,
        isImageURLDownloading: false,
        imageURLDownloadError: action.error,
      }
    case REMOVE_POST_IMAGE_REQUEST:
      return {
        ...state,
        isPostImageRemoving: true,
        isPostImageRemoved: false,
        postImageRemoveError: null,
      }
    case REMOVE_POST_IMAGE_SUCCESS:
      return {
        ...state,
        isPostImageRemoving: false,
        isPostImageRemoved: true,
        postImageURLs: state.postImageURLs.map((postImageURL) => {
          if(postImageURL.id === action.data.id) {
            return {
              ...postImageURL,
              imageURLs: postImageURL.imageURLs.filter((imageURL) => imageURL.ref !== action.data.ref)
            }
          }
          return postImageURL
        }),
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id === action.data.id) {
              return {
                ...post,
                imageURLs: post.imageURLs.filter((imageURL) => imageURL.ref !== action.data.ref)
              }
            } else {
              return post
            }
          })
        }
      }
    case REMOVE_POST_IMAGE_FAILURE:
      return {
        ...state,
        isImageRemoving: false,
        imageRemoveError: action.error,
      }
    case INIT_IMAGEURLS:
      return {
        ...state,
        postImageURLs: state.postImageURLs.filter((v) => v.id !== action.data),
      }
    case ADD_POST_REQUEST:
      return {
        ...state,
        isPostAdding: true,
        isPostAdded: false,
        postAddError: null,
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isPostAdding: false,
        isPostAdded: true,
        currentGroup: {
          ...state.currentGroup,
          posts: [action.data, ...state.currentGroup.posts]
        }
      }
    case ADD_POST_FAILURE:
      return {
        ...state,
        isPostAdding: false,
        postAddError: action.error,
      }
    case SET_POST_EDIT:
      // 기존 포스트의 사진 목록이 있는지 가져오기
      const prev = state.currentGroup.posts.find((post) => post.id === action.postId)?.imageURLs.concat()
      return {
        ...state,
        postImageURLs: [...state.postImageURLs, {
          id: action.postId,
          imageURLs: prev ? prev : [],
        }]
      }
    case EDIT_POST_REQUEST:
      return {
        ...state,
        isPostEditing: true,
        isPostEdited: false,
        postEditError: null,
      }
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        isPostEditing: false,
        isPostEdited: true,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) { return post }
            return {
              ...post,
              content: action.data.content,
              imageURLs: action.data.imageURLs,
            }
          })
        }
      }
    case EDIT_POST_FAILURE:
      return {
        isPostEditing: false,
        postEditError: action.error,
      }
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        isPostRemoving: true,
        isPostRemoved: false,
        postRemoveError: null,
      }
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        isPostRemoving: false,
        isPostRemoved: true,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.filter((post) => post.id !== action.postId)
        }
      }
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        isPostRemoving: false,
        postRemoveError: action.error,
      }
    case LOAD_COMMENTS_REQUEST:
      return {
        ...state,
        isCommentsLoading: true,
        isCommentsLoaded: false,
        commentsLoadError: null,
      }
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        iscommentsLoading: false,
        isCommentsLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) { return post }
            return {
              ...post,
              comments: action.data.result,
            }
          })
        }
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isCommentAdding: true,
        isCommentAdded: false,
        commentAddError: null,  
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        iscommentAdding: false,
        isCommentAdded: true,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) { return post }
            return {
              ...post,
              comments: [action.data.commentObj, ...post.comments]
            }
          })
        }
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isCommentAdding: false,
        commentAddError: action.error,
      }
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        isCommentRemoving: true,
        iscommentRemoved: false,
        commentRemoveError: null,
      }
    case REMOVE_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentRemoving: false,
        isCommentRemoved: true,
        currentGroup: {
          ...state.currentGroup,
          posts: state.currentGroup.posts.map((post) => {
            if(post.id !== action.data.postId) { return post }
            return {
              ...post,
              comments: post.comments.filter((c) => c.id !== action.data.commentId)
            }
          })
        }
      }
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        isCommentRemoving: false,
        commentRemoveError: null,
      }
    case LOAD_CHAT_REQUEST:
      return {
        ...state,
        isChatAdding: true,
        isChatAdded: false,
        chatAddError: null,
      }
    case LOAD_CHAT_SUCCESS:
      return {
        ...state,
        isChatAdding: false,
        isChatAdded: true,
        currentGroup: {
          ...state.currentGroup,
          chats: typeof state.currentGroup.chats !== "undefined" ? [...state.currentGroup.chats, action.chatObj] : [action.chatObj]
        }
      }
    case LOAD_CHAT_FAILURE:
      return {
        ...state,
        isChatAdding: false,
        chatAddError: action.error,
      }
    case ADD_CHAT_REQUEST:
      return {
        ...state,
        isChatAdding: true,
        isChatAdded: false,
        chatLoadError: null,
      }
    case ADD_CHAT_SUCCESS:
      return {
        ...state,
        isChatAdding: false,
        isChatAdded: true,
      }
    case ADD_CHAT_FAILURE:
      return {
        ...state,
        isChatAdding: false,
        chatAddError: action.error,
      }
    case SET_MEMBER:
      return {
        ...state,
        detailedMember: action.data,
      }
    case FIND_GAMES_REQUEST:
      return {
        ...state,
        isGamesFinding: true,
        isGamesFinded: false,
        gamesFindError: null,
      }
    case FIND_GAMES_SUCCESS:
      return {
        ...state,
        isGamesFinding: false,
        isGamesFinded: true,
        currentGroup: {
          ...state,
          findedGames: action.result,
        }
      }
    case FIND_GAMES_FAILURE:
      return {
        ...state,
        isGamesFinding: false,
        gamesFindError: action.error,
      }
    case LOAD_MEMBER_GAMES_REQUEST:
      return {
        ...state,
        isMemberGamesLoading: true,
        isMemberGamesLoaded: false,
        memberGamesLoadError: null,
      }
    case LOAD_MEMBER_GAMES_SUCCESS:
      return {
        ...state,
        isMemberGamesLoading: false,
        isMemberGamesLoaded: true,
        currentGroup: {
          ...state.currentGroup,
          members: state.currentGroup.members.map((m) => {
            if(m.uid !== action.data.memberId) { return m }
            return {
              ...m,
              games: action.data.memberGamesArr
            }
          })
        } 
      }
    case LOAD_MEMBER_GAMES_FAILURE:
      return {
        ...state,
        isMemberGamesLoading: false,
        memberGamesLoadError: action.error,
      }
    case CHANGE_CONTENT:
      return {
        ...state,
        content: action.content,
      }
    case ADD_MEMBER_REQUEST:
      return {
        ...state,
        isMemberAdding: true,
        isMemberAdded: false,
        memberAddError: null,
      }
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        isMemberAdding: false,
        isMemberAdded: true,
        currentGroup: {
          ...state.currentGroup,
          members: [...state.currentGroup.members, action.data]
        }
      }
    case ADD_MEMBER_FAILURE:
      return {
        ...state,
        isMemberAdding: false,
        memberAddError: action.error,
      }
    case EDIT_GROUP_INFO_REQUEST:
      return {
        ...state,
        isGroupInfoEditing: true,
        isGroupInfoEdited: false,
        groupInfoEditError: null,
      }
    case EDIT_GROUP_INFO_SUCCESS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          numberOfMember: number + 1,
        },
        isGroupInfoEditing: false,
        isGroupInfoEdited: true,
      }
    case EDIT_GROUP_INFO_FAILURE:
      return {
        ...state,
        isGroupInfoEditing: false,
        groupInfoEditError: action.error,
      }
    case REMOVE_AWAITOR_REQUEST:
      return {
        ...state,
        isAwaitorRemoving: true,
        isAwaitorRemoved: false,
        awaitorRemoveError: null,
      }
    case REMOVE_AWAITOR_SUCCESS:
      return {
        ...state,
        isAwaitorRemoving: false,
        isAwaitorRemoved: true,
        currentGroup: {
          ...state.currentGroup,
          awaitors: state.currentGroup.awaitors.filter((a) => a.uid !== action.data.uid)
        }
      }
    case REMOVE_AWAITOR_FAILURE:
      return {
        ...state,
        isAwaitorRemoving: false,
        awaitorRemoveError: action.error,
      }
    case ADD_JOINED_GROUP_REQUEST:
      return {
        ...state,
        isJoinedGroupAdding: true,
        isJoinedGroupAdded: false,
        joinedGroupAddError: null,
      }
    case ADD_JOINED_GROUP_SUCCESS:
      return {
        ...state,
        isJoinedGroupAdding: false,
        isJoinedGroupAdded: true,
      }
    case ADD_JOINED_GROUP_FAILURE:
      return {
        ...state,
        isJoinedGroupAdding: false,
        joinedGroupAdderror: action.error,
      }
    case ADD_ADMIN_REQUEST:
      return {
        ...state,
        isAdminAdding: true,
        isAdminAdded: false,
        adminAddError: null,
      }
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        isAdminAdding: false,
        isAdminAdded: true,
      }
    case ADD_ADMIN_FAILURE:
      return {
        ...state,
        isAdminAdding: false,
        adminAddError: action.error,
      }
    case ADD_GAME_REQUEST:
      return {
        ...state,
        isGameAdding: true,
        isGameAdded: false,
        gameAddError: null,
      }
    case ADD_GAME_SUCCESS:
      return {
        ...state,
        isGameAdding: false,
        isGameAdded: true,
      }
    case ADD_GAME_FAILURE:
      return {
        ...state,
        isGameAdding: false,
        gameAddError: action.error,
      }
    case ADD_GAME_IN_MEMBER_REQUEST:
      return {
        ...state,
        isGameAddingInMember: true,
        isGameAddedInMember: false,
        gameAddErrorInMember: null,
      }
    case ADD_GAME_IN_MEMBER_SUCCESS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: state.currentGroup.members.map((m) => {
            if(action.data.winners.includes(m.uid)) {
              return {
                ...m,
                rating: m.rating + action.data.ratingChange,
                allGames: m.allGames + 1,
                winnedGames: m.winnedGames + 1,
              }
            }
            else if(action.data.losers.includes(m.uid)) {
              return {
                ...m,
                rating: m.rating - action.data.ratingChange,
                allGames: m.allGames + 1,
                losedGames: m.losedGames + 1,
              }
            }
            else { return m }
          })
        },
        isGameAddingInMember: false,
        isGameAddedInMember: true,
      }
    case ADD_GAME_IN_MEMBER_FAILURE:
      return {
        ...state,
        isGameAddingInMember: false,
        gameAddErrorInMember: action.error,
      }
    default:
      return state
  }
}

export default reducer