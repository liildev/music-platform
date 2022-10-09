import React from 'react';
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@mui/material";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useActions } from "../hooks/use.actions";
import styles from '../styles/TrackItem.module.scss'
import axios from 'axios';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { playTrack, setActiveTrack } = useActions()

    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    const deleteTrack = async (e, id) => {
        e.stopPropagation()
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API}tracks/${id}`)
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <img width={70} height={70} src={process.env.NEXT_PUBLIC_BACKEND_API + track.picture} />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton style={{ marginLeft: 'auto' }} onClick={(e) => deleteTrack(e,track._id)} >
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
