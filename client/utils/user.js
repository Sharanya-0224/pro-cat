//const FALLBACK_USER_ID = process.env.NEXT_PUBLIC_DEMO_USER_ID || "69153fc2efd715982a86575c";

export const getActiveUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId") //|| FALLBACK_USER_ID;
  }
  return FALLBACK_USER_ID;
};

export default getActiveUserId;
