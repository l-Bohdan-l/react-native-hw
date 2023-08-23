import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserId } from "./authSlice";

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
          dispatch(updateUserId(user.uid));
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
          console.log("user", user);
          dispatch(updateUserId({ userId: user.uid }));
        }
      );
    } catch (error) {
      console.log("error", error);
      console.log("error", error.message);
    }
  };
export const authSignOut = (data) => async (dispatch, getState) => {};
