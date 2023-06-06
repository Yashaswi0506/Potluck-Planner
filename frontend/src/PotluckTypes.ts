export type Message ={
  id:number;
  host:string;
  participant:string;
  message: string;
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

