import React, { useState } from 'react';
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
    Text,
    Checkbox,
} from "@chakra-ui/react";

function SearchCriteria() {
    const [searchWord, setSearchWord] = useState('');
    const [savedWords, setSavedWords] = useState([]);
    const [country, setCountry] = useState('Germany');
    const [contractType, setContractType] = useState(['Freiberuflich']);
    const [locationType, setLocationType] = useState(['Vor Ort']);
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
    };

    const handleContractType = (value) => {
        if (contractType.includes(value)) {
            setContractType(contractType.filter((item) => item !== value));
        } else {
            setContractType([...contractType, value]);
        }
    };

    const handleLocationType = (value) => {
        if (locationType.includes(value)) {
            setLocationType(locationType.filter((item) => item !== value));
        } else {
            setLocationType([...locationType, value]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (savedWords.length === 0) {
            setSearchWordError('At least one search keyword is required');
            return;
        }

        const apiEndpoint = 'http://localhost:8080/api/v1/project-notifier/change-search-query';
        const requestData = JSON.stringify({
            locationType: locationType,
            contractType: contractType,
            country: country,
            keywords: savedWords,
        });

        try {
            const response = await sendAuthenticatedRequest(apiEndpoint, 'POST', requestData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Request error:', error);
        }
    };

    return (
        <Card m={4} flex={{ base: '8', md: '12' }} display="flex">
            <form onSubmit={handleSubmit}>
                <CardBody display={"flex"} flexDirection={"column"}>
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
                                    <TagCloseButton onClick={() => handleTagClose(index)} />
                                </Tag>
                            ))}
                        </Box>
                    </Box>
                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Vertragsart</FormLabel>
                        {['Freiberuflich', 'Festanstellung', 'Arbeitnehmerüberlassung'].map((value) => (
                            <Checkbox
                                mr={5}
                                key={value}
                                isChecked={contractType.includes(value)}
                                onChange={() => handleContractType(value)}
                            >
                                {value}
                            </Checkbox>
                        ))}
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Region</FormLabel>
                        <Select
                            placeholder=""
                            value={country}
                            onChange={handleCountry}
                        >
                            <option value="Germany">Deutschland</option>
                            <option value="Austria">Österreich</option>
                            <option value="D-A-CH">D-A-CH</option>
                            <option value="Europe">Europa</option>
                            <option value="Around the World">Weltweit</option>
                        </Select>
                    </FormControl>
                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Einsatzart</FormLabel>
                        {['Vor Ort', 'Remote', 'Hybrid'].map((value) => (
                            <Checkbox
                                mr={5}
                                key={value}
                                isChecked={locationType.includes(value)}
                                onChange={() => handleLocationType(value)}
                            >
                                {value}
                            </Checkbox>
                        ))}
                    </FormControl>
                    <Box display={"flex"} justifyContent={'center'}>
                        <Button mt={4} bgColor={"#18234c"} color="white" type="submit">
                            Save
                        </Button>
                    </Box>
                </CardBody>
            </form>
        </Card>
    );
}

export default SearchCriteria;
