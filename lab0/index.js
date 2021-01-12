console.log("Hello, World!");

function all_true(a, b){

}

function is_numeric(c){

}

function is_string_numeric(s){

}

function make_code(length){
    
}

function get_main_menu_selection(){
    console.log()
    console.log("What do you want to do")
    console.log("(i) Show Instructions")
    console.log("(p) Play a game")
    console.log("(q) Quit")

    response = input("")

    if (response == "i"){
        print_instructions()
    }

    else if (response == "p"){
        play_round()
    }

    else if (console.log (response == "q")){
        console.log("Ok bye!")
    }

    else{
        console.log("I don't understand...")
    }
}

function init() {
    console.log("CODE⚡BREAKER")
    get_main_menu_selection()
}
init()