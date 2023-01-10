export const adminQuery = {
  checkEmailExistOrNot: () => {
    return "select 1 from public.tbl_admin where email_id=$1";
  },
  getAdminDetails: () => {
    return `SELECT id, full_name, email_id, password
	FROM public.tbl_admin where email_id=$1 ;`;
  },
};
