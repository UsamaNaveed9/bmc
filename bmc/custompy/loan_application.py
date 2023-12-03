

import frappe


@frappe.whitelist()
def make_credit_committee_form(self):
	c_form = frappe.new_doc("Credit Committee Form")
	c_form.loan_application = self.name
	c_form.applicant_name = self.applicant_name
	c_form.types_of_loan = self.loan_kind_
	c_form.number_of_renewals = self.number_of_renewals
	c_form.url = self.url
	c_form.save(ignore_permissions=True)
	
	if c_form.name:
		loan_app = frappe.get_doc("Loan Application", self.name)
		loan_app.credit_committee_form = c_form.name
		loan_app.save(ignore_permission=True)