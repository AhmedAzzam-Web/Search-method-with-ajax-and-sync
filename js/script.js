const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");


// search the state of json and filter it
const searchState = async searchText => {
  var states;
  let myRequest = new XMLHttpRequest();

  myRequest.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      var ajaxState = this.responseText;
    }
    states = JSON.parse(ajaxState);
  };
  myRequest.open("GET", "../data/info.json", false);
  // false means we want to use Sync technique if we make it true then we want Async technique
  myRequest.send();
  
  // get matches to current text input
  let matches = states.filter(state => {
    const regex = new RegExp(`^${searchText}`, 'ig');
    return state.name.match(regex) || state.abbr.match(regex);
  });

  if (searchText.length == 0) {
    matches = []
  }
  // this will output matches of the text input in HTML
  output(matches)
}

// show results in html
const output = matches => {
  if (matches.length > 0) {
    const html = matches.map(match => {
      return `
        <div class='card card-body my-4'>
          <h4>${match.name} (${match.abbr}) <span class='text-primary'>${match.capital}</span><h4>

          <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
      `
    }).join('')
    
    matchList.innerHTML = html
  }
  else {
    matchList.innerHTML = []
  }

}

search.addEventListener("keyup", () => searchState(search.value));