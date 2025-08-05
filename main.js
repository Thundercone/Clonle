const wordList = window.wordList;
const popWordList = window.popWords;
console.log(wordList.length);
console.log(get_random_index(wordList));
var random_word = retreive_random_word().toUpperCase();
console.log(random_word);
var guess_count = 1;
let event_listener;

const input_field = document.getElementById("input-field");
input_field.addEventListener('keydown', event_listener=function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        guess();
    }
    else
    {
        document.getElementById("error-message").className = "hid-error-message";
    }
    });

function retreive_random_word()
{
    let random_index = get_random_index(popWordList);
    return popWordList[random_index];
}
function get_random_index(wordList)
{
    var max_index = popWordList.length - 1;
    let random_index = Math.floor(Math.random() * (max_index +1));
    if (random_index < max_index)
    {
        return random_index;
    }
    else
    {
        return random_index - 1;
    }
    
}
function guess()
{
    var input_text = document.getElementById("input-field").value;
    //sterilze input and check if in wordlist. Give error message if not.
    var guess_text = input_text.toLowerCase();
    if (!wordList.includes(guess_text))
        {
            document.getElementById("error-message").className = "error-message";
            return;
        }
    
    if (guess_count > 6)
    {
        document.getElementById("error-message").innerText = `You suck ass at this. The word was ${random_word}`;
        document.getElementById("error-message").className = "error-message";
        document.getElementById("reset-button").className = "btn btn-secondary";
        return;
    }    
    //If word in word list, compare strings and send result as object to the update board function
    else
    {
        guess_text = guess_text.toUpperCase();
        var guess_arr = guess_text.split("");
        var rand_word_arr = random_word.split("");
        var result_obj = {};
        for(let i = 0; i < 5; i++)
        {
            if(guess_arr[i] == rand_word_arr[i])
            {
                result_obj[i] = "green";
            }
            else if (rand_word_arr.includes(guess_arr[i]))
            {
                result_obj[i] = "yellow";
            }
            else
            {
                result_obj[i] = "grey";
            }
        }
        console.log(guess_arr);
        console.log(rand_word_arr);
        update_board(guess_arr, result_obj, guess_count);
        guess_count++;
        return;
    }
}
function clear_error_message()
{
    if (document.getElementById("error-message").className == "error-message")
        {
            document.getElementById("error-message").className = "hid-error-message";
        };
}
function update_board(word_arr, result_obj, guess_count)
{
    var updateIdTemplate = `${guess_count}-`;
    let variableIdTemplate = updateIdTemplate;
    let num_green = 0
    for(let i = 0; i < 5; i++)
    {
        variableIdTemplate = updateIdTemplate+String(i+1);
        console.log(variableIdTemplate)
        var element = document.getElementById(variableIdTemplate);
        switch(result_obj[i])
        {
            case "green":
                element.className = "green-square";
                element.innerText = word_arr[i];
                num_green++;
                break;
            case "yellow":
                element.className = "yellow-square";
                element.innerText = word_arr[i];
                break; 
            case "grey":
                element.className = "grey-square";
                element.innerText = word_arr[i];
                break;
            default:
                console.log("Error in update_board switch case statement");
                break;     
        }
        element = document.getElementById("input-field");
        element.value = "";
    }
    if(num_green == 5)
    {
        document.getElementById("error-message").innerText = "You're incredible. You saved the world :)";
        document.getElementById("error-message").className = "error-message";
        input_field.removeEventListener('keydown', event_listener);
        document.getElementById("reset-button").className = "btn btn-secondary";


    }
    return;

}
function reset()
{
    console.log("reset");
    location.reload();
}
//TODO
//Fix double letter bug.