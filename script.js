const loxoneAddressInput = document.getElementById('loxoneAddress');
const lightingControllerInput = document.getElementById('lightingController');
const iconUploadInput = document.getElementById('iconUpload');
const tileIconImage = document.getElementById('tileIcon');
const controlButton = document.getElementById('controlButton');
const statusMessage = document.getElementById('statusMessage');

let iconImageURL = null;



controlButton.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.1)';
});

controlButton.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
});


// Upload tile icon
iconUploadInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            iconImageURL = reader.result;
            tileIconImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
});

// Toggle light state
/*controlButton.addEventListener('click', async () => {
    const loxoneAddress = loxoneAddressInput.value;
    const lightingController = lightingControllerInput.value;

    try {
        const response = await fetch(`https://${loxoneAddress}/api/set/${lightingController}/state`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                state: controlButton.textContent === 'Turn On' ? true : false
            })
        });

        const data = await response.json();

        if (data.success) {
            controlButton.textContent = controlButton.textContent === 'Turn On' ? 'Turn Off' : 'Turn On';
            statusMessage.textContent = `Light state successfully updated.`;
        } else {
            statusMessage.textContent = `Error updating light state: ${data.error}`;
        }
    } catch (error) {
        statusMessage.textContent = `Error communicating with Loxone Miniserver: ${error.message}`;
    }
});*/


const loxoneAddress = document.getElementById('loxoneAddress');
const lightingController = document.getElementById('lightingController');



const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

async function toggleLight(state) {
  try {
    const response = await fetch(`https://${loxoneAddress}/api/set/${lightingController}/state`, {
      ...fetchOptions,
      body: JSON.stringify({
        state: state,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        console.log(`Light successfully turned ${state ? 'on' : 'off'}.`);
      } else {
        console.error(`Error turning ${state ? 'on' : 'off'} light: ${data.error}`);
      }
    } else {
      console.error(`HTTP error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error communicating with Loxone Miniserver:', error.message);
  }
}

(async () => {
  await toggleLight(true); // Turn on
  await toggleLight(false); // Turn off
})();
