import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Grid, Button, TextField } from '@mui/material'
import StepWrapper from '../../components/StepWrapper'
import FileUpload from '../../components/FileUpload'
import { useInput } from '../../hooks/use.input'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Create() {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(0)

    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture)
            formData.append('audio', audio)

            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API}tracks`, formData)
            router.push('/tracks')
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1)
    }
    
    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep == 0 &&
                    <Grid container direction={'column'} padding={2}>
                        <TextField
                            label={'Name of the track'}
                            style={{ marginTop: 10 }}
                            {...name}
                        />

                        <TextField
                            label={'Name of the artist'}
                            style={{ marginTop: 10 }}
                            {...artist}
                        />

                        <TextField
                            label={'Lyrics for the track'}
                            style={{ marginTop: 10 }} multiline rows={4}
                            {...text}
                        />
                    </Grid>
                }
                {activeStep == 1 &&
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Upload image</Button>
                    </FileUpload>
                }
                {activeStep == 2 &&
                    <FileUpload setFile={setAudio} accept='audio/*'>
                        <Button>Upload audio</Button>
                    </FileUpload>
                }

            </StepWrapper>
            <Grid container justifyContent={'space-between'}>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayout>
    )
}
