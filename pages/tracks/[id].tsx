import React, { useState } from 'react';
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useInput } from "../../hooks/use.input";

const TrackPage = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}tracks/comment`, {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({ ...track, comments: [...track.comments, response.data] })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={"Music Playground - " + track.name + " - " + track.artist}
            keywords={'Music, artists, ' + track.name + ", " + track.artist}
        >
            <Button
                variant={"outlined"}
                style={{ fontSize: 32 }}
                onClick={() => router.push('/tracks')}
            >
                To the list
            </Button>
            <Grid container style={{ margin: '20px 0' }}>
                <img src={process.env.NEXT_PUBLIC_BACKEND_API + track.picture} width={200} height={200} />
                <div style={{ marginLeft: 30 }}>
                    <h2>Name of the track - {track.name}</h2>
                    <h2>Executor - {track.artist}</h2>
                    <h2>Plays - {track.listens}</h2>
                </div>
            </Grid>
            <h2>Lyrics</h2>
            <p>{track.text}</p>
            <h2>Comments</h2>
            <Grid container>

                <TextField
                    label="Userame"
                    fullWidth
                    {...username}
                />
                <TextField
                    label="Comment"
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                    style={{ marginTop: 20 }}
                />
                <Button 
                    variant='outlined' 
                    style={{ marginTop: 20 }}
                    onClick={addComment}>
                    Send
                </Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Author - {comment.username}</div>
                        <div>Comment - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}tracks/${params.id}`)
    return {
        props: {
            serverTrack: response.data
        }
    }
}
