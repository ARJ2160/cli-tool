#!/usr/bin/env node

// const yargs = require("yargs");
const inquirer = require("inquirer");

// const { argv } = yargs(process.argv);

const printFiveMoves = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) {
    console.log(`Pokemon - ${name} not found`);
    return;
  }
  const pokemon = await res.json();
  const moves = pokemon.moves.map(({ move }) => move.name);
  console.log(">>", moves.slice(0, 5));
};

const showPrompt = inquirer.createPromptModule();
showPrompt({
  type: "input",
  name: "pokemon",
  message: "Enter a pokemon name to view its first 5 moves",
})
  .then((answer) => {
    const pokemon = answer.pokemon;
    printFiveMoves(pokemon);
  })
  .catch((err) => console.log("Error fetching details for this pokemon"));
