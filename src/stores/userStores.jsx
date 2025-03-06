import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import authApi from "../api/authApi";

const useUserStore = create(persist((set, get) => ({
    user: null,
    token: "",
    
    actionRegister: async (data) => {
        await authApi.register(data);
    },
    
    actionLogin: async (data) => {
        try {
            const rs = await authApi.login(data);
            const { token, payload } = rs.data;
            
            set({ 
                token: token, 
                user: payload 
            });
            
            return { token, user: payload };
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },
    
    actionProfile: async () => {
        try {
            const rs = await authApi.currentUser();
            set({ user: rs.data });
            return { user: rs.data };
        } catch (error) {
            console.error("Fetch profile failed:", error);
            return { user: null };
        }
    },
        actionUpdateProfile: async (data) => {
        try {
            const rs = await authApi.login(data);
            const { token, payload } = rs.data;
            
            set({ 
                token: token, 
                user: payload 
            });
            
            return { token, user: payload };
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    },
    
    logout: () => {
        set({ user: null, token: "" });
        // localStorage.removeItem('state');
    }
}), {
    name: 'user-store',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
        token: state.token,
        user: state.user
    })
}));

export default useUserStore;
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import authApi from "../api/authApi";


// const useUserStore = create(persist((set,get)=>({
//     user: null,
//     token: "",
    

//     actionRegister: async (data)=>{
//         await  authApi.register(data)
//     },
//     actionLogin: async (data)=>{
//         const rs = await authApi.login(data)
//         console.log(rs.data)
//         set({token: rs.data.token,user: rs.data.payload})
//         return {token:rs.data.token,user: rs.data.payload}
//     },
//     actionProfile: async (token)=>{
//         const rs = await authApi.currentUser()
//         set({user:rs.data})
//         return {user:rs.data}
//     },
//     actionLogout: async ()=>{
//         set({user:null,token:""})
//         localStorage.removeItem('state')
//     },
    

// }),
// {
//     name: 'state',
//     storage: createJSONStorage(() => localStorage),
//     partialize:(state)=>({token:state.token}),
// }
// ))

// export default useUserStore;