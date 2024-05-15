import nodemailer from 'nodemailer';
export async function sendEmail(dest,subject,message){
    let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.UserEmail,
        pass: process.env.passwardApp
    }
    });

   
    let info = await transporter.sendMail({
        from:`Herb App <${process.env.UserEmail}$>`, 
        to: dest, 
        subject: subject, 
        html: message, 
    })

    return info
}