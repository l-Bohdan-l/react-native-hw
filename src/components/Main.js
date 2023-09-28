import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import useRoute from "../hooks/useRoute";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const dispatch = useDispatch();

  const { stateChange } = useSelector((state) => state.auth);
  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
