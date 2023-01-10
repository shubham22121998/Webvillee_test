let customerQuery = {
  checkEmailExistNot: () => {
    return `select 1 from public.tbl_customer where email_id=$1`;
  },
  insertCustomer: () => {
    return `INSERT INTO public.tbl_customer(
	 full_name, email_id, profile_picture, hash_password, account_status, createdon_date, phone_number, created_by)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING id;`;
  },
  updateToken: () => {
    return `update public.tbl_customer set token = $1 where id=$2;`;
  },
  updateCustomer: () => {
    return `UPDATE public.tbl_customer
	SET  full_name=$1, phone_number=$2,  profile_picture=$3, updatedon_date=$4,updated_by=$5
	WHERE id=$6;`;
  },
  getCustomer: () => {
    return `SELECT id, full_name, email_id, profile_picture, account_status, createdon_date, updatedon_date, token, phone_number, updated_by, created_by
	FROM public.tbl_customer 
   where (id=$1 or $1=0);`;
  },
  getCustomerDetailsLogin: () => {
    return `SELECT id, full_name, email_id, profile_picture,hash_password, account_status, createdon_date, updatedon_date, token, phone_number, updated_by, created_by
	FROM public.tbl_customer 
   where email_id=$1 and account_status=true;`;
  },
  deleteAccount: () => {
    return `DELETE FROM public.tbl_customer
	WHERE id=$1;`;
  },
  activateDeactivateCustomerAccount: () => {
    return ` UPDATE public.tbl_customer
	SET  account_status=$1,  updatedon_date=$2 WHERE id=$3;`;
  },
};

export default customerQuery;
