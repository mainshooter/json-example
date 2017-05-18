var json;

(function() {
  json = {
    get: function() {
      // AJAX request for json
      var jsonResult;
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          jsonResult = this;
        }
      };
      xhttp.open("GET", "/webservices/api-employees.php?output=json", false);
      xhttp.send();
      return(jsonResult);
    },
    display: function() {
      // Displays the json
      var jsonResult = JSON.parse(json.get().responseText);
      // Javascript needs to see this as json so we parse it with JSON.parse();

      var employees = jsonResult['employees'];
      // To get inside of the employees object

      jsonTable = json.table(employees);
      // Create a table

      console.log(jsonResult);
      // Json object

      console.log(employees[0].name);
      // To get the first name of the employees

      document.getElementById('table').innerHTML = jsonTable;
    },
    table: function(employees) {
      jsonTable = "<table><tr><th>Naam</th><th>Bedrijf</th></tr>";
        for (var i = 0; i < employees.length; i++) {
          jsonTable += "<tr>";
          jsonTable += "<td>" + employees[i].name + "</td>";
          jsonTable += "<td>" + employees[i].company + "</td>";
          jsonTable += "</tr>";
        }
      jsonTable += "</table>";

      return(jsonTable);
    }
  }

}());
document.getElementById('start').addEventListener("click", json.display);
