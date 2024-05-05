// Event listener for the button click
document.querySelector('#devis-button').addEventListener('click', () => {
    // Get all relevant input values
    const inputs = document.querySelectorAll('#xp-calc-form input');
    const values = Array.from(inputs, input => parseInt(input.value, 10) || 0);
  
    const resultText = calculateResult(...values); // Compute the result
    document.querySelector("#resultat").innerHTML = resultText; // Display the result
  });
  
  // Calculate the XP required
  const calculateResult = (baseLvl, baseXp, toLvl, toXp) => {
    const costByDecade = [1, 1, 2, 3, 4, 4, 5, 5, 6, 7];
  
    // Check for invalid inputs
    if (baseLvl === 0 || toLvl === 0) {
      return formatError("Veuillez indiquer le niveau de votre pokémon à son arrivée en pension et le niveau souhaité à la fin de l'entrainement.");
    }
  
    const baseDecade = Math.floor(baseLvl / 10);
    const toDecade = Math.floor(toLvl / 10);
  
    // Validate XP against level
    if (baseXp >= costByDecade[baseDecade] || toXp >= costByDecade[toDecade]) {
      return formatError("L'expérience que vous avez indiqué ne correspond pas au niveau que vous avez indiqué pour votre pokémon.");
    }
  
    let total = costByDecade[baseDecade] - baseXp + toXp; // Starting XP
  
    // Loop through levels to calculate XP cost
    for (let lvl = baseLvl + 1; lvl < toLvl; lvl++) {
      const decade = Math.floor(lvl / 10);
      total += costByDecade[decade]; // Add XP for each level
    }
  
    return formatResult(total); // Format the final result
  };
  
  // Format the error message
  const formatError = message => `<p>${message}</p>`;
  
  // Format the result output
  const formatResult = xp => `
    <p><b>Tarif pour les types Eau / Plante / Dragon :</b> ${xp * 20} p$</p>
    <p><b>Tarif pour les autres types :</b> ${xp * 30} p$</p>
    <p><b>Expérience à obtenir :</b> ${xp} points</p>
  `;
  