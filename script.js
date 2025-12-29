
//--------LÅT STÅ----------- 
  // Definiera fasta "konstanter" för olika typer av animering av menyn
  ANIMATION = { 
    NONE: 'none',           // Ingen animation
    TIMER: 'timer',         // setInterval-baserad animation
    ALTERNATIVE: 'alternative' // ytterligare alternativ
  };

// Ändra värdet för att styra vilken meny-animation som ska användas
window.MENU_ANIMATION_MODE ??= ANIMATION.NONE; // ANIMATION.TIMER (Default) = ingen animation (G-nivå), ANIMATION.TIMER // (VG-nivå), ANIMATION.ALTERNATIVE // ytterligare ett alternativ (VG-nivå);

/*
 Användningsexempel för animationer beroende på inställning
*/
if (window.MENU_ANIMATION_MODE === ANIMATION.NONE) {
  console.log("Ingen meny-animation används");
} else if (window.MENU_ANIMATION_MODE === ANIMATION.TIMER) {
  console.log("Meny-animation med timer används");
} else if (window.MENU_ANIMATION_MODE === ANIMATION.ALTERNATIVE) {
  console.log("Meny-animation med alternativ metod används");
}

//--------------------------

// Funktion för att öppna/stänga menyn och ändra ikon
function toggleMenu() {
  const menu = document.querySelector('.menu');        // Hämta meny-elementet
  const icon = document.querySelector('.menu-icon i');  // Hämta själva ikon-elementet (hamburger-ikonen)
  menu.classList.toggle('menu--show');                 // Växla mellan att visa/dölja menyn

  // Om menyn är öppen – byt ikon till kryss
  if (menu.classList.contains('menu--show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  }
  // Om menyn är stängd – byt tillbaka till hamburgermenyn
  else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}


// Funktion för att ladda och visa en kanal
async function setChannel(channelName) {
  const title = document.getElementById('js-title');           // Hämta H1 där kanalens namn ska stå
  const scheduleContainer = document.getElementById('js-schedule'); // Behållare för programlistan
  const loading = document.getElementById('js-loading');       // Hämta loading-gif

  title.textContent = channelName;    // Visa kanalens namn som rubrik
  scheduleContainer.innerHTML = "";   // Töm eventuell gammal data
  loading.classList.remove('hidden'); // Visa loading-bilden medan datan hämtas

  try {
    // Skapa filvägen till JSON-filen (t.ex. data/SVT 1.json)
    const fileName = `data/${channelName}.json`;

    // Hämta datan från JSON-filen
    const response = await fetch(fileName);
    const data = await response.json();

    // Sortera programmen efter starttid
    data.sort((a, b) => new Date(a.start) - new Date(b.start));

    // Skapa en lista (ul) för att lägga till programmen
    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush"; // Bootstrap-klass för snygg lista

    // Loopa igenom alla program i datan
    data.forEach(program => {
      const time = new Date(program.start); // Skapa datumobjekt för starttiden
      const hours = time.getHours().toString().padStart(2, '0');   // Hämta timmar och fyll ut med nolla
      const minutes = time.getMinutes().toString().padStart(2, '0'); // Hämta minuter och fyll ut med nolla

      // Skapa ett listobjekt (li) för varje program
      const li = document.createElement("li");
      li.className = "list-group-item"; // Bootstrap-stil
      li.innerHTML = `
        <strong>${hours}:${minutes}</strong>   <!-- Visar tiden -->
        <div>${program.name}</div>             <!-- Visar programmets namn -->
        <small>${program.description}</small>  <!-- Visar kort beskrivning -->
      `;
      ul.appendChild(li); // Lägg till listobjektet i listan
    });

    // Lägg till den färdiga listan i sidan
    scheduleContainer.appendChild(ul);

  } catch (error) {
  
    console.error(error);
    scheduleContainer.innerHTML = `<p>Kunde inte läsa in TV-tablå för ${channelName} 😕</p>`;
  } finally {
    // Göm loading-bilden när laddningen är klar 
    loading.classList.add('hidden');
  }
}



    

