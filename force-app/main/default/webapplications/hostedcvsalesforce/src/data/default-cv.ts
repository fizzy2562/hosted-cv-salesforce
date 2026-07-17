import type { CVData, Certification } from "@/types/cv";
import profilePhoto from "@/assets/cv/profile.png";

export const defaultCVData: CVData = {
  personal: {
    firstName: "CIARÁN",
    lastName: "FITZGERALD",
    title: "Experienced Salesforce Consultant",
    email: "Ciaran@haddingtonsolutions.com",
    location: "Forest, Brussels, Belgium.",
    photoUrl: profilePhoto,
  },
  highlights: [
    "Founder of ConsultantCloud.io",
    "Founding Member of Irish Dreamin'",
    "Trailblazer Community Group Leader",
  ],
  executiveSummary: {
    paragraphs: [
      "10 years of Salesforce consulting experience, specialising in integrations with external databases and products, global CPQ delivery, and complex enterprise programmes.",
      "I co lead the Salesforce Admin Group Dublin, one of Ireland's most active Trailblazer communities. I organise monthly sessions, mentor consultants and admins, and connect practitioners with real career opportunities. That community leadership extends through founding ConsultantCloud.io and Irish Dreamin', where I champion practical certification support and peer learning across the ecosystem.",
    ],
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/salesforcewizard/",
      },
      {
        label: "Trailblazer Profile",
        url: "https://www.salesforce.com/trailblazer/consultantcloud-io",
      },
      {
        label: "ConsultantCloud.io",
        url: "https://www.consultantcloud.io",
      },
      {
        label: "Salesforce Admin Group Dublin",
        url: "https://trailblazercommunitygroups.com/salesforce-admin-group-dublin-ireland/",
      },
    ],
  },
  certifications: [
    {
      name: "Salesforce Certified Platform App Builder",
      dateEarned: "Jul 10, 2025",
    },
    {
      name: "Salesforce Certified Service Cloud Consultant",
      dateEarned: "Jan 26, 2024",
    },
    {
      name: "Salesforce Certified Business Analyst",
      dateEarned: "Jan 11, 2024",
    },
    {
      name: "Salesforce Certified AI Associate",
      dateEarned: "Sep 28, 2023",
    },
    {
      name: "Salesforce Certified Sales Cloud Consultant",
      dateEarned: "Jan 21, 2020",
    },
    {
      name: "Salesforce Certified Platform Administrator",
      dateEarned: "Jan 18, 2018",
    },
    {
      name: "Salesforce Certified Marketing Cloud Account Engagement Specialist",
      dateEarned: "Feb 15, 2018",
    },
  ],
  skills: [
    { name: "360° Consulting", level: 5 },
    { name: "Solution Engineering", level: 5 },
    { name: "CPQ design and Build", level: 5 },
    { name: "SOQL & Automation", level: 5 },
    { name: "ETL Tools", level: 4 },
    { name: "Apex and LWC", level: 4 },
  ],
  industryExperience: [
    { label: "Airline Leasing and Aviation", icon: "plane" },
    { label: "Cybersecurity and Government Agencies", icon: "shield" },
    { label: "IT Hardware & Software Suppliers", icon: "chip" },
    { label: "FMCG, Charities and Retail", icon: "store" },
    { label: "Insurance sector", icon: "building" },
    { label: "Automotive and Fleet Services", icon: "car" },
  ],
  workExperience: [
    {
      title: "SALESFORCE CONSULTING (CONTRACTING)",
      company: "Haddington Solutions",
      dateRange: "April 2021 to Present",
      subRoles: [
        {
          heading:
            "Current Contract: Global vehicle glass repair & replacement organisation | Global Product Owner (CPQ) & Lead Salesforce Consultant",
          bullets: [
            "Serving as Global Product Owner for Salesforce CPQ across a multinational network of windshield repair and automotive glass brands operating in 30+ countries.",
            "Leading the Salesforce consulting function: setting CPQ strategy, release governance, and best practice standards across regional operating companies.",
            "Owning the global CPQ product roadmap, prioritising enhancements that standardise quoting and configuration while accommodating market specific requirements.",
            "Partnering with business stakeholders, regional IT teams, and offshore delivery partners to drive CPQ adoption and continuous improvement at scale.",
            "Defining product requirements, acceptance criteria, and release cycles for CPQ changes impacting thousands of users across consumer and fleet channels.",
          ],
        },
        {
          heading: "Previous Contract: Large International Software company | CPQ Admin",
          bullets: [
            "This role allowed me to work with a great team that was responsible for the full Salesforce CPQ build and implementation to date.",
            "We handle internal user issues through Salesforce cases and maintain a strict build and release cycle managed through Jira and Confluence.",
            "The day to day activities could include helping users with technical CPQ issues or unusual use cases.",
            "Using Gearset to release product/business process changes through data and metadata deployments.",
            "Building out PoC's to demonstrate the out of the box automation functionalities in CPQ, ie Price Rules through the use of summary variables.",
            "Updating flows to ensure that new user divisions onboarded within the system will have the same functionality as existing user divisions.",
          ],
        },
        {
          heading:
            "Previous Contract: Large Irish Insurance company | Service Cloud + Experience Cloud Admin",
          bullets: [
            "This role afforded me the opportunity to perform business analysis of complex insurance products and in turn design a client facing portal that sits on the Salesforce Experience Cloud. This includes building out PoC's using all the tools available from Einstein Chat bots to Flow builder for advanced product selections and calculations.",
            "This also combined with my passion for client interaction through supporting the BAU worksteam while also acting as the first level contact for internal and external teams.",
          ],
        },
      ],
    },
    {
      title: "SENIOR SALESFORCE CONSULTANT/INTEGRATION SPECIALIST",
      company: "Bluewave Technology (Platinum Partner)",
      dateRange: "July 2017 to April 2021",
      bullets: [
        "This position afforded me the opportunity to work as an end to end consultant. I act as the single point of contact for our clients or part of team for larger projects.",
        "We solve complex business problems while replicating existing processes to integrate within the Salesforce Eco System.",
        "I personally specialise in using an ETL tool called Talend. This is used to connect external databases such as SQL to Salesforce.",
        "I designed and built out many Salesforce CPQ implementations while using all the automation features of the product, Price Rules, Product Rules, Summary Variables..etc",
        "I have also gained extensive experience in integrating document generation and E-sign solutions. These include Conga Composer, S-docs, Conga Sign & Adobe Sign products.",
      ],
    },
    {
      title: "SALES & OPERATIONS ANALYST",
      company: "Social Talent",
      dateRange: "June 2015 to July 2017",
      bullets: [
        "My role was to be the Salesforce Admin, Analyst and Integration expert for one of the leading tech startups in the E learning space in Dublin.",
        "The fast moving role gave me all the skills necessary to be a great Salesforce professional while also giving me the experience working on larger Implementations of software such as CPQ, OneLogin(SSO), Chargify and Adobe sign.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree, Chemistry",
      institution: "University College Dublin",
      dateRange: "2009 to 2013",
    },
  ],
};

export function normalizeCertifications(certs: unknown): Certification[] {
  if (!certs || !Array.isArray(certs)) return defaultCVData.certifications;
  if (certs.length === 0) return [];

  if (typeof certs[0] === "string") {
    return (certs as string[]).map((name) => ({ name, dateEarned: "" }));
  }

  return certs as Certification[];
}
