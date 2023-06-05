export type State = {
    currentProfile: ProfileType;
    likeHistory: Array<ProfileType>;
    passHistory: Array<ProfileType>;
};

export type ProfileType = {
    name: string;
    email: string;
    id: number;
};

export const AuthenticatedUser :ProfileType = {
    name: "Doglord",
    email: "email3@email.com",
    id: 3

};
