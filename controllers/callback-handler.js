export const callBackHandler = (req, res) => {
  console.log("Callback hit");
  const callbackData = req.body;

  // check the result code
  const result_code = callbackData.Body.stkCallback.ResultCode;

  if (result_code !== 0) {
    const error_message = callbackData.Body.stkCallback.ResultDesc;

    return res.json({
      ResultCode: result_code,
      ResultCode: error_message,
    });
  }

  // at this point the result code is 0(successfull). the transaction was completed.
  const body = callbackData.Body.stkCallback.CallbackMetadata;

  const amountObj = body.Item.find((obj) => obj.Name === "Amount");
  const amount = amountObj.Value;

  const codeObj = body.Item.find((obj) => obj.Name === "MpesaReceiptNumber");
  const mpesaCode = codeObj.Value;

  const phoneNumberObj = body.Item.find((obj) => obj.Name === "PhoneNumber");
  const phone = phoneNumberObj.Value;

  console.log({
    Amount: amount,
    TransactionId: mpesaCode,
    PhoneNumber: phone,
  });

  res.json({ ResultDesc: "Success", ResultCode: 0 });
}