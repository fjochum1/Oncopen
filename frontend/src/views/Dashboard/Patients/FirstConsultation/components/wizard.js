// Chakra imports
import {
	Avatar,
	Box,
	Button,
	ChakraProvider,
	Checkbox,
	CheckboxGroup,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Icon,
	Input,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
// Custom components
import React, { useRef, useState, useEffect } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { FaCube } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import theme from 'theme/theme.js';
import '@fontsource/bebas-neue';
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
//import fetchCurrentUser from "../../../api/fetchCurrentUser.js";
import fetchPatientById from "../../../../../api/fetchPatientById.js";

function Wizard() {
	const textColor = useColorModeValue("gray.700", "white");
	const bgPrevButton = useColorModeValue("gray.100", "gray.100");
	const iconColor = useColorModeValue("gray.400", "gray.700");
	const [activeBullets, setActiveBullets] = useState({
		MainReason: true,
		Symptom: false,
		Clinical: false,
		Investigations: false,
		Prescription: false
	});

	const MainReasonTab = useRef();
	const SymptomTab = useRef();
	const ClinicalTab = useRef();
	const InvestigationsTab = useRef();
	const PrescriptionsTab = useRef();

	const [symptom, setSymptom] = useState("no");

	const [height, setHeight] = useState('');
	const [weight, setWeight] = useState('');
	const [bmi, setBmi] = useState('');

	const [mammography, setMammography] = useState("no");
	const [echography, setEchography] = useState("no");
	const [MRI, setMRI] = useState("no");
	const [otherRadio, setOtherRadio] = useState("no");

	const [biopsy, setBiopsy] = useState("no");
	const [biopsyOther, setBiopsyOther] = useState("no");
	const [ERintensity, setERintensity] = useState('');
	const [ERpercentage, setERpercentage] = useState('');
	const [ERstatus, setERstatus] = useState('');
	const [PRintensity, setPRintensity] = useState('');
	const [PRpercentage, setPRpercentage] = useState('');
	const [PRstatus, setPRstatus] = useState('');
	const [HERintensity, setHERintensity] = useState('');
	const [HERfish, setHERfish] = useState('');
	const [HERstatus, setHERstatus] = useState('');

	const [exams, setExams] = useState([]);
	const [scannerOptions, setScannerOptions] = useState([]);
	const [irmOptions, setIrmOptions] = useState([]);
	const [scannerSelectedOptions, setScannerSelectedOptions] = useState([]);
	const [irmSelectedOptions, setIrmSelectedOptions] = useState([]);

	//const [userData, setUserData] = useState(null);

	const calculateBMI = () => {
		if (height && weight) {
			const heightInMeters = height / 100;
			console.log(heightInMeters);
			console.log(weight);
			const computedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
			setBmi(computedBmi);
		}
	};

	const calculateERstatus = () => {
		let computedERstatus = "";
		if (ERintensity || ERpercentage) {
			if (ERintensity === "+++" || ERintensity === "++" || parseFloat(ERpercentage) >= 10) {
				computedERstatus = "Positive";
			} else {
				computedERstatus = "Negative";
			}
			setERstatus(computedERstatus);
		}
	};

	const calculatePRstatus = () => {
		let computedPRstatus = "";
		if (PRintensity || PRpercentage) {
			if (PRintensity === "+++" || PRintensity === "++" || parseFloat(PRpercentage) >= 10) {
				computedPRstatus = "Positive";
			} else {
				computedPRstatus = "Negative";
			}
			setPRstatus(computedPRstatus);
		}
	};

	const calculateHERstatus = () => {
		let computedHERstatus = "";
		if (HERintensity || HERfish) {
			if (HERintensity === "+++" || HERintensity === "++" || HERfish === "Positive") {
				computedHERstatus = "Positive";
			} else {
				computedHERstatus = "Negative";
			}
			setHERstatus(computedHERstatus);
		}
	};

	//const fetchUserData = async () => {
	//	const data = await fetchCurrentUser();
	//	setUserData(data);
	//};

	//useEffect(() => {
	//	fetchUserData();
	//}, []);

	//const [patientData, setPatientData] = useState(null);

	//// Fetch user data when the component is mounted using the fetchCurrentUser function
	//const [formState, setFormState] = useState({});

	//useEffect(() => {
	//	async function fetchData() {
	//		const data = await fetchPatientById();
	//		setPatientData(data);

	//		setFormState({
	//			consultationId: data.consultationId || "",
	//			patientId: data.patientId || "",
	//			dateOfConsultation: data.dateOfConsultation || new Date(),
	//			consultationType: data.consultationType || "",
	//			anatomicArea: data.anatomicArea || "",
	//			main_reason: data.main_reason || "",
	//			cancerDetection: data.cancerDetection || "",
	//			historyOnco: data.historyOnco || "",
	//			symptoms: data.symptoms || "",
	//			symptomsTxt: data.symptomsTxt || "",
	//			height: data.height || null,
	//			weight: data.weight || null,
	//			bmi: data.bmi || null,
	//			performansStatus: data.performansStatus || "",
	//			generalExamination: data.generalExamination || "",
	//			tumorSide3cl: data.tumorSide3cl || "",
	//			clinicalTumorSizeMm: data.clinicalTumorSizeMm || null,
	//			clinicalTumorStageT: data.clinicalTumorStageT || "",
	//			lymphNodeInvasion: data.lymphNodeInvasion || "",
	//			clinicalTumorStageN: data.clinicalTumorStageN || "",
	//			inflammatorySigns: data.inflammatorySigns || "",
	//			mammography: data.mammography || "",
	//			dateMammography: data.dateMammography || null,
	//			acrClassification: data.acrClassification || "",
	//			mammographyDetails: data.mammographyDetails || "",
	//			breastEchography: data.breastEchography || "",
	//			dateBreastEchography: data.dateBreastEchography || null,
	//			breastEchographyDetails: data.breastEchographyDetails || "",
	//			breastMri: data.breastMri || "",
	//			dateBreastMri: data.dateBreastMri || null,
	//			breastMriDetails: data.breastMriDetails || "",
	//			otherRadiologicalExam: data.otherRadiologicalExam || "",
	//			dateOtherRadiologicalExam: data.dateOtherRadiologicalExam || null,
	//			whichRadiologicalExam: data.whichRadiologicalExam || "",
	//			otherRadiologicalExamSDetails: data.otherRadiologicalExamSDetails || "",
	//			breastBiopsy: data.breastBiopsy || "",
	//			dateBreastBiopsy: data.dateBreastBiopsy || null,
	//			breastBiopsyDetails: data.breastBiopsyDetails || "",
	//			erIntensity: data.erIntensity || "",
	//			erPercentage: data.erPercentage || null,
	//			erStatus: data.erStatus || "",
	//			prIntensity: data.prIntensity || "",
	//			prPercentage: data.prPercentage || null,
	//			prStatus: data.prStatus || "",
	//			herIntensity: data.herIntensity || "",
	//			herFish: data.herFish || "",
	//			herStatus: data.herStatus || "",
	//			grade: data.grade || null,
	//			nuclearGrade: data.nuclearGrade || null,
	//			ki67: data.ki67 || "",
	//			histologicalType: data.histologicalType || "",
	//			pdl1CPS: data.pdl1CPS || "",
	//			pdl1Value: data.pdl1Value || "",
	//			nodalCytology: data.nodalCytology || "",
	//			otherBiopsy: data.otherBiopsy || "",
	//			dateOtherBiopsy: data.dateOtherBiopsy || null,
	//			localisationOtherBiopsy: data.localisationOtherBiopsy || "",
	//			otherBiopsyDetails: data.otherBiopsyDetails || "",
	//			ca153: data.ca153 || "",
	//			ace: data.ace || ""
	//		});

	//	}
	//	fetchData();
	//}, []);

	//const handleInputChange = (event) => {
	//	const { name, value } = event.target;
	//	setFormState(prevState => ({ ...prevState, [name]: value }));
	//	onDataChanged(true);
	//};

	//async function handleSaveChanges() {
	//	AuthApi.Edit(formState).then(response => {
	//		if (response.data.success) {
	//			closeSettingsModal();
	//		} else {
	//			setError(response.data.msg)
	//		}
	//	}).catch(error => {
	//		if (error.response) {
	//			return setError(error.response.data.msg);
	//		}
	//		return setError("There has been an error.");
	//	})
	//}


	useEffect(() => {
		if (exams.includes('CT Scan')) {
			setScannerOptions(['Thoracic', 'Abdominal', 'Pelvic', 'Cervical', 'Cerebral']);
		} else {
			setScannerOptions([]);
		}

		if (exams.includes('MRI')) {
			setIrmOptions(['Mammary', 'Abdominal', 'Pelvic', 'Hepatic', 'Medullary']);
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
			if (exam === "CT Scan" || exam === "MRI") {
				const options = exam === "CT Scan" ? scannerSelectedOptions : irmSelectedOptions;
				examsArr.push({ name: exam, options: options.join(', ') });
			} else {
				examsArr.push({ name: exam, options: "" });
			}
		});

		return examsArr;
	};

	return (
		<ChakraProvider theme={theme}>
			{/*// Steps navigation*/}
			<Flex
				direction="column"
				minH="100vh"
				align="center"
				pt={{ sm: "100px", lg: "75px" }}
				backgroundColor="rgba(99, 135, 118, 0.1)"
			>
				{/*// Title*/}
				<Flex
					direction="column"
					textAlign="center"
					mb={{ sm: "10px", md: "20px" }}
					mt="0px"
				>
					<Text
						color="#94aca4"
						fontSize={{ sm: "2xl", md: "3xl", lg: "4xl" }}
						mb="0px"
						fontFamily="Bebas Neue, sans-serif"
					>
						FIRST CONSULTATION
					</Text>
					{/*<Text
				color="gray.400"
				fontWeight="normal"
				fontSize={{ sm: "sm", md: "lg" }}
			  >
				This information will let us know more about you.
			  </Text>*/}
				</Flex>
				{/*// Tabs*/}
				<Tabs variant="unstyled" mt="4px" display="flex" flexDirection="column">
					<TabList
						display="flex"
						align="center"
						alignSelf="center"
						justifySelf="center"
						width="700px"
					>
						{/*// First tab: Main Reason*/}
						<Tab
							ref={MainReasonTab}
							_focus="none"
							w={{ sm: "120px", md: "250px", lg: "300px" }}
							onClick={() =>
								setActiveBullets({
									MainReason: true,
									Symptom: false,
									Clinical: false,
									Investigations: false,
									Prescription: false
								})
							}
						>
							<Flex
								direction="column"
								justify="center"
								align="center"
								position="relative"
								_before={{
									content: "''",
									width: { sm: "35px", md: "70px", lg: "140px" },
									height: "4px",
									bg: activeBullets.Symptom ? "#94aca4" : "gray.300",
									left: { sm: "15px", md: "35px" },
									top: { sm: activeBullets.MainReason ? "6px" : "4px", md: null },
									position: "absolute",
									bottom: activeBullets.MainReason ? "40px" : "38px",
									zIndex: -1,
									transition: "all .3s ease"
								}}
							>
								<Icon
									as={BsCircleFill}
									color={activeBullets.MainReason ? "#94aca4" : "gray.300"}
									w={activeBullets.MainReason ? "20px" : "16px"}
									h={activeBullets.MainReason ? "20px" : "16px"}
									mb="26px"
								/>
								<Text
									color={activeBullets.MainReason ? "#94aca4" : "gray.400"}
									fontWeight={activeBullets.MainReason ? "bold" : "normal"}
									display={{ sm: "none", md: "block" }}
									_hover={{ color: "#6b8478" }}
									fontSize="sm"
								>
									Main Reason
								</Text>
							</Flex>
						</Tab>
						{/*// Second Tab: Symptom*/}
						<Tab
							ref={SymptomTab}
							_focus="none"
							w={{ sm: "120px", md: "250px", lg: "300px" }}
							onClick={() =>
								setActiveBullets({
									MainReason: true,
									Symptom: true,
									Clinical: false,
									Investigations: false,
									Prescription: false
								})
							}
						>
							<Flex
								direction="column"
								justify="center"
								align="center"
								position="relative"
								_before={{
									content: "''",
									width: { sm: "35px", md: "70px", lg: "140px" },
									height: "4px",
									bg: activeBullets.Clinical ? "#94aca4" : "gray.300",
									left: { sm: "10px", md: "32px" },
									top: { sm: activeBullets.Symptom ? "6px" : "4px", md: null },
									position: "absolute",
									bottom: activeBullets.Symptom ? "40px" : "38px",
									zIndex: -1,
									transition: "all .3s ease"
								}}
							>
								<Icon
									as={BsCircleFill}
									color={activeBullets.Symptom ? "#94aca4" : "gray.300"}
									w={activeBullets.Symptom ? "20px" : "16px"}
									h={activeBullets.Symptom ? "20px" : "16px"}
									mb="26px"
								/>
								<Text
									color={activeBullets.Symptom ? "#94aca4" : "gray.400"}
									fontWeight={activeBullets.Symptom ? "bold" : "normal"}
									transition="all .3s ease"
									fontSize="sm"
									_hover={{ color: "#6b8478" }}
									display={{ sm: "none", md: "block" }}
								>
									Symptom
								</Text>
							</Flex>
						</Tab>
						{/*// Third Tab: Clinical*/}
						<Tab
							ref={ClinicalTab}
							_focus="none"
							w={{ sm: "120px", md: "250px", lg: "300px" }}
							onClick={() =>
								setActiveBullets({
									MainReason: true,
									Symptom: true,
									Clinical: true,
									Investigations: false,
									Prescription: false
								})
							}
						>
							<Flex
								direction="column"
								justify="center"
								align="center"
								position="relative"
								_before={{
									content: "''",
									width: { sm: "35px", md: "70px", lg: "140px" },
									height: "4px",
									bg: activeBullets.Investigations ? "#94aca4" : "gray.300",
									left: { sm: "15px", md: "45px" },
									top: { sm: activeBullets.Clinical ? "6px" : "4px", md: null },
									position: "absolute",
									bottom: activeBullets.Clinical ? "40px" : "38px",
									zIndex: -1,
									transition: "all .3s ease"
								}}
							>
								<Icon
									as={BsCircleFill}
									color={activeBullets.Clinical ? "#94aca4" : "gray.300"}
									w={activeBullets.Clinical ? "20px" : "16px"}
									h={activeBullets.Clinical ? "20px" : "16px"}
									mb="5px"
								/>
								<Text
									color={activeBullets.Clinical ? "#94aca4" : "gray.400"}
									fontWeight={activeBullets.Clinical ? "bold" : "normal"}
									transition="all .3s ease"
									fontSize="sm"
									_hover={{ color: "#6b8478" }}
									display={{ sm: "none", md: "block" }}
								>
									Clinical examination
								</Text>
							</Flex>
						</Tab>
						{/*// Fourth Tab: Investigations*/}
						<Tab
							ref={InvestigationsTab}
							_focus="none"
							w={{ sm: "120px", md: "250px", lg: "300px" }}
							onClick={() =>
								setActiveBullets({
									MainReason: true,
									Symptom: true,
									Clinical: true,
									Investigations: true,
									Prescription: false
								})
							}
						>
							<Flex
								direction="column"
								justify="center"
								align="center"
								position="relative"
								_before={{
									content: "''",
									width: { sm: "35px", md: "70px", lg: "140px" },
									height: "4px",
									bg: activeBullets.Prescription ? "#94aca4" : "gray.300",
									left: { sm: "15px", md: "35px" },
									top: { sm: activeBullets.Investigations ? "6px" : "4px", md: null },
									position: "absolute",
									bottom: activeBullets.Investigations ? "40px" : "38px",
									zIndex: -1,
									transition: "all .3s ease"
								}}
							>
								<Icon
									as={BsCircleFill}
									color={activeBullets.Investigations ? "#94aca4" : "gray.300"}
									w={activeBullets.Investigations ? "20px" : "16px"}
									h={activeBullets.Investigations ? "20px" : "16px"}
									mb="26px"
								/>
								<Text
									color={activeBullets.Investigations ? "#94aca4" : "gray.400"}
									fontWeight={activeBullets.Investigations ? "bold" : "normal"}
									transition="all .3s ease"
									fontSize="sm"
									_hover={{ color: "#6b8478" }}
									display={{ sm: "none", md: "block" }}
								>
									Investigations
								</Text>
							</Flex>
						</Tab>
						{/*// Fifth Tab: Prescriptions*/}
						<Tab
							ref={PrescriptionsTab}
							_focus="none"
							w={{ sm: "120px", md: "250px", lg: "300px" }}
							onClick={() =>
								setActiveBullets({
									MainReason: true,
									Symptom: true,
									Clinical: true,
									Investigations: true,
									Prescription: true
								})
							}
						>
							<Flex
								direction="column"
								justify="center"
								align="center"
								position="relative"
								_before={{
									content: "''",
									width: { sm: "35px", md: "70px", lg: "140px" },
									height: "4px",
									//bg: activeBullets.Prescriptions ? "#94aca4": "gray.300",
									left: { sm: "15px", md: "35px" },
									top: { sm: activeBullets.Prescription ? "6px" : "4px", md: null },
									position: "absolute",
									bottom: activeBullets.Prescription ? "40px" : "38px",
									zIndex: -1,
									transition: "all .3s ease"
								}}
							>
								<Icon
									as={BsCircleFill}
									color={activeBullets.Prescription ? "#94aca4" : "gray.300"}
									w={activeBullets.Prescription ? "20px" : "16px"}
									h={activeBullets.Prescription ? "20px" : "16px"}
									mb="26px"
								/>
								<Text
									color={activeBullets.Prescription ? "#94aca4" : "gray.400"}
									fontWeight={activeBullets.Prescription ? "bold" : "normal"}
									transition="all .3s ease"
									fontSize="sm"
									_hover={{ color: "#6b8478" }}
									display={{ sm: "none", md: "block" }}
								>
									Prescriptions
								</Text>
							</Flex>
						</Tab>
					</TabList>

					{/*// Tab Panels*/}
					<TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto" boxShadow="0px 3px 7px rgba(0, 0, 0, 0.2)" backgroundColor={"#FAFAFA"}>
						// First Tab Panel: Main Reason
						<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
							<Box>
								<Flex mb="40px">
									<Flex
										direction="column"
										align="center"
										justify="center"
										textAlign="center"
										w="80%"
										mx="auto"
									>
										<Text
											color={textColor}
											fontSize="lg"
											fontWeight="bold"
											mb="4px"
										>
											What is the main reason of the consultation?
										</Text>
										<Text color="gray.400" fontWeight="normal" fontSize="sm">
											Enter first the anatomic area and then details on the main reason
										</Text>
									</Flex>
								</Flex>
								<Box>
									<Flex direction="column" w="100%">
										<Flex
											direction={{ sm: "column", md: "row" }}
											w="100%"
											mb="24px"
										>
											{/*<Box
										position="relative"
										minW={{ sm: "110px", xl: "150px" }}
										h={{ sm: "110px", xl: "150px" }}
										mx={{ sm: "auto", md: "40px", xl: "85px" }}
										mb={{ sm: "25px" }}
									>
									</Box>*/}
											<Stack direction="column" spacing="20px" w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="14" fontWeight="bold">
														Anatomic Area
													</FormLabel>
													<Stack direction="row">
														<RadioGroup>
															<Stack direction="row">
																<Radio value="Breast">Breast</Radio>
																<Radio value="Pelvis">Pelvis</Radio>
															</Stack>
														</RadioGroup>
													</Stack>
												</FormControl>
												<FormControl>
													<FormLabel
														color={textColor}
														fontSize="14"
														fontWeight="bold"
													>
														Main Reason of Consultation
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="e.g. right breast mass"
														fontSize="13"
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
											</Stack>
										</Flex>
										<Button
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => SymptomTab.current.click()}
											backgroundColor="#859e91"
											color="white"
											_hover={{ bg: "#6b8478" }}
											_active={{ bg: "#5a6e60" }}
										>
											<Text fontSize="xs" color="#fff" fontWeight="bold">
												NEXT
											</Text>
										</Button>
									</Flex>
								</Box>
							</Box>
						</TabPanel>
						{/*// Second Tab Panel: Symptom*/}
						<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
							<Box>
								<Flex mb="40px">
									<Flex
										direction="column"
										align="center"
										justify="center"
										textAlign="center"
										w="80%"
										mx="auto"
									>
										<Text color="gray.400" fontWeight="normal" fontSize="sm">
											Is there any symptom?
										</Text>
									</Flex>
								</Flex>
								<Box>
									<Flex direction="column" w="100%">
										<Stack direction="column" spacing="10px" w="100%">
											<FormControl>
												<FormLabel color={textColor} fontSize="14" fontWeight="bold">
													Symptom
												</FormLabel>
												<Stack direction="row">
													<RadioGroup defaultValue="no" onChange={(value) => setSymptom(value)}>
														<Stack direction="row">
															<Radio value="no">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</Stack>
											</FormControl>
											{symptom === "Yes" && (
												<FormControl>
													<FormLabel mt="30px" color={textColor} fontSize="14" fontWeight="bold">
														Which symptoms?
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="e.g asthenie"
														fontSize="13"
														_focus={{
															borderColor: "#94aca4",
															boxShadow: "0 0 0 1px #94aca4",
															borderWidth: "2px",
														}}
													/>
												</FormControl>
											)}
										</Stack>
										<Flex justify="space-between">
											<Button
												bg={bgPrevButton}
												alignSelf="flex-end"
												mt="24px"
												w={{ sm: "75px", lg: "100px" }}
												h="35px"
												onClick={() => MainReasonTab.current.click()}
											>
												<Text fontSize="xs" color="gray.700" fontWeight="bold">
													PREV
												</Text>
											</Button>
											<Button
												alignSelf="flex-end"
												mt="24px"
												w={{ sm: "75px", lg: "100px" }}
												h="35px"
												onClick={() => ClinicalTab.current.click()}
												backgroundColor="#859e91"
												color="white"
												_hover={{ bg: "#6b8478" }}
												_active={{ bg: "#5a6e60" }}
											>
												<Text fontSize="xs" color="#fff" fontWeight="bold">
													NEXT
												</Text>
											</Button>
										</Flex>
									</Flex>
								</Box>
							</Box>
						</TabPanel>
						{/*Third Tab Panel: Clinical*/}
						<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
							<Box>
								<Flex mb="40px">
									<Flex
										direction="column"
										align="center"
										justify="center"
										textAlign="center"
										w="80%"
										mx="auto"
									>
										{/*<Text
											color={textColor}
											fontSize="lg"
											fontWeight="bold"
											mb="4px"
										>
											Are you living in a nice area?
										</Text>*/}
										<Text color="gray.400" fontWeight="normal" fontSize="sm">
											Give details on the clinical examination
										</Text>
									</Flex>
								</Flex>
								<Box>
									<Flex direction="column" w="100%">
										<Stack direction="column" spacing="20px">
											<Text color="#94aca4" fontSize="lg" mb="4px" fontFamily="Bebas neue, sans-serif">
												General
											</Text>
											<Grid
												templateColumns={{ sm: "1fr 1fr", lg: "1fr 1fr 1fr" }}
												gap="30px"
											>
												<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														Height in cm
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="eg. 182"
														fontSize="12"
														value={height}
														onChange={(e) => setHeight(e.target.value)}
														onBlur={calculateBMI}
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
												<FormControl>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														Weight in kg
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="e.g. 70"
														fontSize="12"
														value={weight}
														onChange={(e) => setWeight(e.target.value)}
														onBlur={calculateBMI}
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
												<FormControl>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														BMI in kg/m2
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="calculated automatically"
														fontSize="12"
														value={bmi}
														readOnly
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
											</Grid>
											<FormControl>
												<FormLabel
													color={textColor}
													fontWeight="bold"
													fontSize="13"
												>
													General clinical examination
												</FormLabel>
												<Input
													borderRadius="15px"
													placeholder="eg. hepatomegaly"
													fontSize="12"
													_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
												/>
											</FormControl>
											<Divider />
											<Text color="#94aca4" fontSize="lg" mb="4px" fontFamily="Bebas neue, sans-serif">
												Breast
											</Text>
											<FormControl>
												<FormLabel color={textColor} fontSize="13" fontWeight="bold">
													Tumor laterality
												</FormLabel>
												<Stack direction="row">
													<RadioGroup onChange={(value) => setSymptom(value)}>
														<Stack direction="row">
															<Radio value="Left">Left</Radio>
															<Radio value="Right">Right</Radio>
															<Radio value="Bilateral">Bilateral</Radio>
														</Stack>
													</RadioGroup>
												</Stack>
											</FormControl>
											{/*{symptom === "Yes" && (
												<FormControl>

												</FormControl>*/}
											<Grid
												templateColumns={{ sm: "1fr 1fr", lg: "1fr 1fr" }}
												gap="30px"
											>
												<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														Clinical tumor size in mm
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="eg. 15"
														fontSize="12"
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
												<FormControl>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														Clinical tumor stage T
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="e.g. 70"
														fontSize="12"
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
											</Grid>
											<Grid
												templateColumns={{ sm: "1fr 1fr", lg: "1fr 1fr" }}
												gap="30px"
											>
												<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														Lymph node invasion
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="eg. 15"
														fontSize="12"
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
												<FormControl>
													<FormLabel
														color={textColor}
														fontWeight="bold"
														fontSize="13"
													>
														Clinical tumor stage N
													</FormLabel>
													<Input
														borderRadius="15px"
														placeholder="e.g. 70"
														fontSize="12"
														_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
													/>
												</FormControl>
											</Grid>
											<FormControl>
												<FormLabel color={textColor} fontSize="13" fontWeight="bold">
													Inflammatory signs
												</FormLabel>
												<Stack direction="row">
													<RadioGroup onChange={(value) => setSymptom(value)}>
														<Stack direction="row">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</Stack>
											</FormControl>
										</Stack>
										<Flex justify="space-between">
											<Button
												bg={bgPrevButton}
												alignSelf="flex-end"
												mt="24px"
												w={{ sm: "75px", lg: "100px" }}
												h="35px"
												onClick={() => SymptomTab.current.click()}
											>
												<Text fontSize="xs" color="gray.700" fontWeight="bold">
													PREV
												</Text>
											</Button>
											<Button
												alignSelf="flex-end"
												mt="24px"
												w={{ sm: "75px", lg: "100px" }}
												h="35px"
												backgroundColor="#859e91"
												color="white"
												_hover={{ bg: "#6b8478" }}
												_active={{ bg: "#5a6e60" }}
												onClick={() => InvestigationsTab.current.click()}
											>
												<Text fontSize="xs" color="#fff" fontWeight="bold">
													NEXT
												</Text>
											</Button>
										</Flex>
									</Flex>
								</Box>
							</Box>
						</TabPanel>
						{/*Fourth Tab Panel: Investigations*/}
						<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
							<Box>
								<Flex mb="40px">
									<Flex
										direction="column"
										align="center"
										justify="center"
										textAlign="center"
										w="80%"
										mx="auto"
									>
										{/*<Text
											color={textColor}
											fontSize="lg"
											fontWeight="bold"
											mb="4px"
										>
											Are you living in a nice area?
										</Text>*/}
										<Text color="gray.400" fontWeight="normal" fontSize="sm">
											What investigations have already been carried out?
										</Text>
									</Flex>
								</Flex>
								<Box>
									<Text color="#94aca4" fontSize="lg" mb="15px" fontFamily="Bebas neue, sans-serif">
										Radiology
									</Text>
									<Flex direction="column" w="100%">
										<Stack direction="column" spacing="20px">
											<Grid templateColumns="repeat(4, 1fr)" gap={2} w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="13" fontWeight="bold">
														Mammography
													</FormLabel>
													<RadioGroup defaultValue="no" onChange={(value) => setMammography(value)}>
														<Stack direction="row" spacing="15px">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												{mammography === "Yes" && (
													<>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Date of mammography
															</FormLabel>
															<Input
																type="date"
																borderRadius="15px"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																ACR Classification
															</FormLabel>
															<Select
																placeholder="Select ACR Classification"
																fontSize="12"
																borderRadius="15px"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															>
																<option value="ACR 0">ACR 0</option>
																<option value="ACR 1">ACR 1</option>
																<option value="ACR 2">ACR 2</option>
																<option value="ACR 3">ACR 3</option>
																<option value="ACR 4">ACR 4</option>
																<option value="ACR 5">ACR 5</option>
																<option value="ACR 6">ACR 6</option>
															</Select>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Details
															</FormLabel>
															<Input
																borderRadius="15px"
																placeholder="e.g calcifications"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
													</>
												)}
											</Grid>
											<Grid templateColumns="1fr 1fr 2fr" gap={2} w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="13" fontWeight="bold">
														Breast echography
													</FormLabel>
													<RadioGroup defaultValue="no" onChange={(value) => setEchography(value)}>
														<Stack direction="row" spacing="15px">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												{echography === "Yes" && (
													<>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Date of echography
															</FormLabel>
															<Input
																type="date"
																borderRadius="15px"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Details
															</FormLabel>
															<Input
																borderRadius="15px"
																placeholder="e.g irregular mass with spiculated margins"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
													</>
												)}
											</Grid>
											<Grid templateColumns="1fr 1fr 2fr" gap={2} w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="13" fontWeight="bold">
														Breast MRI
													</FormLabel>
													<RadioGroup defaultValue="no" onChange={(value) => setMRI(value)}>
														<Stack direction="row" spacing="15px">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												{MRI === "Yes" && (
													<>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Date of MRI
															</FormLabel>
															<Input
																type="date"
																borderRadius="15px"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Details
															</FormLabel>
															<Input
																borderRadius="15px"
																placeholder="e.g irregular mass with spiculated margins"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
													</>
												)}
											</Grid>
											<Grid templateColumns="1fr 1fr 1fr 1fr" gap={2} w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="13" fontWeight="bold">
														Other radiological examination
													</FormLabel>
													<RadioGroup defaultValue="no" onChange={(value) => setOtherRadio(value)}>
														<Stack direction="row" spacing="15px">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												{otherRadio === "Yes" && (
													<>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Date of examination
															</FormLabel>
															<Input
																type="date"
																borderRadius="15px"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Which one?
															</FormLabel>
															<Input
																borderRadius="15px"
																placeholder="e.g abdominal CT scan"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Details
															</FormLabel>
															<Input
																borderRadius="15px"
																placeholder="e.g hepatic metastasis"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
													</>
												)}
											</Grid>
											<Divider />
											<Text color="#94aca4" fontSize="lg" mb="4px" fontFamily="Bebas neue, sans-serif">
												Pathology
											</Text>
											<Grid templateColumns="1fr 1fr 2fr" gap={2} w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="13" fontWeight="bold">
														Breast biopsy
													</FormLabel>
													<RadioGroup defaultValue="no" onChange={(value) => setBiopsy(value)}>
														<Stack direction="row" spacing="15px">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
												{biopsy === "Yes" && (
													<>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Date of biopsy
															</FormLabel>
															<Input
																type="date"
																borderRadius="15px"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
														<FormControl>
															<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
																Details
															</FormLabel>
															<Input
																borderRadius="15px"
																placeholder="e.g invasive ductal carcinoma"
																fontSize="13"
																_focus={{
																	borderColor: "#94aca4",
																	boxShadow: "0 0 0 1px #94aca4",
																	borderWidth: "2px",
																}}
															/>
														</FormControl>
													</>
												)}
											</Grid>
											{(biopsy === 'Yes') && (
												<>
													<Stack direction="column" spacing="20px">
														<Grid
															templateColumns="1fr 1fr 2fr"
															gap={2}
														>
															<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	ER intensity
																</FormLabel>
																<RadioGroup onChange={(value) => setERintensity(value)} onBlur={calculateERstatus}>
																	<Stack direction="row" spacing="15px">
																		<Radio value="+">+</Radio>
																		<Radio value="++">++</Radio>
																		<Radio value="+++">+++</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	ER percentage
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="e.g. 15"
																	fontSize="12"
																	value={ERpercentage}
																	onChange={(e) => setERpercentage(e.target.value)}
																	onBlur={calculateERstatus}
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	ER status
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="calculated automatically"
																	fontSize="12"
																	value={ERstatus}
																	readOnly
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
														</Grid>
														<Grid
															templateColumns="1fr 1fr 2fr"
															gap={2}
														>
															<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	PR intensity
																</FormLabel>
																<RadioGroup onChange={(value) => setPRintensity(value)} onBlur={calculatePRstatus}>
																	<Stack direction="row" spacing="15px">
																		<Radio value="+">+</Radio>
																		<Radio value="++">++</Radio>
																		<Radio value="+++">+++</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	PR percentage
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="e.g. 70"
																	fontSize="12"
																	value={PRpercentage}
																	onChange={(e) => setPRpercentage(e.target.value)}
																	onBlur={calculatePRstatus}
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	PR status
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="calculated automatically"
																	fontSize="12"
																	value={PRstatus}
																	readOnly
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
														</Grid>
														<Grid
															templateColumns="1fr 1fr 2fr"
															gap={2}
														>
															<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	HER intensity
																</FormLabel>
																<RadioGroup onChange={(value) => setHERintensity(value)} onBlur={calculateHERstatus}>
																	<Stack direction="row" spacing="15px">
																		<Radio value="+">+</Radio>
																		<Radio value="++">++</Radio>
																		<Radio value="+++">+++</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	HER fish
																</FormLabel>
																<RadioGroup onChange={(value) => setHERfish(value)} onBlur={calculateHERstatus}>
																	<Stack direction="row" spacing="15px">
																		<Radio value="Negative">Negative</Radio>
																		<Radio value="Positive">Positive</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	HER status
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="calculated automatically"
																	fontSize="12"
																	value={HERstatus}
																	readOnly
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
														</Grid>
														<Grid
															templateColumns="1fr 1fr 2fr"
															gap={2}
														>
															<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	Grade
																</FormLabel>
																<RadioGroup>
																	<Stack direction="row" spacing="15px">
																		<Radio value="1">1</Radio>
																		<Radio value="2">2</Radio>
																		<Radio value="3">3</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	Nuclear grade
																</FormLabel>
																<RadioGroup>
																	<Stack direction="row" spacing="15px">
																		<Radio value="1">1</Radio>
																		<Radio value="2">2</Radio>
																		<Radio value="3">3</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	Ki67
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="e.g. 70"
																	fontSize="12"
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
														</Grid>
														<FormControl>
															<FormLabel
																color={textColor}
																fontWeight="bold"
																fontSize="13"
															>
																Histological type
															</FormLabel>
															<RadioGroup>
																<Stack direction="row" spacing="15px">
																	<Radio value="1">NST</Radio>
																	<Radio value="2">Lobular</Radio>
																	<Radio value="3">Mucinous</Radio>
																	<Radio value="4">Tubulous</Radio>
																	<Radio value="9">Others</Radio>
																</Stack>
															</RadioGroup>
														</FormControl>
														<Grid
															templateColumns="1fr 1fr"
															gap={2}
															w="90"
														>
															<FormControl>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	PDL1 (CPS)
																</FormLabel>
																<RadioGroup>
																	<Stack direction="row" spacing="15px">
																		<Radio value="No">No</Radio>
																		<Radio value="Yes">Yes</Radio>
																	</Stack>
																</RadioGroup>
															</FormControl>
															<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
																<FormLabel
																	color={textColor}
																	fontWeight="bold"
																	fontSize="13"
																>
																	PDL1 value
																</FormLabel>
																<Input
																	borderRadius="15px"
																	placeholder="e.g. 45"
																	fontSize="12"
																	_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
																/>
															</FormControl>
														</Grid>
													</Stack>
												</>
											)}
											<FormControl>
												<FormLabel color={textColor} fontSize="13" fontWeight="bold">
													Nodal cytology
												</FormLabel>
												<RadioGroup defaultValue="no" onChange={(value) => setBiopsyOther(value)}>
													<Stack direction="row" spacing="15px">
														<Radio value="Negative">Negative</Radio>
														<Radio value="Positive">Positive</Radio>
														<Radio value="Not performed">Not performed</Radio>
													</Stack>
												</RadioGroup>
											</FormControl>
											<Grid templateColumns="1fr 1fr 1fr 1fr" gap={2} w="100%">
												<FormControl>
													<FormLabel color={textColor} fontSize="13" fontWeight="bold">
														Other biopsy
													</FormLabel>
													<RadioGroup defaultValue="no" onChange={(value) => setBiopsyOther(value)}>
														<Stack direction="row" spacing="15px">
															<Radio value="No">No</Radio>
															<Radio value="Yes">Yes</Radio>
														</Stack>
													</RadioGroup>
												</FormControl>
											</Grid>
											{biopsyOther === "Yes" && (
												<>
													<FormControl>
														<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
															Date of biopsy
														</FormLabel>
														<Input
															type="date"
															borderRadius="15px"
															fontSize="13"
															_focus={{
																borderColor: "#94aca4",
																boxShadow: "0 0 0 1px #94aca4",
																borderWidth: "2px",
															}}
														/>
													</FormControl>
													<FormControl>
														<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
															Localisation
														</FormLabel>
														<Input
															borderRadius="15px"
															placeholder="e.g hepatic"
															fontSize="13"
															_focus={{
																borderColor: "#94aca4",
																boxShadow: "0 0 0 1px #94aca4",
																borderWidth: "2px",
															}}
														/>
													</FormControl>
													<FormControl>
														<FormLabel mt="0px" color={textColor} fontSize="13" fontWeight="bold">
															Details
														</FormLabel>
														<Input
															borderRadius="15px"
															placeholder="e.g hepatic metastasis"
															fontSize="13"
															_focus={{
																borderColor: "#94aca4",
																boxShadow: "0 0 0 1px #94aca4",
																borderWidth: "2px",
															}}
														/>
													</FormControl>
												</>
											)}
										</Stack>
										<Divider mb="5" mt="5" />
										<Text color="#94aca4" fontSize="lg" mb="4px" fontFamily="Bebas neue, sans-serif">
											Biology
										</Text>
										<Grid
											templateColumns="1fr 1fr"
											gap={2}
										>
											<FormControl gridColumn={{ sm: "1 / 3", lg: "auto" }}>
												<FormLabel
													color={textColor}
													fontWeight="bold"
													fontSize="13"
												>
													CA 15.3
												</FormLabel>
												<Input
													borderRadius="15px"
													placeholder="e.g. 30"
													fontSize="12"
													_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
												/>
											</FormControl>
											<FormControl>
												<FormLabel
													color={textColor}
													fontWeight="bold"
													fontSize="13"
												>
													ACE
												</FormLabel>
												<Input
													borderRadius="15px"
													placeholder="e.g. 10"
													fontSize="12"
													_focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }}
												/>
											</FormControl>
										</Grid>
										<Flex justify="space-between">
											<Button
												bg={bgPrevButton}
												alignSelf="flex-end"
												mt="24px"
												w={{ sm: "75px", lg: "100px" }}
												h="35px"
												onClick={() => ClinicalTab.current.click()}
											>
												<Text fontSize="xs" color="gray.700" fontWeight="bold">
													PREV
												</Text>
											</Button>
											<Button
												alignSelf="flex-end"
												mt="24px"
												w={{ sm: "75px", lg: "100px" }}
												h="35px"
												backgroundColor="#859e91"
												color="white"
												_hover={{ bg: "#6b8478" }}
												_active={{ bg: "#5a6e60" }}
												onClick={() => PrescriptionsTab.current.click()}
											>
												<Text fontSize="xs" color="#fff" fontWeight="bold">
													NEXT
												</Text>
											</Button>
										</Flex>
									</Flex>
								</Box>
							</Box>
						</TabPanel>
						{/*// Fifth Tab Panel: Symptom*/}
						<TabPanel w={{ sm: "330px", md: "700px", lg: "850px" }} mx="auto">
							<Box>
								<Flex mb="40px">
									<Flex
										direction="column"
										align="center"
										justify="center"
										textAlign="center"
										w="80%"
										mx="auto"
									>
										<Text color="gray.400" fontWeight="normal" fontSize="sm">
											What do you want to prescribe?
										</Text>
									</Flex>
								</Flex>
								<Box>
									<Flex direction="column" w="100%">
										<CheckboxGroup colorScheme="green" value={exams} onChange={setExams}>
											<Stack spacing={5}>
												<Checkbox value="Mammography">Mammography</Checkbox>
												<Checkbox value="Breast echography">Breast echography</Checkbox>
												<Checkbox value="CT Scan">CT Scan</Checkbox>
												{exams.includes('CT Scan') &&
													scannerOptions.map((option, index) => (
														<Box pl="20px" key={index}>
															<Checkbox isChecked={scannerSelectedOptions.includes(option)} onChange={(e) => handleScannerOptionChange(e, option)}>{option}</Checkbox>
														</Box>
													))
												}
												<Checkbox value="MRI">MRI</Checkbox>
												{exams.includes('MRI') &&
													irmOptions.map((option, index) => (
														<Box pl="20px" key={index}>
															<Checkbox isChecked={irmSelectedOptions.includes(option)} onChange={(e) => handleIrmOptionChange(e, option)}>{option}</Checkbox>
														</Box>
													))
												}
												<Checkbox value="Chest X-ray">Chest X-ray</Checkbox>
												<Checkbox value="Abdominal echography">Abdominal echography</Checkbox>
											</Stack>
										</CheckboxGroup>
									</Flex>
									<Flex justify="space-between">
										<Button
											bg={bgPrevButton}
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={() => InvestigationsTab.current.click()}
										>
											<Text fontSize="xs" color="gray.700" fontWeight="bold">
												PREV
											</Text>
										</Button>
										<Button
											alignSelf="flex-end"
											mt="24px"
											w={{ sm: "75px", lg: "100px" }}
											h="35px"
											onClick={e => handleSaveChanges(e)}
											backgroundColor="#859e91"
											color="white"
											_hover={{ bg: "#6b8478" }}
											_active={{ bg: "#5a6e60" }}
										>
											<Text fontSize="xs" color="#fff" fontWeight="bold">
												SAVE
											</Text>
										</Button>
									</Flex>
								</Box>
							</Box>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Flex >
		</ChakraProvider >
	);
}

export default Wizard;
