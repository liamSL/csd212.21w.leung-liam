console.log("Hello, World!");

"use strict"

import initPrompt from 'prompt-sync';
const prompt = initPrompt();

import existsSync from "fs";

import {readFileSync, writeFileSync} from "fs";

import {homedir, EOL} from "os";
import { exception } from 'console';

function all_true(a, b){
    return a && b;
}

function is_numeric(c){
    return "0" <= c && c <= "9";
}

function is_string_numeric(s){
    s = Array.from(s);
    let map = s.map(n => is_numeric(s));
    return map.reduce((a,b) => all_true);
}

function make_code(length){
    let code = "";
    for (const _ of Array(length).keys()){
        code += String(Math.floor(Math.random(0, 9)*10));}
}

function get_guess(code_length){
    let guess = prompt("Guess the code: ");

    if (guess.length != code_length){
        console.log("You must enter ${code_length} numbers");}

    if (!is_string_numeric(guess)){
        console.log("The code may contain only numbers");
        return get_guess(code_length);}
}

function count_matches(code, guess){
    code_numbers = Array.from(code);
    guess_numbers = Array.from(guess);

    let num_matches = 0;
    let num_semi_matches = 0;

    for(const i of Array(code_numbers.length).keys()){
        if (code_numbers[i] == guess_numbers[i]){
            code_numbers[i] = "-";
            guess_numbers[i] = "-";
            num_matches += 1;}
    }

    for(g in guess_numbers){
        if (g === "-"){
            continue;}
    }

    for(const i of Array(code_numbers.length).keys()){
        let c = code_numbers[i];

        if (c === "-"){
            continue;
        }
        
        if (g === c){
            code_numbers[i] = "-";
            num_semi_matches += 1;
            break;
        }
    return {exactMatches: num_matches, semiMatches: num_semi_matches};
    }
}

function get_code_length(){
    let response = prompt("How long do you want the code to be? ");

    if (!(is_string_numeric(response))){
        console.log("You must enter a number");
        return get_code_length();}

    let n = Number(response);

    if (n < 2){
        console.log("You must choose a number greater than 1");
        return get_code_length();}

    return n;
}

function play_round(){
    let code_length = get_code_length();

    let history = load_history();
    if (code_length in history){
        let [num_games, best, average] = history[code_length];
        console.log(`The number of times you have tried codes of length ${code_length} is ${num_games}. Your average and best number of guesses are ${average} and ${best} respectively.`);
    }
    else{
        console.log(`This is your first time trying a code of length ${code_length}`);
    }
    let code = Make_code(code_length);
    let num_guesses = 0;

    while(true){
        num_guesses += 1;
        guess = get_guess(code_length);

        if (guess === code){
            console.log(`You cracked the code! Number of guesses: ${num_guesses}`);
            update_history(history, code_length, num_guesses);
            return;
        }
        else{
            [num_matches, num_semi_matches] = count_matches(code, guess);
            console.log("★"*num_matches + "☆"*num_semi_matches + "-"*(code_length-num_matches-num_semi_matches));
        }
    }
}

function get_history_path(){
    return path.join(os.homedir(), "CODEBREAKER.history");
}

function write_history(history){
    history_path = get_history_path;
    if (fs.existsSync(history_path)){
        try{
            let hist = `${code_length}:${data[0]}:${data[1]}:${data[2]}` + os.EOL;
            for ({code_length, data} in history){
                fs.writeFileSync(history_path, hist);
            }
        }
        catch{
            console.log("Uh oh, the history file couldn't be updated");
        }
    }
}

function update_history(history, code_length, num_guesses){
    if (code_length in history){
        (num_games, best, average) = history[code_length];

        if (num_guesses < best){
            console.log(`${num_guesses} is a new best score for codes of length ${code_length}!`);
            best = num_guesses;
        }
        else if(num_guesses < average) {
            console.log(`${num_guesses} is better than your average score of ${average} for codes of length ${code_length}!`);
        }
        let average = ((average*num_games) + num_games)/(num_games + 1);
        num_games += 1;
        history[code_length] = (num_games, best, average);
    }
        else {
            history[code_length] = (1, num_guesses, num_guesses);
        }
        write_history(history);
    
}

function load_history(){
    history_path = get_history_path();

    history = {};

    if (fs.existsSync(history_path)){
        try{
        const content = fs.readFileSync(history_path).toString().split("\n");
        for (const line in content){
            (code_length, num_games, best, average) = line.split(":");
            history[Number(code_length)] = (Number(num_games), Number(best), +(average));
        }
    }
        catch{
            console.log("Uh oh, your history file could not be read");
        }
    }
    else {
        try {
            fs.writeFileSync(history_path, "");
        }
        catch {
            console.log("Uh oh, I couldn't creat a history file for you");
        }
    }
    return history
}

function print_instructions(){
    console.log("You select a code length.  The computer will pick a random numeric code of that length.  You then try to guess the code.  On every guess, the computer will tell you how many numbers in your guess are both the correct number and in the correct position (★) and how many are the correct number but not in the correct position (☆).  Using this information, you should eventually be able to deduce the correct code!")
}

function get_main_menu_selection(){
    console.log();
    console.log("What do you want to do");
    console.log("(i) Show Instructions");
    console.log("(p) Play a game");
    console.log("(q) Quit");

    switch(prompt("")){
        case 'i':
            print_instructions();
            break;

        case 'p':
            play_round();
            break;

        case 'q':
            console.log("Ok bye!")
            return

        default:
            console.log("I don't understand...")
    }
}

function init() {
    console.log("CODE⚡BREAKER")
    get_main_menu_selection();
}
init()