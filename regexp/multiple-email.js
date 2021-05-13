// Multiple-email testing
// Result is PASS

var single_email_reg_str = "[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@gmail.com"
var multiple_email_reg_str = `${single_email_reg_str}(?:|${single_email_reg_str})*$`
var multiple_emails_str = "yujiahua163@gmail.com|yujahua@gmail.com"
var multiple_email_reg = new RegExp(multiple_email_reg_str)

console.log('Result: Multiple-email matches of',multiple_emails_str, 'is', multiple_email_reg.test(multiple_emails_str))