import { createContext } from "react";
import type { Firebase } from "./firebase";

const FirebaseContext = createContext<Firebase | null>(null);

export default FirebaseContext;
