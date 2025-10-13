import { useState } from 'react';
import { Stepper, Group, Text, Stack } from '@mantine/core';

const ProgressStepper = ({ currentStep = 1 }) => {
    const steps = [
        { number: 1, title: 'Choose flight', completed: currentStep >= 1, active: currentStep === 1 },
        { number: 2, title: 'Your Details', completed: currentStep >= 2, active: currentStep === 2 },
        { number: 3, title: 'Confirm Booking', completed: currentStep >= 3, active: currentStep === 3 }
    ];

    return (
        <Stack gap="lg" className="w-full max-w-[875px] m-auto">
            <Stepper 
                active={currentStep - 1} 
                color="#05B491"
                size="xs"
                radius="xl"
            >
                <Stepper.Step 
                    label="Choose flight" 
                    description="Select your preferred flight"
                    color={currentStep >= 1 ? "#05B491" : "gray"}
                />
                <Stepper.Step 
                    label="Your Details" 
                    description="Enter passenger information"
                    color={currentStep >= 2 ? "#05B491" : "gray"}
                />
                <Stepper.Step 
                    label="Confirm Booking" 
                    description="Review and confirm your booking"
                    color={currentStep >= 3 ? "#05B491" : "gray"}
                />
            </Stepper>
        </Stack>
    );
};

export default ProgressStepper;
