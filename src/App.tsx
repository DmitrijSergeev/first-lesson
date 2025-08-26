import './App.css'
import {useEffect, useRef, useState} from "react";
import type {TrackDataItem, TrackResponse, TracksResponse} from "./types/types.ts";

export function App() {

    const [tracks, setTracks] = useState<TrackDataItem[]>([])
    const [isListLoading, setIsListLoading] = useState<boolean>(true)
    const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false)
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
    const [selectedTrack, setSelectedTrack] = useState<TrackResponse | null>(null)

    const abortControllerRef = useRef<AbortController | null>(null)

    useEffect(() => {
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: {
                'API-KEY': '9778dd46-146a-43ee-b515-46ccd9995305'
            }
        })
            .then(res => res.json())
            .then((json: TracksResponse) => {
                console.log(json)
                setTracks(json.data)
                setIsListLoading(false)
            })
    }, []);

    const handleSelectTrack = (trackId: string) => {
        setSelectedTrackId(trackId)
        setIsDetailLoading(true)

        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${trackId}`, {
            signal: abortControllerRef.current.signal,
            headers: {
                'API-KEY': '9778dd46-146a-43ee-b515-46ccd9995305'
            }
        })
            .then(res => res.json())
            .then((json: TrackResponse) => {
                setSelectedTrack(json)
                setIsDetailLoading(false)
            })
    }

    return (
        <div>
            <h1>Music Fun</h1>
            <div style={{display: 'flex', gap: '200px'}}>
                <ul>
                    <h2>List</h2>
                    {
                        isListLoading && <p>Loading....</p>
                    }
                    {tracks.map((track) => {
                        const color = track.id === selectedTrackId ? 'green' : 'white';
                        return (
                            <li key={track.id}>
                                <h4 style={{color}}
                                    onClick={() => handleSelectTrack(track.id)}
                                >
                                    {track.attributes.title}
                                </h4>
                                <audio src={track.attributes.attachments[0].url}
                                       controls={true}
                                />
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <h2>Details</h2>
                    {
                        isDetailLoading && <p>Loading....</p>
                    }
                    {!isDetailLoading && selectedTrack && <div>
                        <div>{selectedTrack.data.attributes.title}</div>
                        <div>{selectedTrack.data.attributes.addedAt}</div>
                        <div>likes: {selectedTrack.data.attributes.likesCount}</div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

