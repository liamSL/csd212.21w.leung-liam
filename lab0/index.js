console.log("Hello, World!");

"use strict";

import initPrompt from 'prompt-sync'
const prompt = initPrompt();

function all_true(a, b){
    return a && b
}

function is_numeric(c){
    return "0" <= c && c <= "9"
}

function is_string_numeric(s){
    return reduce(all_true, map(is_numeric, s))
}

function make_code(length){
    let code = ""
    for (_ in Range(length));
        code += String(Math.floor(Math.random(0, 9)*10))
}

function get_guess(code_length){

}

function count_matches(code, guess){

}

function get_code_length(){
    response = prompt("How long do you want the code to be? ")

    if (!(is_string_numeric(response)));
        console.log("You must enter a number")
        return get_code_length();

    let n = int(response)

    if (n < 2);
        console.log("You must choose a number greater than 1")
        return get_code_length();

    return n
}

function play_round(){

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
    console.log()
    console.log("What do you want to do")
    console.log("(i) Show Instructions")
    console.log("(p) Play a game")
    console.log("(q) Quit")

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