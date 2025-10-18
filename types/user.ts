export type UserRole = {
  id: string;
  userId: string;
  roleId: string;
  role: Role;
  assignedAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  provider?: string;
  googleId?: string;
  isActive?: number;
  userStar: number;
  userRoles?: UserRole[];
  createdAt?: string;
  updatedAt?: string;
  isPersonalPremium: boolean;
  isGroupPremium: boolean;
  plus3Bought: number;
  plus10Bought: number;
  maxUserForRoom: number;
};

export type Role = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
