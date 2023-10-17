import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import React, { useState } from 'react';
import { Box, FormLabel, Input, RadioGroup, Radio, Stack, Text, Grid, Flex } from "@chakra-ui/react";

function ScoreG8() {
	const [score, setScore] = useState(0);
	const [bmi, setBMI] = useState({ weight: 0, height: 0 });
	const [individualScores, setIndividualScores] = useState({});
	const allQuestionsAnswered = Object.keys(individualScores).length === 8;

	const updateScore = (value, questionNumber) => {
		const prevValue = individualScores[questionNumber] || 0;
		setScore(prevScore => prevScore - prevValue + value);
		setIndividualScores({ ...individualScores, [questionNumber]: value });
	}

	const calculateBMI = () => {
		if (bmi.height && bmi.weight) {
			const heightInMeters = bmi.height / 100;
			const bmiValue = (bmi.weight / (heightInMeters * heightInMeters)).toFixed(0);
			return bmiValue;
		}
	}

	const calculateBMIScore = () => {
		if (bmi.height && bmi.weight) {
			const heightInMeters = bmi.height / 100;
			const imcValue = bmi.weight / (heightInMeters * heightInMeters);
			if (imcValue < 19) return 0;
			if (imcValue >= 19 && imcValue <= 21) return 1;
			if (imcValue >= 21 && imcValue < 23) return 2;
			if (imcValue >= 23) return 3;
		}
		return 0;
	}

	return (
		<Box>
			<Card p='16px' boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
				<Text fontSize='lg' color='black' fontWeight='bold'>
					G8 Score Calculator
				</Text>
				<Box width="150px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-10px" mb="15px" ml="10px" />
				<Text fontSize='14px' color='gray.500' mb="30px" ml="10px">
					Identifies elderly cancer patients who could benefit from comprehensive geriatric assessment
				</Text>
				<CardBody px='5px' display="flex" flexDirection="column">
					<Grid templateColumns='repeat(2, 1fr)' gap="12">
						{/* Question 1 */}
						<Box>
							<FormLabel>1. Has food intake declined over the past 3 months due to loss of appetite, digestive problems, chewing, or swallowing difficulties?</FormLabel>
							<RadioGroup mb="14" onChange={(value) => updateScore(parseInt(value, 10), 1)}>
								<Stack direction="Column">
									<Radio value="0">Severe anorexia</Radio>
									<Radio value="1">Moderate anorexia</Radio>
									<Radio value="2">No anorexia</Radio>
								</Stack>
							</RadioGroup>
							{/* Question 2 */}
							<FormLabel mt="4">2. Weight loss during the last 3 months, kg</FormLabel>
							<RadioGroup mb="12" onChange={(value) => updateScore(parseInt(value, 10), 2)}>
								<Stack direction="Column">
									<Radio value="0">Weight loss &gt; 3 kg</Radio>
									<Radio value="1">Does not know</Radio>
									<Radio value="2">Between 1 and 3 Kg</Radio>
									<Radio value="3">No weight loss</Radio>
								</Stack>
							</RadioGroup>
							{/* Question 3 */}
							<FormLabel mt="4">3. Mobility</FormLabel>
							<RadioGroup mb="12" onChange={(value) => updateScore(parseInt(value, 10), 3)}>
								<Stack direction="Column">
									<Radio value="0">Bed or chair</Radio>
									<Radio value="1">Self-sufficient indoors</Radio>
									<Radio value="2">Goes outside</Radio>
								</Stack>
							</RadioGroup>
							{/* Question 4 */}
							<FormLabel mt="4">4. Neuropsychological conditions</FormLabel>
							<RadioGroup mb="14" onChange={(value) => updateScore(parseInt(value, 10), 4)}>
								<Stack direction="Column">
									<Radio value="0">Severe dementia or depression</Radio>
									<Radio value="1">Moderate dementia or depression</Radio>
									<Radio value="2">No psychological problem</Radio>
								</Stack>
							</RadioGroup>
						</Box>
						{/* Question 5 */}
						<Box mt="0">
							<FormLabel>5. Body Mass Index (BMI), kg/m2</FormLabel>
							<Input
								w='60%'
								type="number"
								placeholder="Weight in kg (e.g. 75)"
								borderRadius="15px"
								fontSize="13"
								_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
								onChange={(e) => {
									setBMI({ ...bmi, weight: parseFloat(e.target.value) });
									const newBMI = calculateBMIScore();
									updateScore(newBMI, 5);
								}}
							/>
							<Input
								w='60%'
								type="number"
								borderRadius="15px"
								placeholder="Height in cm (e.g. 175)"
								mt="2"
								fontSize="13"
								_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
								onChange={(e) => {
									setBMI({ ...bmi, height: parseFloat(e.target.value) });
									const newBMI = calculateBMIScore();
									updateScore(newBMI, 5);
								}}
							/>
							<Box mt="2" mb="8">
								<Text>BMI: {calculateBMI()}</Text>
							</Box>
							{/* Question 6 */}
							<FormLabel mt="4">6. Takes more than three medications per day</FormLabel>
							<RadioGroup mb="14" onChange={(value) => updateScore(parseInt(value, 10), 6)}>
								<Stack direction="column">
									<Radio value="0">Yes</Radio>
									<Radio value="1">No</Radio>
								</Stack>
							</RadioGroup>
							{/* Question 7 */}
							<FormLabel mt="4">7. In comparison with other people of the same age, how does the patient consider their health status?</FormLabel>
							<RadioGroup mb="14" onChange={(value) => updateScore(parseInt(value, 10), 7)}>
								<Stack direction="Column">
									<Radio value="0">Worse</Radio>
									<Radio value="1">Does not know</Radio>
									<Radio value="2">As good</Radio>
									<Radio value="3">Better</Radio>
								</Stack>
							</RadioGroup>
							{/* Question 8 */}
							<FormLabel mt="4">8. Age, years</FormLabel>
							<RadioGroup mb="13" onChange={(value) => updateScore(parseInt(value, 10), 8)}>
								<Stack direction="Column">
									<Radio value="0">{'< 80 years'}</Radio>
									<Radio value="1">{'80-85 years'}</Radio>
									<Radio value="2">{'> 85 years'}</Radio>
								</Stack>
							</RadioGroup>
						</Box>
					</Grid>
					<Flex justifyContent="space-between" alignItems="center" mt="4">
						<Text fontSize="14">
							{allQuestionsAnswered ? "" : "Please fill out all the required fields."}
						</Text>
						<Box p="5" bg="rgba(99, 135, 118, 0.2)" borderRadius="md" width="30%">
							<Text fontSize="20" fontWeight="bold">
								{allQuestionsAnswered ? `G8 Score: ${score}` : "G8 Score:"}
							</Text>
							<Text fontSize="16">
								{allQuestionsAnswered & score > 14 ? `Full geriatric evaluation not necessary` : ""}
								{allQuestionsAnswered & score <= 14 ? `Full geriatric evaluation necessary` : ""}
							</Text>
						</Box>
					</Flex>
				</CardBody>
			</Card>
			<Box>
				<Text fontSize="10" color="gray.500" mt="14">
					1. Bellera CA, Rainfray M, Mathoulin-Pélissier S, et al. Screening older cancer patients: first evaluation of the G-8 geriatric screening tool. Ann Oncol. 2012;23(8):2166-2172. doi:10.1093/annonc/mdr587
				</Text>
				<Text fontSize="10" color="gray.500">
					2. Hamaker ME, Mitrovic M, Stauder R. The G8 screening tool detects relevant geriatric impairments and predicts survival in elderly patients with a haematological malignancy. Ann Hematol. 2014;93(6):1031-1040. doi:10.1007/s00277-013-2001-0
				</Text>
				<Text fontSize="10" color="gray.500">
					3. Takahashi M, Takahashi M, Komine K, et al. The G8 screening tool enhances prognostic value to ECOG performance status in elderly cancer patients: A retrospective, single institutional study. PLoS One. 2017;12(6):e0179694. Published 2017 Jun 22. doi:10.1371/journal.pone.0179694
				</Text>
			</Box>
		</Box>
	);
};

export default ScoreG8;
