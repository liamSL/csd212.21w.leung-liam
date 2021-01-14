console.log("Hello, World!");

import initPrompt from 'prompt-sync'
const prompt = initPrompt();

function all_true(a, b){

}

function is_numeric(c){

}

function is_string_numeric(s){

}

function make_code(length){
    
}

function get_guess(code_length){

}

function count_matches(code, guess){

}

function get_code_length(){
    response = prompt("How long do you want the code to be? ")

    if (!(is_string_numeric(response)))
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

    let response = prompt("");

    if (response == "i"){
        print_instructions();
    }

    else if (response == "p"){
        play_round();
    }

    else if (console.log (response == "q")){
        console.log("Ok bye!")
        System.exit(0)
    }

    else{
        console.log("I don't understand...")
    }
}

function init() {
    console.log("CODE⚡BREAKER")
    get_main_menu_selection();
}
init()