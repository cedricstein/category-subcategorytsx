import React from "react";
import styled from "styled-components";
// import Sidebar from "./Sidebar";
// import DossierAutocomplete from "./DossierAutocomplete";
import { Autocomplete, MantineProvider, Text, Button } from "@mantine/core";
import { Accordion } from "@mantine/core";
// import { IconPlus } from "@tabler/icons-react";
// import AccordionComponent from "./AccordionComponent";
// import { HouseIcon } from "@tabler/icons-react";
// import InformationGénérale from "./InformationGénérale";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Clipboard } from "feather-icons-react";

const Dossiers = () => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS> 
        <AppWrapper>
          <MainContentWrapper>
            <AutocompleteWrapper>
              {/* <DossierAutocomplete /> */}
              <Button color="lime">Nouveau dossier</Button>
            </AutocompleteWrapper>
            <Link to="/dossiers">
              <Dossier>
                {/* <Clipboard /> */}
                <DossierName>151-260323</DossierName>
                <InspectorName>Antoine Halabi</InspectorName>
                <Address>123 Rue des Pins</Address>
                <Phone>514-603-4901</Phone>
              </Dossier>
            </Link>
          </MainContentWrapper>
        </AppWrapper>
        </MantineProvider>
    </>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Blacktext = styled.h1`
  color: black;
`;

const DossierName = styled.p`
  color: black;
  margin-left: 40px;
`;

const InspectorName = styled.p`
  color: black;
  margin-left: 40px;
`;
const Address = styled.p`
  color: black;
  margin-left: 40px;
`;
const Phone = styled.p`
  color: black;
  margin-left: 40px;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  background-color: #f8f7fa;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: flex-start;
`;

const AutocompleteWrapper = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  color: white;
  font-size: 24px;
  margin-top: 80px;
  margin-left: 40px;
`;

const Dossier = styled.div`
  width: 1250px;
  height: 60px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  color: black;
  font-size: 18px;
  margin-left: 200px;
  margin-top: 80px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export default Dossiers;
