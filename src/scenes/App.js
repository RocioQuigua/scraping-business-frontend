import { useSelector } from "react-redux";

import { Private } from "./Layout/Private/Private";
import { Public } from "./Layout/Public/Public";

export default function App() {
  const { authentication } = useSelector((state) => state.auth);

  return authentication ? <Private /> : <Public />;
}
