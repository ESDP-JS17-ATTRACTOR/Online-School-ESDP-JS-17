export interface RegisterMutation {
    email: string;
    firstName: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
    displayName?: string;
    googleId?: string;
    avatar: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string; message: string;
        };
    };
    message: string;
    name: string;
    _name: string;
}

export interface ArtistType {
    _id: string;
    name: string;
    info: string;
    image: string | null;
    isPublished: boolean;
    createdBy: string;
}

export interface ArtistWithoutId {
    name: string;
    info: string;
    image: string | null;
}

export interface AlbumType {
    _id: string;
    artist: string;
    title: string;
    year: number;
    image: string | null;
    quantity: string;
    isPublished: boolean;
    createdBy: string;
}

export interface AlbumMutation {
    artist: string;
    title: string;
    year: string;
    image: string | null;
}

export interface TrackType {
    _id: string;
    album: string;
    title: string;
    duration: string;
    trackNumber: number;
    isPublished: boolean;
    createdBy: string;
}

export interface TrackMutation {
    album: string;
    title: string;
    duration: string;
    trackNumber: srting;
}

export interface TracksWithFullInfo {
    artist: string;
    album: string;
    tracks: TrackType[];
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface GlobalError {
    error: string;
}

export interface TrackHistoryType {
    user: string;
    track: TrackType;
    artist: string;
    datetime: string;
}