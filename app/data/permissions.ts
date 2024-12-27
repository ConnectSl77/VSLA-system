import { UserRole } from '../types/user';

const permissions: Record<UserRole, string[]> = {
  admin: ['/', '/members', '/groups', '/savings', '/loans', '/credit-unions', '/transactions', '/reports', '/users'],
  manager: ['/', '/members', '/groups', '/savings', '/loans', '/credit-unions', '/transactions', '/reports'],
  staff: ['/', '/members', '/groups', '/savings', '/loans', '/credit-unions', '/transactions'],
  member: ['/', '/savings', '/loans', '/transactions'],
};

export default permissions;

