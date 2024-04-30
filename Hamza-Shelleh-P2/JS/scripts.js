const books = [
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', description: 'A novel set in the American South during the 1930s that addresses issues of racism and morality.', imageUrl: "images/Kill.jpg" },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', description: 'A novel set in the Jazz Age (1920s) in the United States, portraying the extravagant lifestyles of the wealthy elite.', imageUrl: "images/Great.jpg" },
    { title: 'In Cold Blood', author: 'Truman Capote', category: 'Non-Fiction', description: 'A groundbreaking work of true crime writing, "In Cold Blood" tells the story of the 1959 murder of the Clutter family in Kansas.', imageUrl: "images/Blood.jpg" },
];

const categoryFilter = document.getElementById('categoryFilter');
const bookList = document.getElementById('bookList');
const bookDetailsModal = document.getElementById('bookDetailsModal');
const bookDetails = document.getElementById('bookDetails');

// Populate category filter
const categories = [...new Set(books.map(book => book.category))];
categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
});

// Display initial book list
displayBooks(books);

// Event listeners
categoryFilter.addEventListener('change', () => {
    const category = categoryFilter.value;
    const filteredBooks = category === 'all' ? books : books.filter(book => book.category.toLowerCase() === category);
    displayBooks(filteredBooks);
});

bookList.addEventListener('click', event => {
    const clickedBook = event.target.closest('.book');
    if (clickedBook) {
        const title = clickedBook.dataset.title;
        const selectedBook = books.find(book => book.title === title);
        if (selectedBook) {
            showBookDetails(selectedBook);
        }
    }
});

bookDetailsModal.addEventListener('click', event => {
    if (event.target.classList.contains('close') || event.target === bookDetailsModal) {
        bookDetailsModal.style.display = 'none';
    }
});

// Functions
function displayBooks(books) {
    bookList.innerHTML = '';

    // Check if the books array is empty
    if (books.length === 0) {
        const messageElement = document.createElement('p');
        messageElement.textContent = 'No books to display.';
        bookList.appendChild(messageElement);
    } else {
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.dataset.title = book.title;

            const imageElement = new Image();
            imageElement.src = book.imageUrl;
            imageElement.alt = book.title;

            imageElement.onload = function() {
                const aspectRatio = imageElement.width / imageElement.height;
                const desiredHeight = 200; // Set the desired height
                const desiredWidth = aspectRatio * desiredHeight;

                imageElement.width = desiredWidth;
                imageElement.height = desiredHeight;
            };

            bookElement.appendChild(imageElement);

            const titleElement = document.createElement('h3');
            titleElement.textContent = book.title;
            bookElement.appendChild(titleElement);

            const authorElement = document.createElement('p');
            authorElement.textContent = `Author: ${book.author}`;
            bookElement.appendChild(authorElement);

            const categoryElement = document.createElement('p');
            categoryElement.textContent = `Category: ${book.category}`;
            bookElement.appendChild(categoryElement);

            bookList.appendChild(bookElement);
        });
    }
}

function showBookDetails(book) {
    bookDetails.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p>${book.description}</p>
    `;
    bookDetailsModal.style.display = 'block';
}
