/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
//firebase
import { firebaseAuth } from 'src/firebase';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateEmail as updateUserEmail, updatePassword as updateUserPassword, sendPasswordResetEmail } from "firebase/auth";
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from './authTypes';

//db
import { DataQuery } from 'src/db/apis/DataQuery';
import { UserEntity } from 'src/db/entities/users/UserEntity';
import { ProfileInteraction } from '../db/apis/ProfileInteraction';
import { UserInfoEntity } from 'src/db/entities/users/UserInfoEntity';
//utils
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------------------------------------------

// const initialState: AuthState = {
//   isAuthenticated: false,
//   isInitialized: false,
//   user: null,
//   userAuth: null,
// };

// enum Types {
//   Initial = 'INITIALISE'
// }

// type FirebaseAuthPayload = {
//   [Types.Initial]: {
//     isAuthenticated: boolean;
//     userAuth: AuthUser;
//   };
// };

// type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

// const reducer = (authState: AuthState, user: UserEntity, action: FirebaseActions) => {
//   if (action.type === 'INITIALISE') {
//     const { isAuthenticated, userAuth } = action.payload;
//     return {
//       ...authState, //WHY DO WE HAVE DIS
//       isAuthenticated,
//       isInitialized: true,
//       userAuth
//     };
//   }

//   return authState;
// };

//const AuthContext = createContext<FirebaseContextType | null>(null); //TODO finish these authType checks. also need to edit authTypes.ts
const AuthContext = createContext<any>(null); 

function AuthProvider({ children }: { children: ReactNode }) {
  // const [state, dispatch] = useReducer(reducer, initialState); //auth-related properties of user only
  const [user, setUser] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect( //TODO i dont think i handle errors well here, fix this later. not urgent.
    () =>
      onAuthStateChanged(firebaseAuth, async firebaseAuthedUser => { //first called when firebase calls, then anytime auth state changes hereafter
        console.log("onauthstatechanged:" + firebaseAuthedUser)
        if (firebaseAuthedUser) {
          let userInfo: UserEntity[] = await DataQuery.searchUserByUserID(firebaseAuthedUser.uid);
          if (userInfo.length === 1) { //which it should, unless the user JUST registered for an account
            let newuser = {auth: firebaseAuthedUser, nonauth: userInfo[0]};
            setUser(newuser);
            setIsInitialized(false);
          } 
          else { //user account does not exist, so create it here
            const defaultUsername: string = 'inssa'+ uuidv4().slice(0,4);
            const userProfile: UserInfoEntity = {username: defaultUsername, bio: '', picPath: '', inssajeom: 0 }; 
            ProfileInteraction.createProfile(userProfile, firebaseAuthedUser.uid) //create firestore account associated with the same firebase auth uid
            .then(() => {
              DataQuery.searchUserByUserID(firebaseAuthedUser.uid) //TODO remove this extra firebase call if needed later on
              .then((userInfo: UserEntity[]) => {
                let newuser = {auth: firebaseAuthedUser, nonauth: userInfo[0]};
                setUser(newuser);
                setIsInitialized(false);
              }); 
            })
          }
        } else { //firebaseAuthedUser is null, meaning user is now signed out.
          setUser(null);
          setIsInitialized(false);
        }
      }),
    [ ] 
  );

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          throw(new Error( "입력하신 이메일을 쓰는 계정이 이미 있습니다."))
        } else if (errorCode === 'auth/invalid-email') {
          throw(new Error( "올바른 이메일 입력하세요."))
        } else {
          throw(new Error( "가입하는 데 오류가 발생했어요. 다른 이메일으로 시도해보세요."))
        }
      })
  }

  const logout = async () => {
    signOut(firebaseAuth);
  };

  const resetPassword = async (email: string) => {
    sendPasswordResetEmail(firebaseAuth, email);
  };

  const updateEmail = async (email: string) => {
    if (firebaseAuth.currentUser) {
      updateUserEmail(firebaseAuth.currentUser, email);
    } else {
      console.error("Can't update email when no user is signed in!")
    }
  }

  const updatePassword = (password: string) => {
    if (firebaseAuth.currentUser) {
      updateUserPassword(firebaseAuth.currentUser, password)
    } else {
      console.error("Can't update email when no user is signed in!")
    }
  } 

  const updateProfile = () => {
    //TODO
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateProfile,
      }}
    >
      {children} 
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
