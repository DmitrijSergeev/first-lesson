import './App.css'
import {useEffect, useState} from "react";

export type Attachment = {
    id: string;
    addedAt: string;
    updatedAt: string;
    version: number;
    url: string;
    contentType: string;
    originalName: string;
    fileSize: number;
};

export type Image = {
    type: "original" | "thumbnail" | "medium";
    width: number;
    height: number;
    fileSize: number;
    url: string;
};

export type TrackUser = {
    id: string;
    name: string;
};

export type TrackAttributes = {
    title: string;
    user: TrackUser;
    addedAt: string;
    attachments: Attachment[];
    images: {
        main: Image[];
    };
    currentUserReaction: 0 | 1 | -1;
    publishedAt: string;
    likesCount: number;
    isPublished: boolean;
};

export type TrackRelationships = {
    artists: {
        data: {
            id: string;
            type: "artists";
        }[];
    };
};

export type TrackDataItem = {
    id: string;
    type: "tracks";
    attributes: TrackAttributes;
    relationships: TrackRelationships;
};

export type ArtistAttributes = {
    name: string;
};

export type ArtistIncludedItem = {
    id: string;
    type: "artists";
    attributes: ArtistAttributes;
};

export type Meta = {
    page: number;
    pageSize: number;
    totalCount: number;
    pagesCount: number;
    nextCursor: string | null;
};

export type TracksResponse = {
    data: TrackDataItem[];
    included: ArtistIncludedItem[];
    meta: Meta;
};


export function App() {

    const [tracks, setTracks] = useState<TrackDataItem[]>([])

    useEffect(() => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers:{
                'API-KEY': '9778dd46-146a-43ee-b515-46ccd9995305'
            }
        })
        .then(res => res.json())
        .then((json: TracksResponse) => {
            console.log(json)
            setTracks(json.data)
        })
    }, []);

    return (
        <>
            <ul>
                {tracks.map((track) => {
                    return (
                        <li key={track.id}>
                            <h4>{track.attributes.title}</h4>
                            <audio src={track.attributes.attachments[0].url}
                                   controls={true}
                            />
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

