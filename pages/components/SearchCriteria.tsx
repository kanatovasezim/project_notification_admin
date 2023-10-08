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
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Tag,
    TagCloseButton,
    TagLabel,
} from "@chakra-ui/react";

function SearchCriteria() {
    const [searchWord, setSearchWord] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [savedWords, setSavedWords] = useState([]);
    const [sliderValue, setSliderValue] = useState(50);

    const handleInputChange = (event) => setSearchWord(event.target.value);

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && searchWord.trim() !== "") {
            setSavedWords([...savedWords, searchWord]);
            setSearchWord("");
        }
    };

    const handleTagClose = (index) => {
        const updatedWords = [...savedWords];
        updatedWords.splice(index, 1);
        setSavedWords(updatedWords);
    };

    const handleOptionChange = (e) => setSelectedOption(e.target.value);

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log('HEREEE')
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/project-notifier/change-search-query', {
                method: 'POST', // Use the appropriate HTTP method (POST, GET, PUT, etc.)
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify({
                    locationType: sliderValue,
                    keywords: [searchWord],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response from server:', data);
                // Optionally, you can update the UI or perform other actions based on the response.
            } else {
                console.error('Server returned an error:', response.status);
                // Handle the error or display an error message to the user.
            }
        } catch (error) {
            console.error('Error sending data:', error);
            // Handle any network errors or other exceptions.
        }
    };

    return (
        <Card flex="3" display="flex" m={4}>
            <CardBody>
                <Heading as='h3' size='lg'>Search Criteria</Heading>
                <form onSubmit={handleSubmit}>
                    <Box my={5}>
                        <FormControl>
                            <FormLabel fontWeight="bold" fontSize="lg">Search Keywords</FormLabel>
                            <Input
                                placeholder="Enter text and press Enter to save"
                                onChange={handleInputChange}
                                onKeyDown={handleKeyPress}
                            />
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
                        <Select
                            placeholder=""
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="self">Freiberuflich</option>
                            <option value="permanent">Festanstellung</option>
                            <option value="temporary">Arbeitnehmerüberlassung</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Region</FormLabel>
                        <Select
                            placeholder=""
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            <option value="DE">Deutschland</option>
                            <option value="1">Österreich</option>
                            <option value="2">Schweiz</option>
                            <option value="3">D-A-CH</option>
                            <option value="4">Europa</option>
                            <option value="5">Weltweit</option>
                        </Select>
                    </FormControl>

                    <Box mb={5}>
                        <FormLabel fontWeight="bold" fontSize="lg">Einsatzart</FormLabel>
                        <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)}>
                            <SliderMark value={25} {...labelStyles}>25%</SliderMark>
                            <SliderMark value={50} {...labelStyles}>50%</SliderMark>
                            <SliderMark value={75} {...labelStyles}>75%</SliderMark>
                            <SliderMark
                                value={sliderValue}
                                textAlign='center'
                                bg='blue.500'
                                color='white'
                                mt='-10'
                                ml='-5'
                                w='12'
                            >
                                {sliderValue}%
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                    <Button mt={4} type="submit">
                        Send
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
}

export default SearchCriteria;
