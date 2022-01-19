/* eslint-disable import/no-duplicates */
import { confirmPasswordReset, createUserWithEmailAndPassword, deleteUser, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail as updateUserEmail, updatePassword as updateUserPassword, User, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from 'react';
//db
import { DataQuery } from 'src/db/apis/DataQuery';
import { UserEntity } from 'src/db/entities/users/UserEntity';
//firebase
import { firebaseAuth } from 'src/firebase';
//utils
import { v4 as uuidv4 } from 'uuid';
import { ProfileInteraction } from '../db/apis/ProfileInteraction';
import { UserProfileEntity } from '../db/entities/users/UserProfileEntity';

// ----------------------------------------------------------------------

type AuthedUser = {
  auth: User; //firebase auth user
  nonauth: UserEntity; //firestore user
}

export type AuthContextType = {
  isInitialized: boolean;
  authedUser: AuthedUser | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  deleteAccount: () => Promise<void>;
  logout: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  confirmResetPassword: (code: string, newPassword: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>; // why void?
  updatePassword: (password: string) => Promise<void>; // why void?
  updateProfile: (updatedUsername: string, updatedBio: string, updatedPicPath: string ) => Promise<void>;
  updateSettings: (updatedUsername: string, updatedBio: string, updatedPicPath: string ) => Promise<void>;
};


const AuthContext = createContext<AuthContextType | null>(null); 

function AuthProvider({ children }: { children: ReactNode }) {
  const [authedUser, setAuthedUser] = useState<AuthedUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect( //TODO i dont think i handle errors well here, fix this later. not urgent.
    () =>
      onAuthStateChanged(firebaseAuth, async firebaseAuthedUser => { //first called when firebase calls, then anytime auth state changes hereafter
        console.log("onauthstatechanged:" + firebaseAuthedUser)
        if (firebaseAuthedUser) {
          let userInfo: UserEntity[] = await DataQuery.searchUserByUserID(firebaseAuthedUser.uid);
          if (userInfo.length === 1) { //which it should, unless the user JUST registered for an account
            let newuser : AuthedUser = {auth: firebaseAuthedUser, nonauth: userInfo[0]};
            setAuthedUser(newuser);
            setIsInitialized(true);
          } 
          else { //user account does not exist, so create it here
            const defaultUsername: string = 'inssa'+ uuidv4().slice(0,4);
            const userProfile: UserProfileEntity = {username: defaultUsername, bio: '', picPath: '', inssajeom: 0 }; 
            ProfileInteraction.createAccount(userProfile, firebaseAuthedUser.uid) //create firestore account associated with the same firebase auth uid
            .then(() => {
              DataQuery.searchUserByUserID(firebaseAuthedUser.uid) //TODO remove this extra firebase call if needed later on
              .then((userInfo: UserEntity[]) => {
                let newuser : AuthedUser = {auth: firebaseAuthedUser, nonauth: userInfo[0]};
                setAuthedUser(newuser);
                setIsInitialized(true);
              }); 
            })
          }
        } else { //firebaseAuthedUser is null, meaning user is now signed out.
          setAuthedUser(null);
          setIsInitialized(true);
        }
      }),
    [ ] 
  );

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          throw(new Error( "올바른 이메일 입력하세요."))
        } else if (errorCode === 'auth/user-disabled') {
          throw(new Error( "이 사용자가 disabled."))
        } else if (errorCode === 'auth/user-not-found') {
          throw(new Error( "입력하신 이메일을 쓰는 계정이 없습니다. 가입하세요."))
        } else if (errorCode === 'auth/wrong-password') {
          throw(new Error( "비밀번로가 맞지 않습니다."))
        } else if (errorCode === 'auth/too-many-requests') {
          throw(new Error( "chill tf out lmao."))
        } 
        else {
          throw(new Error( "로그인하는 데 오류가 발생했어요. 또 다시 시도해보세요."))
        }
      });
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
    return signOut(firebaseAuth);
  };

  const deleteAccount = async () => {
    if(!firebaseAuth) return;
    if(!firebaseAuth.currentUser) return;
    await deleteUser(firebaseAuth.currentUser);
  }

  const sendResetEmail = async (email: string) => {
    return sendPasswordResetEmail(firebaseAuth, email)
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          throw(new Error( "입력하신 이메일을 쓰는 계정이 없습니다."))
        } else if (errorCode === 'auth/invalid-email') {
          throw(new Error( "올바른 이메일 입력하세요."))
        } else {
          throw(new Error( "오류가 발생했어요. 다른 이메일으로 시도해보세요."))
        }
      });
  };

  const confirmResetPassword = async (code: string, newPassword: string) => {
    return confirmPasswordReset(firebaseAuth, code, newPassword)
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/expired-action-code') {
          throw(new Error("링크가 만료되었습니다."));
        } else if (errorCode === 'auth/invalid-action-code') {
          throw(new Error('링크가 만료되었습니다.'));
        } else if (errorCode === 'auth/user-disabled') {
          throw(new Error('링크가 만료되었습니다.'));
        } else if (errorCode === 'auth/user-not-found') {
          throw(new Error('계정 찾을수 없었습니다.'));
        }
      });
  }

  //TODO need to update email on client side too
  const updateEmail = async (email: string) => {
    if (firebaseAuth.currentUser) {
      updateUserEmail(firebaseAuth.currentUser, email);
    } else {
      console.error("Can't update email when no user is signed in!")
    }
  }

  //TODO need to update password on client side too
  const updatePassword = async (password: string) => {
    if (firebaseAuth.currentUser) {
      updateUserPassword(firebaseAuth.currentUser, password)
    } else {
      console.error("Can't update email when no user is signed in!")
    }
  } 

  //TODO combine update username/bio/picPath into one api call to reduce firebase api calls?
  const updateProfile = async ( updatedUsername: string, updatedBio: string, updatedPicPath: string ) => {
    if (authedUser) {
      try {
        //firebase
        // await ProfileInteraction.setBio();
        // await ProfileInteraction.setPic();
        await ProfileInteraction.setUsername(authedUser.auth.uid, updatedUsername); 
        
        //client side
        setAuthedUser((prevState : AuthedUser | null) => {
          if (!prevState) {
            console.error("업데이트 하기 전에 로그인해야 된다.");
            return prevState;
          } else {
            let oldUserNonauth: UserEntity = prevState.nonauth;
            oldUserNonauth.profile.username = updatedUsername;
            oldUserNonauth.profile.bio = updatedBio;
            oldUserNonauth.profile.picPath = updatedPicPath;
            let updatedUser : AuthedUser = {auth: prevState.auth, nonauth: oldUserNonauth};
            return updatedUser;
          }
        })
      } catch (error: any) {
        console.log(error.message);
      }
    } else {
      console.error("업데이트 하기 전에 로그인하야 된다.")
    }
  }

  const updateSettings = async () => {

  }
  

  return (
    <AuthContext.Provider
      value={{
        authedUser,
        isInitialized,
        login,
        signup,
        logout,
        sendResetEmail,
        confirmResetPassword,
        updateEmail,
        updatePassword,
        updateProfile,
        updateSettings,
        deleteAccount,
      }}
    >
      {children} 
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
