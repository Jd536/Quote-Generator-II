const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//show loading image

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true
}

// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = []
//Show new quote

function newQuote(length) {
    //generate a random number

    let index  = Math.floor(Math.random()*length)
    quote = apiQuotes[index];
    quoteText.textContent = quote.text;
    if(!quote.author){
        authorText.textContent = "Unknown"
    } else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length >120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
   complete()
}

// Get Quotes from the "https://type.fit/api/quotes" API

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    loading();
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote(apiQuotes.length)
    } catch (error) {
        // catch and return the error
    }
}

// Tweek a Quote

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes()

// add post on facebook and whatsapp status functionalities. 
