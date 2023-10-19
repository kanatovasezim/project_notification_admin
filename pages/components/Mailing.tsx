import React, {useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
} from "@chakra-ui/react";
import sendAuthenticatedRequest from "../api/requestHandler";

function Mailing() {
    const [inputEmail, setInputEmail] = useState('');
    const [savedEmails, setSavedEmails] = useState([]);
    const [error, setError] = useState('');
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const handleEmailInputChange = (event) => {
        setInputEmail(event.target.value);
        setError("");
    };

    const handleEmailKeyPress = (event) => {
        if (event.key === "Enter") {
            if (emailRegex.test(inputEmail)) {
                setSavedEmails([...savedEmails, inputEmail]);
                setInputEmail("");
                setError("");
            } else {
                setError("Invalid email address");
            }
        }
    };

    const handleEmailTagClose = (index) => {
        const updatedEmails = [...savedEmails];
        updatedEmails.splice(index, 1);
        setSavedEmails(updatedEmails);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const apiEndpoint = 'http://localhost:8080/api/v1/project-notifier/change-email-receivers'; // Replace with your API endpoint.
        const requestData = savedEmails;

        try {
            const response = await sendAuthenticatedRequest(apiEndpoint, 'POST', requestData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Request error:', error);
        }
    }

    return (
        <Card mb={4}>
            <form onSubmit={handleSubmit}>
                <CardBody display="flex" flexDirection="column" alignItems="center">
                    <Heading as="h3" size="lg">
                        Mailing
                    </Heading>
                    <FormControl>
                        <FormLabel>List of receivers</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter an email and press Enter to save"
                            value={inputEmail}
                            onChange={handleEmailInputChange}
                            onKeyDown={handleEmailKeyPress}
                        />
                        {error && <Text color="red.500" mt={2}>{error}</Text>}
                    </FormControl>
                    <Box mt={4}>
                        {savedEmails.map((email, index) => (
                            <Tag key={index} size="md" colorScheme="teal" m={1}>
                                <TagLabel>{email}</TagLabel>
                                <TagCloseButton onClick={() => handleEmailTagClose(index)}/>
                            </Tag>
                        ))}
                    </Box>
                    <Button mt={4} bgColor={"#18234c"} color="white" type="submit">
                        Save
                    </Button>
                </CardBody>
            </form>
        </Card>
    );
}

export default Mailing;