import CreateLawFirmForm from "./create-law-firm";
import ListLawFirms from "./list-law-firms";

const apiUrl = "https://lawfirmapi-gdage3hffjgugkeh.uksouth-01.azurewebsites.net";

function Homepage() {
  return (
    <>
      <header className="topbar">
        <div className="wrap">
          <span className="brand">Law Firms</span>
          <a href="https://github.com/wizzard262/LawFirms">Code</a>
          <a href={`${apiUrl}/openapi/v1.json`}>Open API</a>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">React 19 &middot; Material UI &middot; TanStack Query &middot; C# .NET API</p>
          <h1>Law Firms</h1>
          <p className="lead">
            A full-stack assessment: a React front end that pages, sorts and adds law firms
            through a C# Web API, both hosted on Azure.
          </p>
        </div>
      </section>

      <main className="wrap grid">
        <ListLawFirms />
        <CreateLawFirmForm />

        <section className="card" aria-labelledby="about-title">
          <h2 id="about-title">About this build</h2>
          <ul>
            <li>One Git repository on GitHub with the UI and the API.</li>
            <li>React 19 front end with Material UI, on an Azure Static Web App, built and deployed by GitHub Actions.</li>
            <li>
              C# API on Azure App Service (<code>LawFirmAPI</code>); GitHub Actions builds it, runs the unit tests and deploys it.
              API: <a href={`${apiUrl}/LawFirms`}>/LawFirms</a>, description: <a href={`${apiUrl}/openapi/v1.json`}>openapi/v1.json</a>.
            </li>
            <li>The API keeps law firms in an in-memory store, so new firms disappear when it restarts.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          Law Firms by Steve Jones &middot; <a href="https://github.com/wizzard262/LawFirms">Code on GitHub</a> &middot;{" "}
          <a href="https://www.harriercarrier.com/portfolio.html">Portfolio</a>
        </div>
      </footer>
    </>
  );
}

export default Homepage;
