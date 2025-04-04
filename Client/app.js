function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
  
    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  }
  
function onPageLoad() {
  console.log("Document loaded");
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  
  // var url = "/api/get_location_names"; // Use this if you are using nginx. i.e tutorial 8 and onwards

  $.ajax({
      url: url,
      method: "GET",
      success: function(data) {
          console.log("Got response for get_location_names request", data);
          if (data) {
              var locations = data.locations;
              var uiLocations = document.getElementById("uiLocations");
              $('#uiLocations').empty();
              for (var i in locations) {
                  var opt = new Option(locations[i]);
                  $('#uiLocations').append(opt);
              }
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.error("Error during AJAX call:", textStatus, errorThrown);
          alert("An error occurred while fetching location names. Please try again later.");
      }
  });
}

window.onload = onPageLoad;
