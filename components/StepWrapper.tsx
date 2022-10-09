import React from 'react'
import { Container, Step, StepLabel, Stepper, Grid, Card } from '@mui/material';
import { steps } from '../constants/menu.items';

interface StepWrapperProps {
    activeStep: number;
    children?
}


const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
    return (
        <Container maxWidth={false}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => <Step key={index} completed={activeStep > index}>
                    <StepLabel sx={ { fontSize: '1px'}}>{step}</StepLabel>
                </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{ margin: '70px 0 ', height: 270 }}>
                <Card style={{ width: 600 }}>
                    {children}
                </Card>
            </Grid>
        </Container>
    )
}


export default StepWrapper
