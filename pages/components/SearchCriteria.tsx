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
    Select,
    Tag,
    TagCloseButton,
    TagLabel,
    Text
} from "@chakra-ui/react";

function SearchCriteria() {
    const [searchWord, setSearchWord] = useState('');
    const [savedWords, setSavedWords] = useState([]);
    const [country, setCountry] = useState('Germany');
    const [contractType, setContractType] = useState('Freiberuflich');
    const [locationType, setLocationType] = useState('Vor Ort');
    const [searchWordError, setSearchWordError] = useState('');

    const handleInputChange = (event) => setSearchWord(event.target.value);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            if (searchWord.trim() !== "") {
                setSavedWords([...savedWords, searchWord]);
                setSearchWord('');
                setSearchWordError('');
            } else {
                setSearchWordError('Search Keywords cannot be empty');
            }
        }
    };

    const handleTagClose = (index) => {
        const updatedWords = [...savedWords];
        updatedWords.splice(index, 1);
        setSavedWords(updatedWords);
    };

    const handleCountry = (event) => {
        setCountry(event.target.value);
    }

    const handleContractType = (event) => {
        setContractType(event.target.value);
    }

    const handleLocationType = (event) => {
        setLocationType(event.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (savedWords.length === 0) {
            setSearchWordError('At least one search keyword is required');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/project-notifier/change-search-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    locationType: locationType,
                    contractType: contractType,
                    country: country,
                    keywords: savedWords,
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
        <Card flex="3" display="flex" m={4}>
            <form onSubmit={handleSubmit}>
                <CardBody>
                    <Heading as='h3' size='lg'>Search Criteria</Heading>
                    <Box my={5}>
                        <FormControl>
                            <FormLabel fontWeight="bold" fontSize="lg">Search Keywords</FormLabel>
                            <Input
                                placeholder="Enter text and press Enter to save"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                            />
                            {searchWordError && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {searchWordError}
                                </Text>
                            )}
                        </FormControl>
                        <Box mt={2}>
                            {savedWords.map((word, index) => (
                                <Tag key={index} size="md" m={1}>
                                    <TagLabel>{word}</TagLabel>
                                    <TagCloseButton onClick={() => handleTagClose(index)}/>
                                </Tag>
                            ))}
                        </Box>
                    </Box>
                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Vertragsart</FormLabel>
                        <Select
                            placeholder=""
                            value={contractType}
                            onChange={handleContractType}
                        >
                            <option value="Freiberuflich" defaultValue>Freiberuflich</option>
                            <option value="Festanstellung">Festanstellung</option>
                            <option value="Arbeitnehmerüberlassung">Arbeitnehmerüberlassung</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Region</FormLabel>
                        <Select
                            placeholder=""
                            value={country}
                            onChange={handleCountry}
                        >
                            <option value="Germany" defaultValue>Deutschland</option>
                            <option value="Austria">Österreich</option>
                            <option value="D-A-CH">D-A-CH</option>
                            <option value="Europe">Europa</option>
                            <option value="Around the World">Weltweit</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Einsatzart</FormLabel>
                        <Select
                            placeholder=""
                            value={locationType}
                            onChange={handleLocationType}
                        >
                            <option value="Vor Ort" defaultValue>Vor Ort</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>

                        </Select>
                    </FormControl>
                    <Button mt={4} type="submit">
                        Send
                    </Button>
                </CardBody>
            </form>
        </Card>
    );
}

export default SearchCriteria;
