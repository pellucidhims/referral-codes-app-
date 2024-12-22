
export type ReferralContent = {
    id: string;
    company: string;
    code: string;
    link: string;
    logo: string;
  };
  
  export interface Props {
    initialData: ReferralContent[] | null;
  }
  