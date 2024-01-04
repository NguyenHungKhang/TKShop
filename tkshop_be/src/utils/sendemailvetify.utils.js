import nodemailer from 'nodemailer';
import ApiErrorUtils from './ApiErrorUtils.js';


const SendEmailVertify = async(email, userId, confirmationToken) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'test.tkshop.vn@gmail.com',
            pass: 'iyug rbyk napi tssf',
        },
    });
    const mailOptions = {
        from: 'test.tkshop.vn@gmail.com',
        to: email,
        subject: 'Confirmation Email',
        text: `Click the following link to confirm your registration: http://localhost:3000/confirm/${userId}/${confirmationToken}`,
    }
    try{
        await transporter.sendMail(mailOptions);
        return true;
    }catch(err){
        throw ApiErrorUtils.simple('Đã có lỗi khi gửi mail');
    }
}
export default SendEmailVertify;