frappe.ui.form.on('Loan Application', {
    refresh(frm){
        if (frm.doc.docstatus == 1) {
            frm.add_custom_button("Make Credit Committee Form", function () {
                make_credit_committee_form(frm);
            }).addClass("btn-primary");
        }
    }
});

let make_credit_committee_form = function (frm) {
	var doc = frm.doc;
	if (!doc.credit_committee_form) {
		return frappe.call({
			method: "bmc.custompy.loan_application.make_credit_committee_form",
            doc: cur_frm.doc,
			callback: function () {
				frappe.set_route(
					'List', 'Credit Committee Form', {
						"Credit Committee Form.loan_application": frm.doc.name
					}
				);
			},
			freeze: true,
			freeze_message: __("Creating Credit Committee Form............")
		});
	}
};