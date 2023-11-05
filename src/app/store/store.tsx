import { create } from "zustand";

const store = (set: any) => ({
  users: [] as any[],
  setUser: (newUser: any[]) => {
    return set((state: any) => ({ users: [...state.users, { ...newUser }] }));
  },
  updateUser: (updatedUser: any) => {
    set((state: any) => ({
      users: state.users.map((user: any) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      ),
    }));
  },
  deleteUser: (userId: any) => {
    set((state: any) => ({
      users: state.users.filter((user: any) => user.id !== userId),
    }));
  },
});
export const useStore = create(store);
