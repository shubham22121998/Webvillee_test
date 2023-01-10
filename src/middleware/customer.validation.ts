export const customerAddValidation = async (data: any) => {
  let message = "";

  if (!data.full_name.trim()) {
    return (message = "Please Enter Valid Full Name.");
  }
  if (!data.email_id.trim()) {
    return (message = "Please Enter Valid Email Id.");
  }
  if (!data.phone_number) {
    return (message = "Please Enter Valid Phone Number.");
  }
  if (!data.password.trim()) {
    return (message = "Please Enter Valid Password.");
  }
};
