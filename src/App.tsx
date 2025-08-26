import './App.css'
import {useEffect, useState} from "react";
import type {TrackDataItem, TrackResponse, TracksResponse} from "./types/types.ts";

export function App() {

    const [tracks, setTracks] = useState<TrackDataItem[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)
    const [selectedTrack, setSelectedTrack] = useState<TrackResponse | null>(null)

    // const clickedTrack = tracks.find(
    //     t => t.id === selectedTrack?.id)

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
                setIsLoading(false)
            })
    }, []);

    useEffect(() => {
        if (!selectedTrackId) return
        fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks' + selectedTrackId, {
            headers: {
                'API-KEY': '9778dd46-146a-43ee-b515-46ccd9995305'
            }
        })
            .then(res => res.json())
            .then((json: TrackResponse) => {
                setSelectedTrack(json)
            })
    }, [selectedTrackId]);

    return (
        <div>
            <h1>Music Fun</h1>
            <div style={{display: 'flex', gap: '200px'}}>
                <ul>
                    <h2>List</h2>
                    {
                        isLoading && <p>Loading....</p>
                    }
                    {tracks.map((track) => {
                        const color = track.id === selectedTrack?.data.id ? 'green' : 'white';
                        return (
                            <li key={track.id}>
                                <h4 style={{color}}
                                    onClick={() => {
                                        setSelectedTrackId(track.id)
                                    }}
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
                    {selectedTrack && <div>
                        <div>{selectedTrack.data.attributes.title}</div>
                        <div>{selectedTrack.data.attributes.addedAt}</div>
                        <div>likes: {selectedTrack.data.attributes.likesCount}</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

