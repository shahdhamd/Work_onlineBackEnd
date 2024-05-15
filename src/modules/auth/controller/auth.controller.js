import { userModel } from "../../../../DB/model/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { sendEmail } from "../../../services/email.js";
import { nanoid } from "nanoid"
export const signup = async (req, res) => {
  try {
    const { password, email, userName } = req.body;

    const user = await userModel.findOne({ email: email })

    if (user) {
      res.json(' تم تسجيل هذا البريد الإلكتروني مسبقًا')
    } else {
      const hash = bcrypt.hashSync(password, parseInt(process.env.saltRound));
      const newuser = await userModel({ userName, email, password: hash })

      let token = jwt.sign({ id: newuser._id, userName, password }, process.env.confirmEmailToken, { expiresIn: '24h' })


      let message = `<!DOCTYPE html>
            <html>
            <head>
            
              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Email Confirmation</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style type="text/css">
              /**
               * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
               */
              @media screen {
                @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                }
                @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                }
              }
              /**
               * Avoid browser level font resizing.
               * 1. Windows Mobile
               * 2. iOS / OSX
               */
              body,
              table,
              td,
              a {
                -ms-text-size-adjust: 100%; /* 1 */
                -webkit-text-size-adjust: 100%; /* 2 */
              }
              /**
               * Remove extra space added to tables and cells in Outlook.
               */
              table,
              td {
                mso-table-rspace: 0pt;
                mso-table-lspace: 0pt;
              }
              /**
               * Better fluid images in Internet Explorer.
               */
              img {
                -ms-interpolation-mode: bicubic;
              }
              /**
               * Remove blue links for iOS devices.
               */
              a[x-apple-data-detectors] {
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                color: inherit !important;
                text-decoration: none !important;
              }
              /**
               * Fix centering issues in Android 4.4.
               */
              div[style*="margin: 16px 0;"] {
                margin: 0 !important;
              }
              body {
                width: 100% !important;
                height: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
              }
              /**
               * Collapse table borders to avoid space between cells.
               */
              table {
                border-collapse: collapse !important;
              }import { decode } from './../../../../node_modules/iconv-lite/lib/index.d';

              a {
                color: #1a82e2;
              }
              img {
                height: auto;
                line-height: 100%;
                text-decoration: none;
                border: 0;
                outline: none;
              }
              </style>
            
            </head>
            <body style="background-color: #e9ecef;">
            
              <!-- start preheader -->
              <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
              </div>
              <!-- end preheader -->
            
              <!-- start body -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
            
                <!-- start logo -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                          <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                            <img src="https://res.cloudinary.com/dql35ano3/image/upload/v1706784409/images-removebg-preview_pnwmqz.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                          </a>
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end logo -->
            
                <!-- start hero -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                        </td>
                      </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end hero -->
            
                <!-- start copy block -->
                <tr>
                  <td align="center" bgcolor="#e9ecef">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                        </td>
                      </tr>
                      <!-- end copy -->
            
                      <!-- start button -->
                      <tr>
                        <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                    <a href="${req.protocol}://${req.headers.host}${process.env.BaseUrl}auth/confirmEmail/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #fff; text-decoration: none; border-radius: 6px;background-color:hsl(94, 59%, 35%)">verify Email</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- end button -->
            
                      
            
                      <!-- start copy -->
                      <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                          <p style="margin: 0;">Herb App</p>
                        </td>
                      </tr>
                      <!-- end copy -->
            
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end copy block -->
            
                <!-- start footer -->
                <tr>
                  <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                    <!--[if (gte mso 9)|(IE)]>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                    <tr>
                    <td align="center" valign="top" width="600">
                    <![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            
                      <!-- start permission -->
                      <tr>
                        <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                          <p style="margin: 0;">You received this email because we received a request for Herb App for your account. </p>
                        </td>
                      </tr>
                    </table>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                  </td>
                </tr>
                <!-- end footer -->
            
              </table>
              <!-- end body -->
            
            </body>
      </html>`

      const inf = await sendEmail(email, 'verify Email', message)
      if (inf.accepted.length) {
        const saveUser = await newuser.save();
        return res.status(200).json({ message: "sucsses", saveUser })
      } else {
        return res.json('فشل انشاء الحساب')
      }
    }
  } catch (error) {
    res.json({ message: `catch error  ${error}` })
  }
}
export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.ConfirmEmailToken)
    if (!decoded) {
      res.json('invalid token')
    } else {
      const user = await userModel.findByIdAndUpdate({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true })
      //res.status(200).redirect(process.env.loginPage)
    }

  } catch (error) {
    res.json(`error catch ${error}`)
  }
}
export const signin = async (req, res) => {
  try {
    const currentDate = new Date(); // Renamed to currentDate
    const { email, password } = req.body;
    const user = await userModel.findOneAndUpdate({ email }, { lastOpenDate: currentDate });
    if (!user) {
      res.json('هذا البريد الإلكتروني غير مسجل')
    } else {
      if (!user.confirmEmail) {
        res.json('يُرجى الانتقال إلى بريدك الإلكتروني لتأكيد الحساب')
      } else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          res.json('يرجى التأكد من صحة كلمة المرور ')
        } else {
          const token = jwt.sign({ id: user._id, email, userName: user.userName, role: user.role, lastOpenDate: user.lastOpenDate }, process.env.TokenSignIn, { expiresIn: 60 * 60 * 24 })
          res.status(200).json({ message: "sucsses", token })
        }
      }
    }
  } catch (error) {
    res.json(`catch error ${error}`)
  }

}

export const forgetPassward = async (req, res) => {
  try {
    const { code, email, newPassword } = req.body;
    if (code == null) {
      return res.json('الرجاء إدخال رمن اعادة التعيين')
    }
    else {
      const hash = bcrypt.hashSync(newPassword, parseInt(process.env.SaltRound));
      const user = await userModel.findOneAndUpdate({ email: email, sendCode: code }, { password: hash, sendCode: null });
      if (!user) {
        return res.json('الرجاء التحقق من صحة الرمز')
      }
      return res.status(200).json({ message: "sucsses", user })
    }
  } catch (error) {

    return res.json({ message: `catch error ${error}` })
  }
}


export const sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email: email });
    if (!findUser) {
      return res.json('الرجاء تسجيل الدخول')
    }

    const code = nanoid();
    const user = await userModel.findOneAndUpdate({ _id: findUser.id }, { sendCode: code })
    if (!user) {
      return res.json('فشل ارسال الرمز')
    }
    let message = `

<!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
          </div>
          <!-- end preheader -->
        
          <!-- start body -->
         <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            
            <tbody><tr>
              <td align="center" bgcolor="#e9ecef">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                  <tbody><tr>
                    <td align="center" valign="top" style="padding:36px 24px">
                      <a href="https://www.blogdesire.com" style="display:inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.blogdesire.com&amp;source=gmail&amp;ust=1706869694547000&amp;usg=AOvVaw1PUE_ByvjK19FHlGs3tTy5">
                        <img src="https://res.cloudinary.com/dql35ano3/image/upload/v1706784409/images-removebg-preview_pnwmqz.png" alt="Logo" border="0" width="48" style="display:block;width:48px;max-width:48px;min-width:48px" class="CToWUd" data-bit="iit">
                      </a>
                    </td>
                  </tr>
                </tbody></table>
                
              </td>
            </tr>
            
        
            
            <tr>
              <td align="center" bgcolor="#e9ecef">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                  <tbody><tr>
                    <td align="left" bgcolor="#ffffff" style="padding:36px 24px 0;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;border-top:3px solid #d4dadf">
                      <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:-1px;line-height:48px">Verify Your Email Address</h1>
                    </td>
                  </tr>
                </tbody></table>
                
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#e9ecef">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
        
                  
                  <tbody><tr>
                    <td align="left" bgcolor="#ffffff" style="padding:24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px">
<p style="margin: 0;">Thank you for using Herb App! Use the following verification code to confirm your email address:</p>
<h2 style="margin: 20px 0; font-size: 28px; font-weight: 700; color:hsl(94, 59%, 35%);">${code}</h2>
                          </td>
                  </tr>
                
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding:24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;border-bottom:3px solid #d4dadf">
                      <p style="margin:0">Herb App</p>
                    </td>
                  </tr>
                  
        
                </tbody></table>
                
              </td>
            </tr>
            
        
            
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding:24px">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                  <tbody><tr>
                    <td align="center" bgcolor="#e9ecef" style="padding:12px 24px;font-family:'Source Sans Pro',Helvetica,Arial,sans-serif;font-size:14px;line-height:20px;color:#666">
                      <p style="margin: 0;">You received this email because we received a request for Herb App for your account. </p>
                    </td>
                  </tr>
                </tbody></table>
                
              </td>
            </tr>
            
        
          </tbody></table>
  </html>

`
    await sendEmail(email, 'forget password', message)
    return res.status(200).json({ message: "sucsses", user })
  } catch (error) {
    return res.json({ message: `catch error  ${error}` })
  }
}

export const openNow = async (req, res) => {
  try {
    // Get the date 5 days ago
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    // Find users whose lastOpenDate is within the last 5 days
    const users = await userModel.find({
      lastOpenDate: { $gte: fiveDaysAgo } // Greater than or equal to five days ago
    });

    res.json(users);
  } catch (error) {
    console.error('Error finding users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export const showAll = async (req, res) => {
  const findAll = await userModel.find({})
  if (!findAll) {
    res.status(400).json({ message: "لا يوجد نتائج" })
  } else {
    res.status(200).json({ message: "النتائج", findAll })
  }
}

export const userInformation = async (req, res) => {
  const { id } = req.params;
  const findAll = await userModel.findById(id).select('userName email _id lastOpenDate');
  if (!findAll) {
    res.status(400).json({ message: "لا يوجد نتائج" })
  } else {
    res.status(200).json(findAll)
  }
}