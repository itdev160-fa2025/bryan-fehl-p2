// Main javascript code for the website

// Master count of currently existing line-items
var itemCount = 1;

// Initialize the item array with the default values
var itemArray = []

// Simple helper function for retrieving DOM element by its ID
function get(element) {
    return document.getElementById(element);
}

// Function that updates the individual item costs, subtotals, and invoice total
// Intended to be used when elements in the form change
function updateCosts() {
    // Get the all child <div>'s from the master item list
    var elementList  = get("item-list").getElementsByTagName('div');
    var totalCost    = 0;
    var elementTotal = get("total");

    for (var i = 0; i < elementList.length; i++){
        // Get the current list item category, item, and cost DOM elements to manipulate
        var catElement   = get("li-" + (i+1).toString() + "-category");
        var itemElement  = get("li-" + (i+1).toString() + "-item");
        var costElement  = get("li-" + (i+1).toString() + "-cost");
        var countElement = get("li-" + (i+1).toString() + "-count");
        var subElement   = get("li-" + (i+1).toString() + "-total");
        
        // Get the category, item name, count and cost
        var category    = catElement.options[catElement.selectedIndex].value;
        var itemName    = itemElement.options[itemElement.selectedIndex].value;
        var itemCount   = parseFloat(countElement.value);
        var itemCost    = parseFloat(itemDetails[category][itemName].cost);

        // Lookup the cost of the item and set cost field to that value
        costElement.value = itemDetails[category][itemName].cost;

        // Update the subtotal based on the item count and cost
        subElement.value = (itemCount * itemCost).toString();

        // Add the subtotal to the running total
        totalCost = totalCost + (itemCount * itemCost);        
    }
    // Update the actual total in the page, making sure the total never exceeds 2 decimal places
    elementTotal.value = totalCost.toFixed(2).toString();
}

// When the category list is updated, update the item list to match the category
function updateItemList() {
    // Get the all child <div>'s from the master item list
    var elementList  = get("item-list").getElementsByTagName('div');

    // Loop through the child divs and update the item list to reflect the categories
    for (var i = 0; i < elementList.length; i++ ){

        // Get the current list items category element
        var catElement = get("li-" + (i+1).toString() + "-category");
        // Get the selected category value for the line item
        var catName    = catElement.options[catElement.selectedIndex].value;

        // Get the dropdown element for the current line item
        var itemDropdown = get("li-" + (i+1).toString() + "-item");
        // Remove the options from the item dropdown to be replaced
        itemDropdown.textContent = '';

        // Loop through all the items for a category and populate the item select field
        var newOption;
        for (item in itemDetails[catName]){
            newOption = document.createElement('option');
            newOption.value     = item;
            newOption.innerHTML = itemDetails[catName][item].name;
            itemDropdown.append(newOption);
        }
    }

    // Update costs again since the item for a list has changed
    updateCosts();

}

// This function is called by the Add button, adds a new line item to the page
function addLine() {
    var itemListFieldset = get('item-list');
    
    // Add the default values the array will use
    itemArray.push({
        "name"  : "toy-action-hank",
        "cat"   : "toys",
        "cost"  : "29.99",
        "count" : "1"
    });

    var curItem          = itemArray.length;

    // Add a new div element that holds the entire line item 
    var newDiv = document.createElement('div');
    newDiv.id  = "li-" + curItem.toString();
    newDiv.classList.add("line-item");

    // Depending on the current row count, apply the even or odd class
    if (curItem % 2 == 0)
    {
        newDiv.classList.add("even");
    }
    else {
        newDiv.classList.add("odd");
    }
    
    itemListFieldset.append(newDiv);

    // Add the Initial Item # label
    var newElement = document.createElement('span');
    newElement.id        = "li-"   + curItem.toString() + "-number";
    newElement.innerHTML = curItem.toString() + "|";
    newElement.classList.add("item-number");
    newDiv.append(newElement);

    // Add the Category Label
    newElement = document.createElement('label');
    newElement.id        = "li-" + curItem.toString() + "-cat-label";
    newElement.htmlFor   = "li-" + curItem.toString() + "-category";
    newElement.innerHTML = "Category:";
    newDiv.append(newElement);

    // Add the category select
    newElement = document.createElement('select');
    newElement.name = "li-" + curItem.toString() + "-category";
    newElement.id   =  newElement.name;
    newElement.onchange = updateItemList;

    // Loop through all categories and add them as select options for the item
    var newOption;
    for (const [key, value] of itemCategories) {
        newOption = document.createElement('option');
        newOption.value     = key;
        newOption.innerHTML = value;
        newElement.append(newOption);
    }
    newDiv.append(newElement);

    //  Add the label for the actual item itself
    newElement = document.createElement('label');
    newElement.htmlFor   = "li-" + curItem.toString() + "-item";
    newElement.innerHTML = "Item:";
    newDiv.append(newElement);
    
    // Add the actual item select
    newElement = document.createElement('select');
    newElement.name = "li-" + curItem.toString() + "-item";
    newElement.id   = "li-" + curItem.toString() + "-item";
    newElement.onchange = updateCosts;

    // Loop through all the items in the category an add options for the select
    for (item in itemDetails["toys"]){
        newOption = document.createElement('option');
        newOption.value     = item;
        newOption.innerHTML = itemDetails["toys"][item].name;
        newElement.append(newOption);
    }
    newDiv.append(newElement);

    // Add the span pseudo label for the cost field
    newElement = document.createElement('label');
    newElement.classList.add("field-label");
    newElement.innerHTML = "Cost:";
    newDiv.append(newElement);

    // Add the actual cost of the item as a disabled input
    newElement = document.createElement('input');
    newElement.name     = "li-" + curItem.toString() + "-cost";
    newElement.id       = "li-" + curItem.toString() + "-cost";
    newElement.type     = "text";
    newElement.value    = "29.99";
    newElement.size     = 8;
    newElement.disabled = true;
    newDiv.append(newElement);

    // Add the label field for the item count
    newElement = document.createElement('label');
    newElement.innerHTML = "Count:";
    newDiv.append(newElement);

    // Add the input count field
    newElement = document.createElement('input');
    newElement.type     = "text";
    newElement.name     = "li-" + curItem.toString() + "-count";
    newElement.id       = "li-" + curItem.toString() + "-count";
    newElement.value    = "1";
    newElement.size     = 5;
    newElement.onchange = updateCosts;
    newDiv.appendChild(newElement);

    // Add the subtotal label
    newElement = document.createElement('label');
    newElement.innerHTML = "Subtotal:";
    newDiv.appendChild(newElement);

    // Add the sub total cost of the item times the item count
    newElement = document.createElement('input');
    newElement.name     = "li-" + curItem.toString() + "-total";
    newElement.id       = "li-" + curItem.toString() + "-total";
    newElement.type     = "text";
    newElement.value    = "29.99";
    newElement.classList.add("subtotal");
    newElement.disabled = true;
    newDiv.appendChild(newElement);

    // Update costs again since the item for a list has changed
    updateCosts();
}

// This function is called by the Remove button, removes the last line item from the page
function removeLine() {

    // As a safety measure, only attempt to delete the line if it's not the last one remaining.
    if (itemArray.length > 1)
    {
        var elementToRemove = get("li-" + itemArray.length.toString());
        elementToRemove.remove();
        itemArray.pop();
    }

    // Update costs again since the item for a list has changed
    updateCosts();
}

// This function is called by the print button and triggers the browser print dialog
function printDialog() {
    window.print();  
}

// Connect the buttons to their respective functions
var buttonNewLine    = get('add-line');
var buttonRemoveLine = get('remove-line');
var buttonPrint      = get('print-page');

buttonNewLine.onclick    = addLine;
buttonRemoveLine.onclick = removeLine;
buttonPrint.onclick      = printDialog;

// Start the document by adding an initial line item
addLine();