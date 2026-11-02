
export const UserRole = {
    Admin: "ADMIN",
    User: "USER",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
