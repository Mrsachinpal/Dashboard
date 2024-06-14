var totalItems = 42; // Total number of seats you have

// Calculate number of items per column
var itemsPerColumn = Math.ceil(totalItems / 2);

// Generate list items for the first column
var firstColumn = document.getElementById('firstColumn');
for (var i = 1; i <= itemsPerColumn; i++) {
    var li = document.createElement('li');
    li.innerHTML = `
        <label class="dropdown-item" style="font-size: small;">
            <input type="checkbox" name="seat" value="l-${i}"> L-${i}
        </label>
    `;
    firstColumn.appendChild(li);
}

// Generate list items for the second column
var secondColumn = document.getElementById('secondColumn');
for (var i = itemsPerColumn + 1; i <= totalItems; i++) {
    var li = document.createElement('li');
    li.innerHTML = `
        <label class="dropdown-item" style="font-size: small;">
            <input type="checkbox" name="seat" value="l-${i}"> L-${i}
        </label>
    `;
    secondColumn.appendChild(li);
}