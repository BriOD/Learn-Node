function autocomplete(input, latInput, lngInput) {
    // if no input on the page, skip this function
    if(!input) return;
    const dropdown = new google.maps.places.Autocomplete(input);
};

export default autocomplete;