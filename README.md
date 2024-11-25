
# Description
For the final project, my goal is to create a basic quoting system for calculating the total and individual cost of a series of items that would be available at a retail store. 

The idea is this would be the kind of calculator used in a Business to Business pre-sales scenario where the customer is looking to purchase multiple different items in a single batch order, and wants an itemized price, total price, and where discounts can be visible based on the amount of bulk in the order.

The fictional company "Theseus Retail Store (TRP)" will be used, and the items available will be from the following categories:
1. Toys
2. School Supplies
3. Home and Garden
4. Bath and Bedroom

# Feature List

1. A graphical logo (Resembling a ship, I.E. the ship of Theseus) and title bar for the site
2. The main layout of the page will include a dynamic number of line items, which can increase when the user clicks a button
3. In each line item there will be a dropdown for selecting the Item Category, the Item Name.
4. In each line item there will be a unit cost based on the item selected, and the user will be able to enter a unit number for a number of items to add.
5. There will be a total line at the end of the line items, which will automatically be updated when the user changes any appropriate fields in the line items.
6. When the user is done selecting all the appropriate fields, there will be a "Print" button that the user can click that will bring the user to the Print Dialog in order for them to print out the quote.

# Technical Tasks
1. Prepare the skeleton of of the HTML page.  Each line item will be in a separate `<div>` element.  Each field in each line will need to have a unique ID for holding data
2. Use an array that will hold the contents of all line items
	1. Pre-create the list of line items in the array
3. Use a lookup object which will hold the category and price for each item
4. Create a function for calculating the total of all line items
	1. This function must loop through all elements of the data array and calculate a total
5. Create an event handler for when any input field is changed to call the above totaling function
6. Create a button to trigger the browser print dialog
7. Add graphical styling to make the list nicer to work with