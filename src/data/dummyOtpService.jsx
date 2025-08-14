// Simulate backend OTP logic

let storedOtp = "654321"; // Hardcoded dummy OTP

export function sendOtp(method, destination) {
  console.log(`Sending OTP to ${method}: ${destination}`);
  // Simulate OTP being sent
  storedOtp = "654321"; // reset dummy OTP
  return Promise.resolve("OTP sent successfully");
}

export function verifyOtp(inputOtp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputOtp === storedOtp) {
        resolve("OTP verified");
      } else {
        reject("Invalid OTP");
      }
    }, 1000); // simulate delay
  });
}
