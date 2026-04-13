/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
* Name: Grace Gabrielle    Student ID: 114693245    Date: April 12, 2026
*
* Vercel App (Deployed) Link: https://web422-a3-user-api-henna.vercel.app
*
********************************************************************************/
import SearchForm from "@/components/SearchForm";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  return (
    <>
      <PageHeader
        text="Search"
        subtext="Find books using the Open Library search API"
      />
      <SearchForm />
    </>
  );
}