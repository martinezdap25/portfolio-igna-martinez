export interface Dictionary {
  nav: {
    inicio: string;
    projects: string;
    contact: string;
  };
  footer: {
    talk: string;
    work: string;
    work_desc: string;
    questions: string;
    questions_desc: string;
    email_placeholder: string;
    send: string;
    thanks: string;
    invalid_email: string;
    rights: string;
  };
  intro: {
    welcome: string;
    roles: string[];
    button: string;
  };
  about: {
    title: string;
    description: string;
    cv: string;
    certificate: string;
    certificateTitle: string;
    tags: string[];
  };
  projects: {
    seeMoreDetails: string;
    features: string;
    challenges: string;
    learnings: string;
    visit: string;
    filters: string;
    filterOptions: {
      category: string;
      technology: string;
      status: string;
      featured: string;
      all: string;
      yes: string;
      no: string;
    };
    technologies: string;
    role: string;
    duration: string;
    visitPage: string;
    visitGithub: string;
  };
}