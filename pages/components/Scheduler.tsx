import React, {useState} from 'react';
import {Box, Button, Card, CardBody, Heading, Input, Text,} from "@chakra-ui/react";
import sendAuthenticatedRequest from "../api/requestHandler";

function Scheduler() {
    const [days, setDays] = useState<number>();
    const [hours, setHours] = useState<number>();
    const [minutes, setMinutes] = useState<number>();

    const handleDaysChange = (event) => {
        const newValue = Math.min(99, Math.max(0, parseInt(event.target.value))) || 0;
        setDays(newValue);
    };

    const handleHoursChange = (event) => {
        const newValue = Math.min(99, Math.max(0, parseInt(event.target.value))) || 0;
        setHours(newValue);
    };

    const handleMinutesChange = (event) => {
        const newValue = Math.min(99, Math.max(0, parseInt(event.target.value))) || 0;
        setMinutes(newValue);
    };

    const handleSchedulerSubmit = async (e) => {
        e.preventDefault();

        const apiEndpoint = '/change-schedule';
        const requestData = {
            Days: days? days: 0,
            Hours: hours? hours : 0,
            Minutes: minutes? minutes : 0,
        };

        try {
            const response = await sendAuthenticatedRequest(apiEndpoint, 'POST', requestData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Request error:', error);
        }
    };

    return (
        <Card my={4}>
            <form onSubmit={handleSchedulerSubmit}>
                <CardBody display="flex" flexDirection="column" alignItems={"center"}>
                    <Heading as='h3' size='lg'>Scheduler</Heading>
                    <Box display="flex" justifyContent="space-between" alignItems="center" my={5}>
                        <Input
                            type='number'
                            value={days}
                            onChange={handleDaysChange}
                            min={0}
                            max={365}
                        />
                        <Text mx={2}>Days</Text>
                        <Input
                            type='number'
                            value={hours}
                            onChange={handleHoursChange}
                            min={0}
                            max={23}
                        />
                        <Text mx={2}>Hours</Text>
                        <Input
                            type='number'
                            value={minutes}
                            onChange={handleMinutesChange}
                            min={0}
                            max={59}
                        />
                        <Text mx={2}>Minutes</Text>
                    </Box>
                    <Box>
                        <Button type="submit" bgColor={"#18234c"} color="white">
                            Save
                        </Button>
                    </Box>
                </CardBody>
            </form>
        </Card>
    );
}

export default Scheduler;