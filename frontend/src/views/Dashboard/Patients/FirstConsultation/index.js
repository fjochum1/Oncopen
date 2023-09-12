import React, { useState, useEffect } from "react";
import { Stack, Input, FormLabel, Heading, Box, Button, ButtonGroup, CheckboxGroup, Checkbox, Flex, RadioGroup, Radio } from "@chakra-ui/react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
//import saveAs from 'file-saver';

const FirstConsultation = () => {
	const [caregiver_name, setPrName] = useState("");
	const [caregiver_surname, setPrSurname] = useState("");
	const [prescript_number, setPrNumber] = useState("");
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [sex, setSex] = useState("");
	const [age, setAge] = useState("");
	const [exams, setExams] = useState([]);
	const [scannerOptions, setScannerOptions] = useState([]);
	const [irmOptions, setIrmOptions] = useState([]);
	const [scannerSelectedOptions, setScannerSelectedOptions] = useState([]);
	const [irmSelectedOptions, setIrmSelectedOptions] = useState([]);

	const current_date = new Date().toLocaleDateString("fr-FR");

	useEffect(() => {
		if (dateOfBirth) {
			const birthDate = new Date(dateOfBirth);
			const currDate = new Date();
			const diff = currDate - birthDate;
			const ageByDate = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
			setAge(ageByDate);
		}
	}, [dateOfBirth]);

	useEffect(() => {
		if (exams.includes('Scanner')) {
			setScannerOptions(['Thoracique', 'Abdominal', 'Pelvien', 'Cervical', 'Cérébral']);
		} else {
			setScannerOptions([]);
		}

		if (exams.includes('IRM')) {
			setIrmOptions(['Mammaire', 'Abdominale', 'Pelvienne', 'Hépatique', 'Médullaire']);
		} else {
			setIrmOptions([]);
		}
	}, [exams]);

	const handleScannerOptionChange = (e, option) => {
		if (e.target.checked) {
			setScannerSelectedOptions(prevState => [...prevState, option]);
		} else {
			setScannerSelectedOptions(prevState => prevState.filter(opt => opt !== option));
		}
	};

	const handleIrmOptionChange = (e, option) => {
		if (e.target.checked) {
			setIrmSelectedOptions(prevState => [...prevState, option]);
		} else {
			setIrmSelectedOptions(prevState => prevState.filter(opt => opt !== option));
		}
	};

	  const formatExamen = () => {
		let examsArr = [];

		exams.forEach((exam) => {
		  if (exam === "Scanner" || exam === "IRM") {
			const options = exam === "Scanner" ? scannerSelectedOptions : irmSelectedOptions;
			examsArr.push({ name: exam, options: options.join(', ') });
		  } else {
			examsArr.push({ name: exam, options: "" });
		  }
		});

		return examsArr;
	  };

	  const printDocument = () => {
		const examsArray = formatExamen();

		examsArray.forEach((examData) => {
		  fetch(process.env.PUBLIC_URL + "/docs/ordo.docx")
			.then((response) => response.arrayBuffer())
			.then((buffer) => {
			  const zip = new PizZip(buffer);
			  const doc = new Docxtemplater(zip);

			  const examWithOptions = examData.name + (examData.options !== "" ? `: ${examData.options}` : "");

			  doc.setData({
				caregiver_surname,
				caregiver_name,
				prescript_number,
				name,
				surname,
				dateOfBirth: new Date(dateOfBirth).toLocaleDateString("fr-FR"),
				age,
				sex,
				examen: examWithOptions,
				current_date,
			  });

			  doc.render();

			  const output = doc.getZip().generate({ type: "blob" });

			  const url = window.URL.createObjectURL(output);
			  const link = document.createElement("a");
			  link.href = url;
			  link.download = `${examData.name}_output.docx`;
			  document.body.appendChild(link);
			  link.click();
			  // Cleanup
			  document.body.removeChild(link);
			  setTimeout(() => window.URL.revokeObjectURL(url), 100);
			})
			.catch((err) => {
			  console.error(err);
			});
		});
	  };

	return (
		<Flex justifyContent='center' mb='60px' mt='20px' >
			<Box fontFamily="Roboto, monospace" w='50%' marginRight='50px'>
				<Heading mb={5} fontSize="2xl" fontFamily="Inconsolata" color="#859e91" textDecoration="underline">
					First Consultation
				</Heading>
				<Stack spacing={5}>
					<FormLabel>Prescriber name:</FormLabel>
					<Input placeholder="Enter your name" size="md" value={caregiver_name} onChange={e => setPrName(e.target.value)} />

					<FormLabel>Prescriber surname:</FormLabel>
					<Input placeholder="Enter your surname" size="md" value={caregiver_surname} onChange={e => setPrSurname(e.target.value)} />

					<FormLabel>Prescriber number:</FormLabel>
					<Input placeholder="Enter your prescriber number" size="md" value={prescript_number} onChange={e => setPrNumber(e.target.value)} />

					<FormLabel>Name:</FormLabel>
					<Input placeholder="Enter patient's name" size="md" value={name} onChange={e => setName(e.target.value)} />

					<FormLabel>Surname:</FormLabel>
					<Input placeholder="Enter patient's surname" size="md" value={surname} onChange={e => setSurname(e.target.value)} />

					<FormLabel>Sex:</FormLabel>
					<RadioGroup onChange={setSex} value={sex}>
						<Stack direction="row">
							<Radio value="F">F</Radio>
							<Radio value="M">M</Radio>
						</Stack>
					</RadioGroup>

					<FormLabel>Date of Birth:</FormLabel>
					<Input type="date" size="md" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />

					<FormLabel>Age:</FormLabel>
					<Input placeholder="Age will be calculated automatically" size="md" value={age} isReadOnly />

					<ButtonGroup spacing={20} mt={20}>
						<Button
							onClick={printDocument}
							backgroundColor="#859e91"
							color="white"
							_hover={{ bg: "#6b8478" }}
							_active={{ bg: "#5a6e60" }}>
							Print Document
						</Button>
					</ButtonGroup>
				</Stack>
			</Box>
			<Box backgroundColor='#b3c3bb' w='30%' h='80vh' rounded='lg' p={5} overflowY='auto' marginTop="40px">
				<Heading mb={5} fontSize="2xl" fontFamily="Inconsolata" color="white" textDecoration="underline">Ordonnance</Heading>
				<CheckboxGroup colorScheme="green" value={exams} onChange={setExams}>
					<Stack spacing={5}>
						<Checkbox value="Mammographie">Mammographie</Checkbox>
						<Checkbox value="Echographie mammaire">Echographie mammaire</Checkbox>
						<Checkbox value="Scanner">Scanner</Checkbox>
						{exams.includes('Scanner') &&
							scannerOptions.map((option, index) => (
								<Box pl="20px" key={index}>
									<Checkbox isChecked={scannerSelectedOptions.includes(option)} onChange={(e) => handleScannerOptionChange(e, option)}>{option}</Checkbox>
								</Box>
							))
						}
						<Checkbox value="IRM">IRM</Checkbox>
						{exams.includes('IRM') &&
							irmOptions.map((option, index) => (
								<Box pl="20px" key={index}>
									<Checkbox isChecked={irmSelectedOptions.includes(option)} onChange={(e) => handleIrmOptionChange(e, option)}>{option}</Checkbox>
								</Box>
							))
						}
						<Checkbox value="Radiographie du thorax">Radiographie du thorax</Checkbox>
						<Checkbox value="Echographie abdominale">Echographie abdominale</Checkbox>
					</Stack>
				</CheckboxGroup>
			</Box>
		</Flex>
	);
};

export default FirstConsultation;
