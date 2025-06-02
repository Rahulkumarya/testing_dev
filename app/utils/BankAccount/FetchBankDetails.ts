// utils/BankAccount/fetchBankDetails.ts
export const fetchBankDetails = async (ifsc: string) => {
  try {
    const res = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
    if (!res.ok) throw new Error("Invalid IFSC");
    return await res.json();
  } catch (error) {
    return null;
  }
};
