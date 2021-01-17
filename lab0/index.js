console.log("Hello, World!");

"use strict";

import initPrompt from 'prompt-sync'
const prompt = initPrompt();

function all_true(a, b){
    return a && b;
}

function is_numeric(c){
    return "0" <= c && c <= "9";
}

function is_string_numeric(s){
    return reduce(all_true, map(is_numeric, s));
}

function make_code(length){
    let code = "";
    for (_ in Range(length)){
        code += String(Math.floor(Math.random(0, 9)*10));}
}

function get_guess(code_length){
    let guess = prompt("Guess the code: ");

    if (String.length(guess) != code_length){
        console.log(String.format("You must enter %s numbers",code_length));}

    if (!is_string_numeric(guess)){
        console.log("The code may contain only numbers");
        return get_guess(code_length);}
}

function count_matches(code, guess){
    code_numbers = Array(code);
    guess_numbers = Array(guess);

    num_matches = 0;
    num_semi_matches = 0;

    for(i in Range(length(code_numbers))){
        if (code_numbers[i] == guess_numbers[i]){
             code_numbers[i] = "-";
             guess_numbers[i] = "-";
             num_matches += 1;}
    }

    for(g in guess_numbers){
        if (g == "-"){
            continue;}
    }

    for(i in Range(length(code_numbers))){
        let c = code_numbers[i];

        if (c == "-"){
            continue;
        }
        
        if (g == c){
            code_numbers[i] = "-";
            num_semi_matches += 1;
            break;
        }
    return (num_matches, num_semi_matches);
    }
}

function get_code_length(){
    response = prompt("How long do you want the code to be? ");

    if (!(is_string_numeric(response))){
        console.log("You must enter a number");
        return get_code_length();}

    let n = int(response);

    if (n < 2){
        console.log("You must choose a number greater than 1");
        return get_code_length();}

    return n;
}

function play_round(){
    code_length = get_code_length();

    history = load_history();
    if (code_length in history){
        let (num_games, best, average) = history[code_length];
        console.log(String.format("The number of times you have tried codes of length %1$x is %2$x. Your average and best number of guesses are %3$x and %$4x, respectively.", code_length, num_games, average, best));
    }
    else{
        console.log(String.format("This is your first time trying a code of length %x", code_length))
    }
}

function get_history_path(){

}

function write_history(){

}

function update_history(){

}

function load_history(){

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