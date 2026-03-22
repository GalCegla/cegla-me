type CVObject = {
  company: string;
  dates: string;
  title: string;
  companyLink?: string;
  description: string;
}[];

const CV: CVObject = [
  {
    company: "Ludwig Maximilians University Munich",
    dates: "OCTOBER 2024 - ONGOING, MUNICH",
    title: "Bachelor's",
    companyLink: "https://www.lmu.de/en/",
    description:
      "With Computer-Linguistics as a major subject and Artificial Intelligence as a minor, I'm currently studying for my bachelor's degree at the LMU in Munich. The program is oriented around the intertwining of human languages and computers, focusing on linguistics and programming.",
  },
  {
    company: "FlyCode",
    dates: "FEBRUARY 2022 - APRIL 2023, TEL AVIV",
    title: "Fullstack Developer",
    companyLink: "https://www.flycode.com/",
    description:
      "FlyCode is a YCombinator graduate, focused on minimizing revenue loss for subscription-based platforms.\n During my time at FlyCode I had several responsibilities, beyond my daily programming duties for the application; I was responsible for the product's documentation, helped with the grammar-proofing of our User Interface, took part in the sales and marketing efforts, and contributed to some business aspects of the company.",
  },
  {
    company: "ITC",
    dates: "OCTOBER 2021 - FEBRUARY 2022, TEL AVIV",
    title: "Fullstack Tech Teacher",
    description:
      "ITC was a highly acclaimed software development school in Tel Aviv, teaching people to become programmers. The school provided an intensive 3 month course including a one-month practical internship in software development. Working at ITC gave me the opportunity to guide students through the practices of the developers' world, help them with the learned materials, and put their knowledge into practice. Another part of my work was lecturing on different topics, with a focus on teaching ReactJS.",
  },
  {
    company: "withElement",
    dates: "JANUARY 2021 - JULY 2021, TEL AVIV",
    title: "Junior Software Developer",
    description:
      "withElement was a YCombinator-graduate startup with the goal of helping known finance personas (e.g. 'influencers') reach and interact with their audience in an in-person environment. While working at withElement I was part of a very small development team, carrying out tasks relating to all parts of the codebase, both the front and back ends.",
  },
  {
    company: "Amplication",
    dates: "AUGUST 2020 - JANUARY 2021, TEL AVIV",
    title: "Junior Software Developer",
    companyLink: "https://amplication.com/",
    description:
      "Amplication is a no-code API creation service. It enables any user without a technological background to create and update API infrastructures. In this role, I was supporting the code maintenance work by writing tests for the code, while doing some other more general coding tasks as well. In addition, I was involved with marketing tasks such as writing articles regarding the different usages of the product.",
  },
  {
    company: "Israeli Air Force",
    dates: "AUGUST 2017 - APRIL 2020",
    title: "Education R&D Unit",
    description:
      "Service in a technological unit dedicated to the development of new methods of education and instructional courseware for a variety of roles. Some products developed by the unit include educational programs, instructional videos, and virtual reality environments, using the most advanced tools & technologies.",
  },
];

export default CV;
