import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import {
  authStateChange,
  authUserSignOut,
  updateUserProfile,
} from "./authSlice";

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log("sign in", email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);
          // dispatch(updateUserProfile(user.uid));
        }
      );
      const user = auth.currentUser;
      // await updateProfile(user, { displayName: login });
      // console.log("user", user);
      // dispatch(
      //   updateUserProfile({ userId: user.uid, nickname: user.displayName })
      // );
    } catch (error) {
      console.log("error", error);
      console.log("error", error.message);
    }
  };
export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log("signup", login, email, password);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("user", user);
          // dispatch(updateUserProfile({ userId: user.uid }));
        }
      );
      const user = auth.currentUser;
      await updateProfile(user, { displayName: login });
      console.log("user", user);
      dispatch(
        updateUserProfile({ userId: user.uid, nickname: user.displayName })
      );
    } catch (error) {
      console.log("error", error);
      console.log("error", error.message);
    }
  };
export const authSignOut = (data) => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authUserSignOut());
  } catch (error) {
    console.log("error", error);
    console.log("error", error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("change user", user);
        dispatch(
          updateUserProfile({ userId: user.uid, nickname: user.displayName })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log(" authStateChangeUser error", error);
    console.log("authStateChangeUser error", error.message);
  }
};
