import React, { useState, useEffect } from 'react';
import { Box, FormLabel, Input, Grid, Flex, Text } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";

function ARF() {
	const [values, setValues] = useState({
		plasmaUrea: null,
		urinaryUrea: null,
		creatinemia: null,
		urinaryCreatinine: null,
		plasmaNa: null,
		urinaryNa: null,
		urinaryK: null
	});

	const [results, setResults] = useState({});

	function getFeedbackText(value, criteria, upperLimit) {
		if (value != null) {
			if (upperLimit) {
				return value > criteria ?
					<Text color="rgba(99, 135, 118, 0.8)" fontWeight="bold"> - In favor of functional acute renal failure</Text> :
					<Text color="rgba(99, 135, 118, 0.8)" fontWeight="bold"> - In favor of organic acute renal failure</Text>;
			} else {
				return value < criteria ?
					<Text color="rgba(99, 135, 118, 0.8)" fontWeight="bold"> - In favor of functional acute renal failure</Text> :
					<Text color="rgba(99, 135, 118, 0.8)" fontWeight="bold"> - In favor of organic acute renal failure</Text>;
			}
		} else {
			return null;
		}
	}

	useEffect(() => {
		const computeValues = () => {
			let computed = {};

			if (values.plasmaUrea && values.creatinemia) {
				computed.plasmaUreaCreatinemia = (values.plasmaUrea / values.creatinemia).toFixed(1);
			}

			if (values.urinaryNa && values.plasmaNa && values.urinaryCreatinine && values.creatinemia) {
				computed.sodiumExcretionFraction = (((values.urinaryNa / values.plasmaNa) / (values.urinaryCreatinine / values.creatinemia)) * 100).toFixed(1);
			}

			if (values.urinaryUrea && values.plasmaUrea && values.urinaryCreatinine && values.creatinemia) {
				computed.ureaExcretionFraction = (((values.urinaryUrea / values.plasmaUrea) / (values.urinaryCreatinine / values.creatinemia)) * 100).toFixed(1);
			}

			if (values.urinaryNa && values.urinaryK) {
				computed.urinaryNaK = (values.urinaryNa / values.urinaryK).toFixed(1);
			}

			if (values.urinaryUrea && values.plasmaUrea) {
				computed.uP_urea = (values.urinaryUrea / values.plasmaUrea).toFixed(1);
			}

			if (values.urinaryCreatinine && values.creatinemia) {
				computed.uP_creatinine = (values.urinaryCreatinine / values.creatinemia).toFixed(1);
			}

			setResults(computed);
		}

		computeValues();
	}, [values]);

	return (
		<Card p='16px' boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)">
			<Text fontSize='lg' color='black' fontWeight='bold'>
				Acute Renal Failure
			</Text>
			<Box width="150px" height="8px" backgroundColor="rgba(99, 135, 118, 0.4)" mt="-10px" mb="15px" ml="10px" />
			<CardBody px='5px' display="flex" flexDirection="column">
				<Grid templateColumns='repeat(2, 1fr)' gap="0">
					{/* Plasma column */}
					<Box>
						<FormLabel>Plasma Urea</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, plasmaUrea: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>

						<FormLabel mt="4">Creatinemia, µmol/l</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, creatinemia: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>

						<FormLabel mt="4">Plasma Na+</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, plasmaNa: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>
					</Box>
					{/* Urinary column */}
					<Box>
						<FormLabel>Urinary Urea</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, urinaryUrea: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>

						<FormLabel mt="4">Urinary Creatinine</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, urinaryCreatinine: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>

						<FormLabel mt="4">Urinary Na+</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, urinaryNa: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>

						<FormLabel mt="4">Urinary K+</FormLabel>
						<Input
							type="number"
							placeholder="Enter value"
							onChange={e => setValues({ ...values, urinaryK: parseFloat(e.target.value) })}
							_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
							borderRadius="15px"
							w="70%"
						/>
					</Box>
				</Grid>

				{/* Results */}
				<Flex flexDirection="column" mt="20">
					<Flex mt="4">
						<Text mr="10px">Plasma Urea/Creatinemia: {results.plasmaUreaCreatinemia}</Text>
						{getFeedbackText(results.plasmaUreaCreatinemia, 100, true)}
					</Flex>
					<Flex mt="4">
						<Text mr="10px">Sodium Excretion Fraction: {results.sodiumExcretionFraction} %</Text>
						{getFeedbackText(results.sodiumExcretionFraction, 1, false)}
					</Flex>
					<Flex mt="4">
						<Text mr="10px">Urea Excretion Fraction: {results.ureaExcretionFraction} %</Text>
						{getFeedbackText(results.ureaExcretionFraction, 35, false)}
					</Flex>
					<Flex mt="4">
						<Text mr="10px">Urinary Na+/K+: {results.urinaryNaK}</Text>
						{getFeedbackText(results.urinaryNaK, 1, false)}
					</Flex>
					<Flex mt="4">
						<Text mr="10px">U/P Urea: {results.uP_urea}</Text>
						{getFeedbackText(results.uP_urea, 10, true)}
					</Flex>
					<Flex mt="4">
						<Text mr="10px">U/P Creatinine: {results.uP_creatinine}</Text>
						{getFeedbackText(results.uP_creatinine, 30, true)}
					</Flex>
				</Flex>
			</CardBody>
		</Card>
	);
}

export default ARF;


