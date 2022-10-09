import React, { useEffect } from 'react'
import TrackProgress from './TrackProgres'
import { IconButton, Grid, Box } from '@mui/material'
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material'
import { useTypedSelector } from '../hooks/use.typed.selector'
import { useActions } from '../hooks/use.actions';
import style from '../styles/Player.module.scss'

let audio;

const Player = () => {
    const { pause, active, duration, volume, currentTime } = useTypedSelector(state => state.player)
    const { pauseTrack, playTrack, setCurrentTime, setDuration, setVolume, setActiveTrack } = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = process.env.NEXT_PUBLIC_BACKEND_API + active.audio
            audio.volume = volume / 100
            console.log(audio);
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if (!active) {
        return null
    }

    return (
        <Box className={style.player}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>

            <Grid direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{active?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
            </Grid>

            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            <VolumeUp style={{ marginLeft: 'auto', marginRight: 5, width: 25, height: 25 }} />
            <div style={{ marginRight: 30 }}>
                <TrackProgress left={volume} right={100} onChange={changeVolume} />
            </div>
        </Box >
    )
}

export default Player