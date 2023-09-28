import React, {useState, useEffect} from 'react'; // Importez React
import '../../../../../styles/SettingsMedicalHistory.css';
import { fetchMedicalHistory, createEmptyMedicalHistory, updateMedicalHistory } from '../../../../../api/fetchMedicalHistory';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
  } from '@chakra-ui/react'

import {
	Flex,
	Box,
	Radio,
    RadioGroup,
    HStack,
    Select,
	Input,
	FormControl,
	FormLabel,
	Button,
    Textarea,
} from "@chakra-ui/react";



function SettingsMedicalHistory({onClose}) {
    const [isAllergiesSelected, setIsAllergiesSelected] = useState(false);
    const [isSmokeSelected, setIsSmokeSelected] = useState(false);
    const [isMedicalSelected, setIsMedicalSelected] = useState(false);
    const [isSurgicalSelected, setIsSurgicalSelected] = useState(false);
    const [isFamilialSelected, setIsFamilialSelected] = useState(false);
    const [isFamilialBreastSelected, setIsFamilialBreastSelected] = useState(false);
    const [isAlcoholSelected, setIsAlcoholSelected] = useState(false);
    const [isComedicationSelected, setIsComedicationSelected] = useState(false);
    const [isComedicationPlusSelected, setIsComedicationPlusSelected] = useState(false);
    const [isGenderSelected, setIsGenderSelected] = useState(false);
    const [isPersonalFamilialSelected, setIsPersonalFamilialSelected] = useState(false);	


	const [formData, setFormData] = useState({});
    
	useEffect(() => {
	
		 const urlHash = window.location.hash;
		 const matches = urlHash.match(/#\/patient\/([^/]+)/);
		  if (matches && matches.length > 1) {
			const patient_id = matches[1];
		// Appelez fetchMedicalHistory avec l'ID du patient
		fetchMedicalHistory(patient_id)
		  .then((formData) => {
			console.log(formData);
			// Si des données médicales existent, mettez-les à jour dans le state
			if (Object.keys(formData).length === 0 && formData.constructor === Object) {
				const emptyFormData = {};
				const patient_id = matches[1];
				createEmptyMedicalHistory({ patient_id, ...emptyFormData })
				        .then((response) => {
				          console.log(response.data.message);
							
				        })
				        .catch((error) => {
				          console.error('Erreur lors de la création des données médicales :', error);
				        });
		
			
			  console.log('Pas de FormData')

			} else {
				console.log('FormData')
				// Initialize formData with empty values
				setFormData({
					patient_id:"",
					gender: formData.gender || "",
					menopause: formData.menopause || "",
					allergies: formData.allergies || "",
					allergiesDescription: formData.allergiesDescription || "",
					lifestyle: formData.lifestyle || "",
					smoke: formData.smoke || "",
					smokeDescription: formData.smokeDescription || "",
					alcohol: formData.alcohol || "",
					alcoholDescription: formData.alcoholDescription || "",
					gynObsHistory: formData.gynObsHistory || "",
					gestityParity: formData.gestityParity || "",
					contraception: formData.contraception || "",
					medicalHistory: formData.medicalHistory || "",
					medicalHistoryDescription: formData.medicalHistoryDescription || "",
					surgicalHistory: formData.surgicalHistory || "",
					surgicalHistoryDescription: formData.surgicalHistoryDescription || "",
					familialHistory: formData.familialHistory || "",
					familialHistoryDescription: formData.familialHistoryDescription || "",
					personalFamilialHistoryCancer: formData.personalFamilialHistoryCancer || "",
					familyBreastCancerHistory: formData.familialBreastCancerHistory || "",
					familyBreastCancerHistoryDescription: formData.familyBreastCancerHistoryDescription || "",
					suspiLynch: formData.suspiLynch || "",
					mutScreen: formData.mutScreen || "",
					brcaPalbMut: formData.brcaPalbMut || "",
					brcaPalbMutDescription: formData.brcaPalbMutDescription || "",
					comedication: formData.comedication || "",
					comedicationDescription: formData.comedicationDescription || "",
					comedicationPlus: formData.comedicationPlus || "",
					comedicationPlusDescription: formData.comedicationPlusDescription || ""
				  });

				  if (formData.gender === 'F') {
					setIsGenderSelected(true);
				  } else {
					setIsGenderSelected(false);
				  }

				  if (formData.allergies === 'Yes') {
					setIsAllergiesSelected(true);
				  } else {
					setIsAllergiesSelected(false);
				  }

				  if (formData.smoke === 'Yes') {
					setIsSmokeSelected(true);
				  } else {
					setIsSmokeSelected(false);
				  }
				  if (formData.medicalHistory === 'Yes') {
					setIsMedicalSelected(true);
				  } else {
					setIsMedicalSelected(false);
				  }
				  if (formData.surgicalHistory === 'Yes') {
					setIsSurgicalSelected(true);
				  } else {
					setIsSurgicalSelected(false);
				  }
				  if (formData.familyHistory === 'Yes') {
					setIsFamilialSelected(true);
				  } else {
					setIsFamilialSelected(false);
				  }
				  if (formData.familialBreastCancerHistory === 'Yes') {
					setIsFamilialBreastSelected(true);
				  } else {
					setIsFamilialBreastSelected(false);
				  }
				  if (formData.alcohol === 'Yes') {
					setIsAlcoholSelected(true);
				  } else {
					setIsAlcoholSelected(false);
				  }
				  if (formData.comedication === 'Yes') {
					setIsComedicationSelected(true);
				  } else {
					setIsComedicationSelected(false);
				  }
				  if (formData.comedicationPlus === 'Yes') {
					setIsComedicationPlusSelected(true);
				  } else {
					setIsComedicationPlusSelected(false);
				  }
				  if (formData.personalFamilialHistoryCancer === 'Yes') {
					setIsPersonalFamilialSelected(true);
				  } else {
					setIsPersonalFamilialSelected(false);
				  }
				  if (formData.familialBreastCancerHistory === 'Yes') {
					setIsFamilialBreastSelected(true);
				  } else {
					setIsFamilialBreastSelected(false);
				  }
				 
			  


			  }
		  }) 
		  .catch((error) => {
			console.error('Erreur lors de la récupération des données médicales :', error);
			
		  }); 
		} else {
			console.error('L\'URL ne contient pas d\'ID de patient valide.');
		}
	  }, []);



	  
	const handleGenderChange = (event) => {const value = event.target.value; setIsGenderSelected(value === 'F') ; setFormData ({...formData, gender: value})};
	const handleMenopauseChange = (event) => {const value = event.target.value; setFormData({ ...formData, menopause: value })};
	const handleAllergiesChange = (event) => { const value = event.target.value; setIsAllergiesSelected(value === 'Yes'); setFormData ({...formData, allergies: value})}
	const handleAllergiesDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, allergiesDescription: value })};
	const handleLifestyleChange = (event) => {const value = event.target.value; setFormData({ ...formData, lifestyle: value })};
	const handleSmokeChange = (event) => {const value = event.target.value; setIsSmokeSelected(value === 'Yes') ; setFormData ({...formData, smoke: value})};
	const handleSmokeDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, smokeDescription: value })};
	const handleAlcoholChange = (event) => {const value = event.target.value; setIsAlcoholSelected(value === 'Yes') ; setFormData ({...formData, alcohol: value})};
	const handleAlcoholDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, alcoholDescription: value })};
	const handleGynObsChange = (event) => {const value = event.target.value; setFormData({ ...formData, gynObsHistory: value })};
	const handleGestityParityChange = (event) => {const value = event.target.value; setFormData({ ...formData, gestityParity: value })};	
	const handleContraceptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, contraception: value })};
    const handleMedicalChange = (event) => {const value = event.target.value; setIsMedicalSelected(value === 'Yes') ; setFormData ({...formData, medicalHistory: value})};
	const handleMedicalDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, medicalHistoryDescription: value })};
	const handleSurgicalChange = (event) => {const value = event.target.value; setIsSurgicalSelected(value === 'Yes') ; setFormData ({...formData, surgicalHistory: value})};
	const handleSurgicalDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, surgicalHistoryDescription: value })};
	const handleFamilialChange = (event) => {const value = event.target.value; setIsFamilialSelected(value === 'Yes') ; setFormData ({...formData, familialHistory: value})};
	const handleFamilialDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, familialHistoryDescription: value })};
	const handlePersonalFamilialChange = (event) => {const value = event.target.value; setIsPersonalFamilialSelected(value === 'Yes') ; setFormData ({...formData, personalFamilialHistoryCancer: value})};
	const handleFamilialBreastChange = (event) => {const value = event.target.value; setIsFamilialBreastSelected(value === 'Yes') ; setFormData ({...formData, familialBreastCancerHistory: value})};
	const handleFamilialBreastDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, familyBreastCancerHistoryDescription: value })};
	const handleSuspiLynchChange = (event) => {const value = event.target.value; setFormData({ ...formData, suspiLynch: value })};
	const handleMutScreenChange = (event) => {const value = event.target.value; setFormData({ ...formData, mutScreen: value })};
	const handleBrcaPalbMutChange = (event) => {const value = event.target.value; setFormData({ ...formData, brcaPalbMut: value })};
	const handleBrcaPalbMutDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, brcaPalbMutDescription: value })};
	const handleComedicationChange = (event) => {const value = event.target.value; setIsComedicationSelected(value === 'Yes') ; setFormData ({...formData, comedication: value})};
	const handleComedicationDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, comedicationDescription: value })};
	const handleComedicationPlusChange = (event) => {const value = event.target.value; setIsComedicationPlusSelected(value === 'Yes') ; setFormData ({...formData, comedicationPlus: value})};
	const handleComedicationPlusDescriptionChange = (event) => {const value = event.target.value; setFormData({ ...formData, comedicationPlusDescription: value });}
	  

	

const handleSaveData = () => {
  // Créez un objet avec les données du formulaire que vous souhaitez envoyer
  if (!formData.gender || !formData.allergies || !formData.lifestyle || !formData.smoke ||  !formData.alcohol ||  !formData.medicalHistory || !formData.surgicalHistory ||  !formData.familialHistory ||  !formData.personalFamilialHistoryCancer || 
	 !formData.comedication || !formData.comedicationPlus ) {
	alert("Veuillez remplir tous les champs obligatoires.");

	return;
  } 
  const formDataToSend = {
    gender: formData.gender,
    menopause: formData.menopause,
    allergies: formData.allergies,
    allergiesDescription: formData.allergiesDescription,
	lifestyle: formData.lifestyle,
	smoke: formData.smoke,
	smokeDescription: formData.smokeDescription,
	alcohol: formData.alcohol,
	alcoholDescription: formData.alcoholDescription,
	gynObsHistory: formData.gynObsHistory,
	gestityParity: formData.gestityParity,
	contraception: formData.contraception,
	medicalHistory: formData.medicalHistory,
	medicalHistoryDescription: formData.medicalHistoryDescription,
	surgicalHistory: formData.surgicalHistory,
	surgicalHistoryDescription: formData.surgicalHistoryDescription,
	familialHistory: formData.familialHistory,
	familialHistoryDescription: formData.familialHistoryDescription,
	personalFamilialHistoryCancer: formData.personalFamilialHistoryCancer,
	familyBreastCancerHistory:formData.familyBreastCancerHistory,
	familyBreastCancerHistoryDescription: formData.familyBreastCancerHistoryDescription,
	suspiLynch: formData.suspiLynch,
	mutScreen: formData.mutScreen,
	brcaPalbMut:formData.brcaPalbMut,
	brcaPalbMutDescription: formData.brcaPalbMutDescription,
	comedication: formData.comedication,
	comedicationDescription: formData.comedicationDescription,
	comedicationPlus: formData.comedicationPlus,
	comedicationPlusDescription: formData.comedicationPlusDescription,
  
  };
	const urlHash = window.location.hash;
	const matches = urlHash.match(/#\/patient\/([^/]+)/);
  
	if (matches && matches.length > 1) {
	  const patient_id = matches[1];
	updateMedicalHistory(patient_id ,formDataToSend)
      .then((response) => {
        console.log(response.data.message);
	
        onClose();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour des données médicales :', error);
      });
  } else {
	console.error('L\'URL ne contient pas d\'ID de patient valide.');
  }
};



  return (

<Accordion  allowMultiple>
	
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
          Medical History
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
	
	<FormControl mb={4}>
					<FormLabel as='legend'>
						Gender  
					</FormLabel>
					<RadioGroup  value={formData.gender}>
						<HStack spacing='100px'>
							<Radio value='M'   onChange={handleGenderChange}>
								M
							</Radio>
							<Radio value='F' onChange={handleGenderChange}>
								F
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>

                {isGenderSelected && (
                    <FormControl mb={4}>
					<FormLabel as='legend'>
						Menopause  
					</FormLabel>
					<RadioGroup value={formData.menopause}>
						<HStack spacing='100px'>
							<Radio value='Yes' type="radio" onChange={handleMenopauseChange} >
								Yes
							</Radio>
							<Radio value='No' type="radio"  onChange={handleMenopauseChange} >
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				)}
                

                <FormControl mb={4}>
				<FormControl >
					<FormLabel as='legend'>
						Allergies  
					</FormLabel>
					<RadioGroup value={formData.allergies}>
						<HStack spacing='100px'>
							<Radio value='Yes' onChange={handleAllergiesChange} >
								Yes
							</Radio>
							<Radio value='No'onChange={handleAllergiesChange} >
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isAllergiesSelected && (
				<Textarea onChange={handleAllergiesDescriptionChange} value={formData.allergiesDescription} placeholder='' _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
			</FormControl>
            <FormControl mb={4}>
				<FormLabel>
					Lifestyle
				</FormLabel>
				<Textarea onChange={handleLifestyleChange} placeholder='' value={formData.lifestyle}  _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} ></Textarea>
			</FormControl>
			<FormControl  mb={4}>
				<FormLabel as='legend'>
					Smoke  
				</FormLabel>
				<RadioGroup value={formData.smoke}>
					<HStack mb={3} spacing='100px'>
						<Radio value='Yes'onChange={handleSmokeChange} >
							Yes
						</Radio>
						<Radio value='No'onChange={handleSmokeChange} >
							No
						</Radio>
					</HStack>
				</RadioGroup>
			</FormControl>
			{isSmokeSelected && (
			<FormControl>
				<FormLabel mb={4}>
					How often ?
				</FormLabel>
				
				<Select onChange={handleSmokeDescriptionChange}  placeholder='Select' value={formData.smokeDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option>Occasionnaly</option>
					<option>Current</option>
					<option>Former</option>
				</Select>
				
			</FormControl>
			)}
             <FormControl mb={4}>
				<FormControl >
					<FormLabel as='legend'>
						Alcohol  
					</FormLabel>
					<RadioGroup value={formData.alcohol}>
						<HStack spacing='100px'>
							<Radio value='Yes'onChange={handleAlcoholChange}>
								Yes
							</Radio>
							<Radio value='No'onChange={handleAlcoholChange}>
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isAlcoholSelected && (
				<Textarea onChange={handleAlcoholDescriptionChange} placeholder='' value={formData.alcoholDescription}  _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
			</FormControl>
            {/* <FormControl as='fieldset' mb={4}>
				<FormLabel as='legend'>
					Score_g8_Calc  
				</FormLabel>
				<RadioGroup>
					<HStack mb={3} spacing='100px'>
						<Radio value='Yes'>
							Yes
						</Radio>
						<Radio value='No'>
							No
						</Radio>
					</HStack>
				</RadioGroup>
			</FormControl> */}
            {/* <FormControl mb={4}>
				<FormLabel>
					Anorexia
				</FormLabel>
				<Select placeholder='Select' _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option>Severe</option>
					<option>Moderate</option>
					<option>No</option>
				</Select>
			</FormControl>
            <FormControl mb={4}>
				<FormLabel>
					Weight loss
				</FormLabel>
				<Select placeholder='Select' _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option> More than 3 kg</option>
					<option> Does not know </option>
					<option> 1 to 3 kg</option>
                    <option> No</option>
				</Select>
			</FormControl>
            <FormControl mb={4}>
				<FormLabel>
					Motricity
				</FormLabel>
				<Select placeholder='Select' _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option> Bed to sit</option>
					<option> Autonomous inside </option>
					<option> Autonomous outside</option>
				</Select>
			</FormControl>
            <FormControl mb={4}>
				<FormLabel>
					Neuropsychology
				</FormLabel>
				<Select placeholder='Select' _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option> Dementia or severe depression</option>
					<option> Dementia or ..?? </option>
				</Select>
			</FormControl> */}
			
	
	
	<>
	<Box templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap={10}  >
		
        {isGenderSelected && (
            <FormControl mb={4}>
				<FormLabel>
					Gyn_Obst_History
				</FormLabel>
                <Input onChange={handleGynObsChange} type='number' placeholder='' value={formData.gynObsHistory}  _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
			</FormControl> )}
            {isGenderSelected && (
            <FormControl mb={4}>
				<FormLabel>
					Gestity_Parity
				</FormLabel>
                <Input onChange={handleGestityParityChange} type='number' placeholder='' value={formData.gestityParity}   _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
			</FormControl> )}
            {isGenderSelected && (
            <FormControl mb={4}>
				<FormLabel> 
					Contraception
				</FormLabel>
				<Select onChange={handleContraceptionChange}  placeholder='Select' value={formData.contraception} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option>Pill</option>
					<option>IUD</option>
					<option>IUS</option>
                    <option>Other</option>
				</Select>
			</FormControl> )}
        
            <FormControl mb={4}>
				<FormControl >
					<FormLabel as='legend'>
						Medical History  
					</FormLabel>
					<RadioGroup value={formData.medicalHistory}>
						<HStack spacing='100px'>
							<Radio value='Yes' onChange={handleMedicalChange}>
								Yes
							</Radio>
							<Radio value='No' onChange={handleMedicalChange}>
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isMedicalSelected && (
				<Textarea onChange={handleMedicalDescriptionChange} placeholder='Medical History' value={formData.medicalHistoryDescription}  _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
			</FormControl>
            <FormControl mb={4}>
				<FormControl >
					<FormLabel as='legend'>
						Surgical History
					</FormLabel>
					<RadioGroup value={formData.surgicalHistory}>
						<HStack spacing='100px'>
							<Radio value='Yes'onChange={handleSurgicalChange} >
								Yes
							</Radio>
							<Radio value='No'onChange={handleSurgicalChange} >
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isSurgicalSelected && (
				<Textarea onChange={handleSurgicalDescriptionChange} placeholder='Surgical History' value={formData.surgicalHistoryDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
			</FormControl>
            <FormControl mb={4}>
				<FormControl >
					<FormLabel as='legend'>
						Family history
					</FormLabel>
					<RadioGroup value={formData.familialHistory}>
						<HStack spacing='100px'>
							<Radio value='Yes'onChange={handleFamilialChange}>
								Yes
							</Radio>
							<Radio value='No'onChange={handleFamilialChange}>
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isFamilialSelected && (
				<Textarea onChange={handleFamilialDescriptionChange} placeholder='Surgical History' value={formData.familialHistoryDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
			</FormControl>
		
			
            <FormControl as='fieldset' mb={4}>
				<FormLabel as='legend'>
                    Personal or familial history of cancer
					{/* Personal or family history of cancer  (si ça s'ouvre, les 3 autres s'ouvrent + brca + enlever brca palb mut en gardant juste mut screen avec select de brca palb mut )  */}
				</FormLabel>
				<RadioGroup value={formData.personalFamilialHistoryCancer}>
					<HStack mb={3} spacing='100px'>
						<Radio value='Yes' onChange={handlePersonalFamilialChange}>
							Yes
						</Radio>
						<Radio value='No' onChange={handlePersonalFamilialChange}>
							No
						</Radio>
					</HStack>
				</RadioGroup>
			</FormControl>
        {isPersonalFamilialSelected &&( 
                <FormControl mb={4}>
				<FormControl >
					<FormLabel as='legend'>
						Familial breast cancer history
					</FormLabel>
					<RadioGroup value={formData.familialBreastCancerHistory}>
						<HStack spacing='100px'>
							<Radio value='Yes'onChange={handleFamilialBreastChange}>
								Yes
							</Radio>
							<Radio value='No'onChange={handleFamilialBreastChange}>
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isFamilialBreastSelected && (
				<Textarea onChange={handleFamilialBreastDescriptionChange} placeholder='Surgical History' value={formData.familyBreastCancerHistoryDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
			</FormControl >
            )}
            {isPersonalFamilialSelected &&( 
            <FormControl as='fieldset' mb={4}>
				<FormLabel as='legend'>
					Suspi_lynch  
				</FormLabel>
				<RadioGroup value={formData.suspiLynch}>
					<HStack mb={3} spacing='100px'>
						<Radio value='Yes' onChange={handleSuspiLynchChange}>
							Yes
						</Radio>
						<Radio value='No' onChange={handleSuspiLynchChange}>
							No
						</Radio>
					</HStack>
				</RadioGroup>
			</FormControl> )}
            {isPersonalFamilialSelected &&( 
            <FormControl as='fieldset' mb={4}>
				<FormLabel as='legend'>
					Mut_screen  
				</FormLabel>
				<RadioGroup value={formData.mutScreen}>
					<HStack mb={3} spacing='100px'>
						<Radio value='Yes' onChange={handleMutScreenChange}>
							Yes
						</Radio>
						<Radio value='No' onChange={handleMutScreenChange}>
							No
						</Radio>
					</HStack>
				</RadioGroup>
			</FormControl> )}
        {isPersonalFamilialSelected &&( 
            <FormControl mb={4}>
				<FormLabel>
					brca_1_2_palb_mut
				</FormLabel>
				<Select onChange={handleBrcaPalbMutChange} placeholder='Select' value={formData.brcaPalbMut} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} >
					<option> BRCA1</option>
					<option> BRCA2</option>
                    <option> BRCA1 and BRCA2</option>
                    <option> PALB2</option>
                    <option> Other</option>
                    <option> No</option>
                    {/* si pas no et pas not done : texte libre */}
                    <option> Not done</option>
				</Select>
                <Textarea onChange={handleBrcaPalbMutDescriptionChange} placeholder='' value={formData.brcaPalbMutDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} ></Textarea>
                
			</FormControl>
        )}
            <FormControl mb={4}>
				<FormControl mb={4}>
					<FormLabel as='legend'>
						Comedication
					</FormLabel>
					<RadioGroup value={formData.comedication}>
						<HStack spacing='100px'>
							<Radio value='Yes'onChange={handleComedicationChange}>
								Yes
							</Radio>
							<Radio value='No'onChange={handleComedicationChange}>
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isComedicationSelected && (
				<Textarea onChange={handleComedicationDescriptionChange} placeholder='Comedication' value={formData.comedicationDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
            <FormControl mb={4}>
				<FormControl mb={4}>
					<FormLabel as='legend'>
						More than 3 comedications ? 
					</FormLabel>
					<RadioGroup value={formData.comedicationPlus}>
						<HStack spacing='100px'>
							<Radio value='Yes'onChange={handleComedicationPlusChange}>
								Yes
							</Radio>
							<Radio value='No'onChange={handleComedicationPlusChange}>
								No
							</Radio>
						</HStack>
					</RadioGroup>
				</FormControl>
				{isComedicationPlusSelected && (
				<Textarea onChange={handleComedicationPlusDescriptionChange} placeholder='' value={formData.comedicationPlusDescription} _focus={{ borderColor: "#94aca4", boxShadow: "0 0 0 1px #94aca4", borderWidth: "2px" }} />
				)}
				
			</FormControl>
			</FormControl>
	</Box>
	</>
<Flex mt={5} justifyContent="flex-end">
		<Button mt={5}backgroundColor="#94aca4"color="white" onClick={() => handleSaveData()} _hover={{backgroundColor: "#7a8f86"}}type="submit">
			Save Changes
		</Button>
	</Flex>
    </AccordionPanel>
  </AccordionItem>
  </Accordion> 
);
} 

export default SettingsMedicalHistory;

