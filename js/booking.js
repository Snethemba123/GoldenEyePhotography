// js/booking.js

// Your Firebase configuration (copy directly from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAV0mqRrWzBDnlIJzAZ4iLMbwaUuGOKnYE",
    authDomain: "photography-project-2dcc0.firebaseapp.com",
    projectId: "photography-project-2dcc0",
    storageBucket: "photography-project-2dcc0.firebasestorage.app",
    messagingSenderId: "1050181806375",
    appId: "1:1050181806375:web:f9b13161c04f5699c3a102"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = app.firestore();

console.log("Firebase initialized and Firestore DB reference obtained!");
console.log("booking.js loaded.");

const calendar = flatpickr("#eventDate", {
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: [],
    // You can add an onValueUpdate or similar if you need to react
    // when the calendar itself is updated by fetchBookedDates
});

// Function to fetch booked dates from Firebase
async function fetchBookedDates() {
    try {
        const bookedDatesSnapshot = await db.collection('booked_dates').get();
        const bookedDates = bookedDatesSnapshot.docs.map(doc => doc.id); // Use document ID as the date
        calendar.set('disable', bookedDates); // Disable these dates in the calendar
    } catch (error) {
        console.error("Error fetching booked dates:", error);
        displayMessage("Error fetching availability. Please try again.", true); // isError = true
    }
}

// Function to check if a date is fully booked (big event) or has two small events
async function isDateFullyBooked(date) {
    try {
        const bookingsForDateSnapshot = await db.collection('booking_requests')
            .where('eventDate', '==', date)
            .get();

        let bigEventCount = 0;
        let smallEventCount = 0;

        bookingsForDateSnapshot.forEach(doc => {
            const booking = doc.data();
            if (booking.eventType === 'wedding' || booking.eventType === 'umemulo') {
                bigEventCount++;
            } else {
                smallEventCount++;
            }
        });

        if (bigEventCount > 0) {
            return true;
        }

        if (smallEventCount >= 2) {
            return true;
        }

        return false;

    } catch (error) {
        console.error("Error checking date availability:", error);
        return true; // Return true on error to prevent double-booking if something fails
    }
}

// Fetch initial booked dates when the page loads
fetchBookedDates();

// Get references to new HTML elements
const videographyRadios = document.querySelectorAll('input[name="videography"]');
const videographySpecifyGroup = document.getElementById('videographySpecifyGroup');
const videographySpecifyInput = document.getElementById('videographySpecify'); // Get the textarea element

// Add event listeners for videography radio buttons to show/hide the specify field
videographyRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Yes') {
            videographySpecifyGroup.style.display = 'block';
            videographySpecifyInput.setAttribute('required', 'required'); // Make it required if 'Yes'
        } else {
            videographySpecifyGroup.style.display = 'none';
            videographySpecifyInput.removeAttribute('required'); // Remove required if not 'Yes'
            videographySpecifyInput.value = ''; // Clear its value when hidden
        }
    });
});

// Booking Form Submission
const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');
const acceptTermsCheckbox = document.getElementById('acceptTerms'); // Get terms checkbox

console.log("Attempting to attach event listener to bookingForm:", bookingForm);
// --- EmailJS Setup ---
const serviceId = 'service_xcs6qe7';
const templateId = 'template_ncu5dbr';
const publicKey = 'YNZmyhuJBpqUD14kk';
(function() {
    emailjs.init(publicKey);
})();

bookingForm.addEventListener('submit', async (e) => {
    console.log("Form submit event detected!");
    e.preventDefault(); // Prevent the default form submission behavior

    console.log("Form submission initiated.");

    // Retrieve values from all form fields, including the new ones
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const clientEmail = document.getElementById('clientEmail').value;
    const clientPhone = document.getElementById('clientPhone').value;
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const documentationDescription = document.getElementById('documentationDescription').value;
    const venue = document.getElementById('venue').value;
    const additionalInfo = document.getElementById('additionalInfo').value;

    // Get selected videography option
    let videography = '';
    videographyRadios.forEach(radio => {
        if (radio.checked) {
            videography = radio.value;
        }
    });
    const videographySpecify = videography === 'Yes' ? videographySpecifyInput.value : '';

    // Check if terms are accepted
    if (!acceptTermsCheckbox.checked) {
        displayMessage("Please accept the Terms and Conditions to proceed.", true);
        console.log("Terms not accepted. Exiting.");
        return;
    }

    if (!eventDate) {
        displayMessage("Please select a date from the calendar.", true);
        console.log("No event date selected. Exiting.");
        return;
    }

    console.log("Checking date availability for:", eventDate);
    if (await isDateFullyBooked(eventDate)) {
        displayMessage("Sorry, that date is fully booked. Please choose another.", true);
        console.log("Date found to be fully booked. Exiting.");
        return;
    }
    console.log("Date is available. Attempting to add booking to Firestore and send email.");

    try {
        // Step 1: Send the EmailJS email
        const templateParams = {
            firstName: firstName,
            lastName: lastName,
            clientEmail: clientEmail,
            clientPhone: clientPhone,
            eventType: eventType,
            eventDate: eventDate,
            startTime: startTime,
            endTime: endTime,
            venue: venue,
            documentationDescription: documentationDescription,
            videography: videography,
            videographySpecify: videographySpecify,
            additionalInfo: additionalInfo,
        };

        await emailjs.send(serviceId, templateId, templateParams);
        
        // Step 2: Submit to Firestore
        await db.collection('booking_requests').add({
            firstName,
            lastName,
            clientEmail,
            clientPhone,
            eventType,
            videography,
            videographySpecify,
            documentationDescription,
            venue,
            eventDate,
            startTime,
            endTime,
            additionalInfo,
            acceptedTerms: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        console.log("Booking successfully added to Firestore and email sent!");
        displayMessage("Booking request submitted successfully! An email confirmation has been sent.", false);
        
        // Reset the form after successful submission
        bookingForm.reset();
        videographySpecifyGroup.style.display = 'none';
        document.getElementById('videoNo').checked = true;
        acceptTermsCheckbox.checked = false;
        fetchBookedDates();
    } catch (error) {
        console.error("Error submitting booking or sending email:", error);
        displayMessage("There was an error submitting your request. Please try again.", true);
    }
});

// Function to display messages to the user
function displayMessage(message, isError) {
    bookingMessage.textContent = message;
    bookingMessage.className = isError ? 'error-message' : 'success-message';
}
