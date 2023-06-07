export type Message ={
  id:number;
  host:string;
  participant:string;
  message: string;
  eventId:number
};

export type UserType ={
  id: string;
  name: string;
};

export type NotificationProps ={
  participantId: string;
  hostId: string;
};

export type Participant ={
  id: string;
  name: string;
};

export type Host = {
  id: string;
  hostname: string;
};

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
  name: "Dogbert",
  email: "email2@email.com",
  id: 2
  
};
