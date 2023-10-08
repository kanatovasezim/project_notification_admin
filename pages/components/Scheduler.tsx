import React, {useState} from 'react';
import {Box, Button, Card, CardBody, Heading, HStack, PinInput, PinInputField, Text,} from "@chakra-ui/react";

function Scheduler() {
    const [pinValue, setPinValue] = useState('000');
    const [cronExpression, setCronExpression] = useState('');

    const handlePinChange = (value: string) => {
        setPinValue(value);
    };

    const handleSchedulerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const days = pinValue.substring(0, 1);
        const hours = pinValue.substring(1, 3);
        const minutes = pinValue.substring(3, 5);

        setCronExpression(`${minutes} ${hours} ${days} * * ?`);

        try {
            const response = await fetch('http://localhost:8080/api/v1/project-notifier/change-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newScheduleTime: cronExpression
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response from server:', data);
            } else {
                console.error('Server returned an error:', response.status);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }

    };

    return (
        <Card my={4}>
            <form onSubmit={handleSchedulerSubmit}>
                <CardBody display="flex" flexDirection="column" alignItems={"center"}>
                    <Heading as='h3' size='lg'>Scheduler</Heading>
                    <HStack my={5}>
                        <PinInput type='number' defaultValue='000' onChange={handlePinChange}>
                            <PinInputField/>
                            <Text>Days</Text>
                            <PinInputField/>
                            <Text>Hours</Text>
                            <PinInputField/>
                            <Text>Minutes</Text>
                        </PinInput>
                    </HStack>
                    <Box>
                        <Button type="submit">
                            Save
                        </Button>
                    </Box>
                </CardBody>
            </form>
        </Card>
    );
}

export default Scheduler;