const library = [
    {
        id: "1",
        title: "Gita",
        author: "Shri Krishna",
        pages: "400",
        price: "300",
        readed: "Readed"
    },
    
];

// -- constructor 
function Book(
    id,
    title,
    author,
    pages,
    price,
    readed
) {
    if (!new.target) {
        throw Error("")
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.price = price;
    this.readed = readed;
}

const add_book_to_library = () => {
    const id = crypto.randomUUID();

    let html = "";
    library.map((book) => {
        html += `
            <div class="book">
                <div class="title-author">
                    <span class="title">${book.title}</span>
                    <span class="author">${book.author}</span>
                </div>
                <div class="price-pages">
                    <span class="pages">Pages: ${book.pages}</span>
                    <span class="price">Price: ${book.price}</span>
                </div>
                <div class="isreaded">
                    <span>${book.readed}</span>
                </div>
            </div>
        `
    })

    book_shelf.innerHTML = html;
}

const book_shelf = document.querySelector("#js-book-shelf");
const add_button = document.querySelector("#js-add-book");
const add_form = document.querySelector("#js-add-book-form");


add_book_to_library();

