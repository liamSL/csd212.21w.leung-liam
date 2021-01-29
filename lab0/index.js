console.log("Hello, World!");

"use strict"

import initPrompt from 'prompt-sync';
const prompt = initPrompt();

import path from 'path';

import {readFileSync, writeFileSync, existsSync, openSync} from "fs";

import * as os from "os";
import { pathToFileURL } from 'url';

function all_true(a, b){
    return a && b;
}

function is_numeric(c){
    return "0" <= c && c <= "9";
}

function is_string_numeric(s){
    s = Array.from(s);
    let map = s.map(is_numeric);
    return map.reduce(all_true);
}

function make_code(length){
    let code = "";
    for (const _ of Array(length).keys()){
        code += Math.floor(Math.random()*10);}
    return code;
}

function get_guess(code_length){
    let guess = prompt("Guess the code: ");

    if (guess.length != code_length){
        console.log(`You must enter ${code_length} numbers`);
        get_guess(code_length);}

    if (!(is_string_numeric(guess))){
        console.log("The code may contain only numbers");
        return get_guess(code_length);}
    return guess;
}

function count_matches(code, guess){
    let code_numbers = Array.from(code);
    let guess_numbers = Array.from(guess);

    let num_matches = 0;
    let num_semi_matches = 0;

    for(const i of Array(code_numbers.length).keys()){
        if (code_numbers[i] === guess_numbers[i]){
            code_numbers[i] = "-";
            guess_numbers[i] = "-";
            num_matches += 1;
        }
    }

    for(const g of guess_numbers){
        if (g === "-"){
            continue;}

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
        }
    }
    return [num_matches, num_semi_matches];
}

function get_code_length(){
    let response = prompt("How long do you want the code to be? ");

    if (!(is_string_numeric(response))){
        console.log("You must enter a number");
        return get_code_length();}

    let code_length = Number(response);

    if (code_length < 2){
        console.log("You must choose a number greater than 1 ");
        return get_code_length();}

    return code_length;
}

function play_round(){
    let code_length = get_code_length();

    let history = load_history();
    if (history.has(code_length)){
        console.log(history.get(code_length));
        let {num_games, best, average} = history.get(code_length);
        console.log(`The number of times you have tried codes of length ${code_length} is ${num_games}. Your average and best number of guesses are ${average} and ${best} respectively.`);
    }
    else{
        console.log(`This is your first time trying a code of length ${code_length}`);
    }
    let code = make_code(code_length);
    let num_guesses = 0;

    while(true){
        num_guesses += 1;
        let guess = get_guess(code_length);
        switch(guess){
        
        case code:
            console.log(`You cracked the code! Number of guesses: ${num_guesses}`);
            update_history(history, code_length, num_guesses);

            return;
        
        default:
            let [num_matches, num_semi_matches] = count_matches(code, guess);
            console.log("★".repeat(num_matches) + "☆".repeat(num_semi_matches) + "-".repeat(code_length-num_matches-num_semi_matches));
        }
    }
}

function get_history_path(){
    let history_path = path.join(os.homedir(), "CodeBreaker.txt");
    return history_path;
}

function write_history(history){
    let history_path = get_history_path();
    if (existsSync(history_path)){
        try{
            let hist = "";
            for (const [key, value] of history) {
                let {num_games, best, average} = history.get(key);
                hist += String(key) + ":" + String(num_games) + ":" + String(best) + ":" + String(average) + os.EOL;
                writeFileSync(history_path, hist);
            }
        }
        catch{
            console.log("Uh oh, the history file couldn't be updated");
        }
    }
}

function update_history(history, code_length, num_guesses){
    if (history.has(code_length)){
        let {num_games, best, average} = history.get(code_length);

        if (num_guesses < best){
            console.log(`${num_guesses} is a new best score for codes of length ${code_length}!`);
            best = num_guesses;
        }
        else if(num_guesses < average) {
            console.log(`${num_guesses} is better than your average score of ${average} for codes of length ${code_length}!`);
        }
        average = ((average*num_games) + num_games)/(num_games + 1);
        num_games += 1;
        history.set(code_length, {num_games: num_games, best: best, average: average});
    }
    else {
        history.set(code_length, {num_games: 1, best: num_guesses, average: num_guesses});
    }
    write_history(history);
    
}

function load_history(){
    let history_path = get_history_path();

    let history = new Map();

    if (existsSync(history_path)){
        try{
        let content = readFileSync(history_path).toString().trim().split(os.EOL);
        for (let line of content){
            let [code_length, num_games, best, average] = line.split(":");
            let dict = {"num_games": +(num_games), "best": +(best), "average": +(average)};
            history.set(+(code_length), dict);
        }
        console.log(history);
    }
        catch{
            console.log("Uh oh, your history file could not be read");
        }
    }
    else {
        try {
            writeFileSync(history_path, "");
        }
        catch {
            console.log("Uh oh, I couldn't create a history file for you");
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
    get_main_menu_selection();
}

function init() {
    console.log("CODE⚡BREAKER")
    get_main_menu_selection();
}
init()