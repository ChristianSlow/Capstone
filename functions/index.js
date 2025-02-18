const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mrusekiller@gmail.com",
    pass: "y r j k b f k k x i x q r i e b",
  },
});

// Cloud Function to send an email when a student is accepted
exports.sendAcceptanceEmail = functions.firestore
    .document("StudentInformation/{studentId}")
    .onUpdate(async (change, context) => {
      const beforeData = change.before.data();
      const afterData = change.after.data();

      // Check if status changed to "Accepted"
      if (beforeData.status !== "Accepted" && afterData.status === "Accepted") {
        const studentEmail = afterData.email;
        const studentName = `${afterData.fname} ${afterData.lname}`;

        const mailOptions = {
          from: "mrusekiller@gmail.com",
          to: studentEmail,
          subject: "Congratulations! You Have Been Accepted",
          text: `Dear ${studentName},\n\nCongratulations! 
          You have been accepted.\n\nBest regards,\nYour Institution`,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(
              `Email sent to ${studentEmail} for ${studentName} successfully!`,
          );
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
    });
