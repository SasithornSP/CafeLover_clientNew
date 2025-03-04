import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// const useAdminStore = create(persist((set,get)=>({
//     user: null,
//     token: "",
// })