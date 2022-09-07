import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Private } from "./Layout/Private/Private";
import { Public } from "./Layout/Public/Public";
import { utils as UtilsActions } from "../services/Utils/UtilsActions";

export default function App() {
  const dispatch = useDispatch();
  const { authentication } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(UtilsActions.getCategories());
  }, [dispatch, authentication]);

  return authentication ? <Private /> : <Public />;
}
