import './App.css'
import {useEffect, useState} from "react";
import type {TrackDataItem, TracksResponse} from "./types/types.ts";


export function App() {

    const [tracks, setTracks] = useState<TrackDataItem[]>([])
    const [selectedTrackId, setSelectedTrackId] = useState<string[]>([])

    const toggleTrack = (id: string) => {
        setSelectedTrackId((prev) =>
            prev.includes(id) ? prev.filter(
                (trackId) => trackId !== id) : [...prev, id]
        )
    }

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
                    const isSelected = selectedTrackId.includes(track.id)
                    const color = isSelected ? 'green' : 'white'

                    return (
                        <li key={track.id}
                            style={{color}}
                        >
                            <h4 onClick={() => toggleTrack(track.id)}
                            >{track.attributes.title}</h4>
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

