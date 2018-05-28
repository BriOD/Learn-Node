function autocomplete(input, latInput, lngInput) {
    // if no input on the page, skip this function
    if(!input) return;
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
    })
};

export default autocomplete;