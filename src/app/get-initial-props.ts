import { API_END_POINT } from "@/utils/constants";

export default async function getInitialProps() {
  try {
    const response = await fetch(API_END_POINT);
    const data = await response.json();
    return {
      initialData: data.content || null,
    };
  } catch (error) {
    console.error("Something went wrong on server side: ", error);
    return { initialData: null };
  }
}
