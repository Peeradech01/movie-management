import { types, flow } from 'mobx-state-tree';
import { authApi } from '../api/auth.api';
import type { User, UserRole } from '../types';

const AuthStore = types
  .model('AuthStore', {
    userId: types.maybeNull(types.number),
    username: types.maybeNull(types.string),
    role: types.maybeNull(types.enumeration<UserRole>('UserRole', ['MANAGER', 'TEAMLEADER', 'FLOORSTAFF'])),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.username;
    },
    get isManager() {
      return self.role === 'MANAGER';
    },
  }))
  .actions((self) => ({
    // โหลดค่าจาก localStorage ตอนเปิด
    hydrate() {
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId');

      if (username && role && userId) {
        self.username = username;
        self.role = role as UserRole;
        self.userId = Number(userId);
      }
    },

    login: flow(function* (username: string, password: string) {
      self.isLoading = true;
      self.error = null;
      try {
        yield authApi.login(username, password);

        const profile: User = yield authApi.getProfile();
        self.userId = profile.userId;
        self.username = profile.username;
        self.role = profile.role;

        // บันทึกลง localStorage
        localStorage.setItem('username', profile.username);
        localStorage.setItem('role', profile.role);
        localStorage.setItem('userId', String(profile.userId));
      } catch {
        self.error = 'Invalid username or password';
      } finally {
        self.isLoading = false;
      }
    }),

    logout: flow(function* () {
      yield authApi.logout();
      self.userId = null;
      self.username = null;
      self.role = null;

      // ลบข้อมูลใน localStorage
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    }),
  }));

export default AuthStore;
