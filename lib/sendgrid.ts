const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const emailMessageCode = (code) => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aprende a Programar</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
      rel="stylesheet"
    />
  </head>
  <body style="margin:0; font-family: 'Open Sans', sans-serif;">
    <div style="background-color: #E6A7A5; margin: 0; font-size: 16px;">
      <table
        align="center"
        border="0"
        cellpadding="10"
        cellspacing="0"
        width="600"
        style="border-collapse: collapse;background-color: #E6A7A5;"
      >
      
        <tr>
          <td bgcolor="white" style="padding:28px 20px;">
            <img
              src="https://res.cloudinary.com/geo-pet/image/upload/v1666802495/e-commerce/moma.png"
              width="80px"
              alt=""
            />
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding:28px 20px;">  <div style="text-align:center;">
          <h3>Insertá este código para ingresar</h3>
          <p style="font-size:38px; margin:20px;">${code}</p>
        </div></td>
        </tr>
        <tr>
          <td
            bgcolor="#F8F8F8"
            align="center"
            style="padding:28px 10px; font-size:12px;"
          >
            &copy; moma
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
};

export async function sendEmail(to, subject, content) {
  const message = {
    to,
    from: "giuli@apx.school",
    subject,
    html: content,
  };
  sgMail
    .send(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
  return true;
}
export { sgMail };
