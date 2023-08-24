import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile } from "./authSlice";

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    console.log(login, email, password);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user", user);
          dispatch(updateUserProfile(user.uid));
        }
      );
    } catch (error) {
      console.log("error", error);
      console.log("error", error.message);
    }
  };
export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    console.log(login, email, password);
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
export const authSignOut = (data) => async (dispatch, getState) => {};
