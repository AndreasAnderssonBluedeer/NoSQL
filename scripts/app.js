function Load(){
    var formBeans = document.getElementById("beans_order");
    formBeans.addEventListener("submit", function(event) {
        event.preventDefault();
        var beans = document.getElementsByName("beans");
        var beanAmount = document.getElementById('amountBeans').value
        var bean;
        for(var i = 0; i < beans.length; i++) {
            if(beans[i].checked == true) {
                bean = beans[i].value;
            }
        }
        
        var adder = document.getElementById("adder");
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        var t = document.createTextNode("this works now");
        h1.appendChild(t);
        div.appendChild(h1);
        adder.appendChild(div);

    });
}
/*


var formDrinks = document.getElementById("drink_order");
formDrinks.addEventListener("submit", function(event) {
    event.preventDefault();
    var drinks = document.getElementsByName("drinks");
    var drinkAmount = document.getElementById('amountDrinks').value
    for(var i = 0; i < beans.length; i++) {
        if(drinks[i].checked == true) {
            drink = drinks[i].value;
        }
    }event.target.submit();
});

var formMilks = document.getElementById("milk_order");
formMilks.addEventListener("submit", function(event) {
    event.preventDefault();
    var milks = document.getElementsByName("milks");
    var milkAmount = document.getElementById('amountMilks').value
    for(var i = 0; i < beans.length; i++) {
        if(milks[i].checked == true) {
            milk = milks[i].value;
        }
    }event.target.submit();
});

var formAdditions = document.getElementById("addition_order");
formMilks.addEventListener("submit", function(event) {
    event.preventDefault();
    var additions = document.getElementsByName("additions");
    var additionAmount = document.getElementById('amountAdditions').value
    for(var i = 0; i < beans.length; i++) {
        if(additions[i].checked == true) {
            addition = additions[i].value;
        }
    }event.target.submit();
});
*/
