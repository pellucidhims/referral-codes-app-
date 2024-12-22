import getInitialProps from "@/app/get-initial-props";
import { ReferralCodeList } from "@/components/ReferralCodeList";

export default async function HomePage() {
  const { initialData } = await getInitialProps();
  return <ReferralCodeList initialData={initialData} />;
}