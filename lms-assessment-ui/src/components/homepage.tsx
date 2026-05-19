import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CreateLawFirmForm from "./create-law-firm";
import ListLawFirms from "./list-law-firms";

function Homepage() {
  return (
    <Container>
      <header>
        <h1>LMS.Assessment</h1>
        <ul>
          <li>Git mono-repository stored on github: <a href="https://github.com/wizzard262/LawFirms">https://github.com/wizzard262/LawFirms</a></li>
          <li>React 19.2.4 front-end with Mui</li>
          <li>Front-end hosted on Azure at: <a href="https://brave-stone-0a50ebd1e.7.azurestaticapps.net/">https://brave-stone-0a50ebd1e.7.azurestaticapps.net/</a></li>
          <li>C# API (build, run unit tests, deploy from ?????)</li>
          <li>API Hosted on Azure: <a href="https://lawfirmapi-gdage3hffjgugkeh.uksouth-01.azurewebsites.net/LawFirms">https://lawfirmapi-gdage3hffjgugkeh.uksouth-01.azurewebsites.net/LawFirms</a></li>
          <li>Open API: <a href="https://reprecorderapi-dfg9f8b8babha5ey.ukwest-01.azurewebsites.net/openapi/v1.json">https://reprecorderapi-dfg9f8b8babha5ey.ukwest-01.azurewebsites.net/openapi/v1.json</a></li>
          <li>Local Development fake "in memory" repo</li>
        </ul>
      </header>
      <Stack component="main" spacing={4}>
        <ListLawFirms />
        <CreateLawFirmForm />
      </Stack>
    </Container>
  );
}

export default Homepage;
