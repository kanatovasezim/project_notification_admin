import React, {useState} from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, Heading, Input, Text,} from "@chakra-ui/react";
import sendAuthenticatedRequest from "../api/requestHandler";

function Scheduler() {
    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [apiResponse, setApiResponse] = useState<{ error?: string } | null>(null); // Set type as { error?: string } | null

    const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(365, Math.max(0, parseInt(event.target.value))) || 0;
        setDays(newValue);
    };

    const handleHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(23, Math.max(0, parseInt(event.target.value))) || 0;
        setHours(newValue);
    };

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Math.min(59, Math.max(0, parseInt(event.target.value))) || 0;
        setMinutes(newValue);
    };

    const handleSchedulerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const apiEndpoint = '/change-schedule';
        const requestData = {
            Days: days,
            Hours: hours,
            Minutes: minutes,
        };

        try {
            const response = await sendAuthenticatedRequest(apiEndpoint, 'POST', requestData);
            setApiResponse(response);
            setTimeout(() => {
                setApiResponse(null);
            }, 5000);
        } catch (error) {
            setApiResponse({ error: 'Failed to make the request. Hint: try to logout and login' });
            setTimeout(() => {
                setApiResponse(null);
            }, 5000);
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
                            id={'days'}
                            value={days.toString()}
                            onChange={handleDaysChange}
                            min={0}
                            max={365}
                        />
                        <Text mx={2}>Days</Text>
                        <Input
                            type='number'
                            id={'hours'}
                            value={hours.toString()}
                            onChange={handleHoursChange}
                            min={0}
                            max={23}
                        />
                        <Text mx={2}>Hours</Text>
                        <Input
                            type='number'
                            id={'mins'}
                            value={minutes.toString()}
                            onChange={handleMinutesChange}
                            min={0}
                            max={59}
                        />
                        <Text mx={2}>Minutes</Text>
                    </Box>
                    {apiResponse && (
                        <Alert status={apiResponse.error ? "error" : "success"} mt={4}>
                            <AlertIcon />
                            <AlertTitle>{apiResponse.error ? "Error" : "Success"}</AlertTitle>
                            <AlertDescription>
                                {apiResponse.error ? apiResponse.error : "Request was successful."}
                            </AlertDescription>
                        </Alert>
                    )}
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