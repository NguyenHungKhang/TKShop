import crypto from 'crypto';
import queryString from 'query-string';
import dateFormat from 'dateformat';

const tmnCode = "LO3VA9HL";
const secretKey = "WMZGONVJKLXGWCZMMJJANBCNOHQUBXAT";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

export default {
  createPaymentUrl,
  checkPaymentStatus,
};

async function createPaymentUrl(ipAddress, apiUrl, clientUrl, orderId, orderPayAmount, language = 'vn', bankCode = '') {
  const returnUrl = `${apiUrl}/order/api/v1/payment/vnpay/callback`;

  const tempdate = new Date().toUTCString();
  const date = new Date(tempdate);

  const createDate = dateFormat(date.toString(), 'yyyymmddHHMMss');
  const txnRef = dateFormat(date.toString(), 'HHMMss');

  console.log(date.toString());

  let locale = 'vn';
  if (language && ['vn', 'en'].indexOf(language) >= 0) {
    locale = language;
  }
  const currCode = 'VND';

  let vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = txnRef;
  vnp_Params['vnp_OrderInfo'] = JSON.stringify({ orderId, clientUrl });
  vnp_Params['vnp_OrderType'] = 'topup';
  vnp_Params['vnp_Amount'] = orderPayAmount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddress;
  vnp_Params['vnp_CreateDate'] = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = queryString.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;

  const paymentUrl = vnpUrl + '?' + queryString.stringify(vnp_Params, { encode: false });
  return paymentUrl;
}

async function checkPaymentStatus(vnpayResponse) {
  let vnp_Params = vnpayResponse;
  const secureHash = vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const signData = queryString.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    const amount = vnp_Params['vnp_Amount'];
    const txnRef = vnp_Params['vnp_TxnRef'];
    const { orderId, clientUrl } = JSON.parse(
      Object.keys(queryString.parse(vnp_Params['vnp_OrderInfo']))[0]
    );
    console.log()
    const payDate = vnp_Params['vnp_PayDate']; // yyyyMMddHHmmss
    const bankCode = vnp_Params['vnp_BankCode'];
    const bankTranNo = vnp_Params['vnp_BankTranNo'];
    const cartType = vnp_Params['vnp_CardType'];
    const transactionNo = vnp_Params['vnp_TransactionNo'];

    let isSuccess = false, message = 'Payment failed';

    if (vnp_Params['vnp_TransactionStatus'] === '00') {
      isSuccess = true;
      message = 'Payment success';
    }

    return {
      isSuccess,
      data: {
        amount, txnRef, orderId, clientUrl,
        payDate, bankCode, bankTranNo,
        cartType, transactionNo
      },
      message
    }
  } else {
    return {
      isSuccess: false,
      message: 'Invalid secure hash',
    }
  }
}

function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}