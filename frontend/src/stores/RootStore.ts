import { types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import AuthStore from './AuthStore';
import MovieStore from './MovieStore';

const RootStore = types.model('RootStore', {
  authStore: types.optional(AuthStore, {}),
  movieStore: types.optional(MovieStore, {}),
});

const rootStore = RootStore.create({});

// โหลดค่าจาก localStorage ตอนเปิด
rootStore.authStore.hydrate();

const RootStoreContext = createContext(rootStore);
export const useStore = () => useContext(RootStoreContext);
export { RootStoreContext, rootStore };
