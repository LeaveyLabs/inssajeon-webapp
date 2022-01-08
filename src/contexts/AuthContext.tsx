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

// ----------------------------------------------------------------------

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

enum Types {
  Initial = 'INITIALISE'
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

//const AuthContext = createContext<FirebaseContextType | null>(null); //TODO finish these authType checks. also need to edit authTypes.ts
const AuthContext = createContext<any>(null); 

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<any>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(firebaseAuth, async user => {
        if (user) {
          let UserInfo: UserEntity[] = await DataQuery.searchUserByUserID(user.uid)
          if (UserInfo.length === 1) {
            setProfile(UserInfo[0])
          }
          //no explicit handling of errors here.

          dispatch({ //a user is now signed in.
            type: Types.Initial,
            payload: { isAuthenticated: true, user }
          });
        } else { //a user is now signed out.
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null }
          });
        }
      }),
    [dispatch] //even though dispatch doesnt change and adding it to the dependency array here doesnt really do anything, it's needed for eslint checks because it's a variable that's referenced within useEffect
  );            //so, in reality, this useEffect only gets run on component mount, aka the listener only gets run on component mount.

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
  }

  //this function is only called on page after signup
  const createProfile = async (username: string, bio: string, picPath: string) => { //after user creates an auth account, they're immediately directed to "createProfile" page, which they MUST complete. completing this page creates their firestore account
    if (firebaseAuth.currentUser) {
      const userInfo: UserInfoEntity = {username: username, bio: bio, picPath: picPath, inssajeom: 0 }; //set picpath to -1 if no image available
      try {
        await ProfileInteraction.createProfile(userInfo, firebaseAuth.currentUser.uid);
        setProfile(userInfo)
      } catch (e) {
        throw(e);
      }
    }
    else {
      throw new Error("Auth info must exist in order to create a profile!")
    }
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

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.uid,
          email: auth.email,
          password: auth.password,
          username: profile?.username || '',
          bio: profile?.bio || '',
          picPath: profile?.picPath || '',
          inssajeom: profile?.inssajeom || 0,
        },
        login,
        register,
        createProfile,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateProfile: () => {}
      }}
    >
      {children /* consider only displaying children if !isLoading as shown in inssajeon-webapp-old*/ } 
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
