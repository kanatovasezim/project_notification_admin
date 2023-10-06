import React, {useState} from 'react';
import {Box, Button, Card, CardBody, Heading, HStack, PinInput, PinInputField, Text,} from "@chakra-ui/react";

function Scheduler() {
    const [pinValue, setPinValue] = useState('000'); // Initial PIN value

    const handlePinChange = (value: string) => {
        setPinValue(value);
    };

    const handleSchedulerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const days = pinValue.substring(0, 1);
        const hours = pinValue.substring(1, 3);
        const minutes = pinValue.substring(3, 5);

        const cronExpression = `${minutes} ${hours} ${days} * * ?`;

        // Send the 'cronExpression' data to your Java Spring backend here
        console.log(cronExpression); // Debugging output
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