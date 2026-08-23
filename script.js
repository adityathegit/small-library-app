const book_shelf = document.querySelector("#js-book-shelf");
const dialog = document.querySelector("#js-dialog");
const new_btn = document.querySelector("#js-new-book");
const close_btn = document.querySelector("#js-close-btn");
const add_btn = document.querySelector("#js-add-btn");
const form = document.querySelector(".form");

const library = [
    {
        id: "ad23bc2e-3722-4be3-8010-5ce9c51253a9",
        title: "Shrimad Bhagavad Gita",
        author: "Veda Vyas",
        pages: "350",
        price: "20",
        readed: "Readed"
    },

    {
        id: "d846ae98-599d-442b-81a4-420461d09de6",
        title: "Shrimad Valmiki Ramayan",
        author: "Maharshi Valmiki",
        pages: "1500",
        price: "665",
        readed: "Readed"
    },

    {
        id: "6ad997d1-6285-4f7d-84f2-ff48eb6d9579",
        title: "Mahabharata",
        author: "Veda Vyas",
        pages: "6000",
        price: "2851",
        readed: "Readed"
    },

];

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

const show_dialog = () => dialog.showModal();

const close_dialog = () => dialog.close();

const get_values = () => {
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const price = document.querySelector("#price");
    const checked_radio = document.querySelector('input[name="isreaded"]:checked');

    const title_value = title ? title.value : "";
    const author_value = author ? author.value : "";
    const pages_value = pages ? pages.value : "";
    const price_value = price ? price.value : "";
    const readed_value = checked_radio ? checked_radio.value : "not specified";

    const arr = [];

    if (title_value !== "" && author_value !== "" && pages_value !== "" && price_value !== "" && readed_value !== "") {
        arr.push(title_value, author_value, pages_value, price_value, readed_value);
        return arr;
    }
    return [];
}

const add_book_to_library = () => {
    const id = crypto.randomUUID();

    const values = get_values();

    if (values.length !== 0) {
        const book = new Book(id, ...values)
        library.push(book);
        show_book();
    }
}

const show_book = () => {
    let html = "";
    library.map((book) => {
        html += `
            <div id="${book.id}" class="book">
                <div class="title-author">
                    <div class="title-btn">
                        <span class="title">${book.title}</span>
                        <button class="close">X</button>
                    </div>
                    <span class="author">${book.author}</span>
                </div>
                <div class="price-pages">
                    <span class="pages">Pages: ${book.pages}</span>
                    <span class="price">Price: ${book.price}</span>
                </div>
                <div class="isreaded">
                    <button class="is-read-btn">${book.readed}</button>
                </div>
            </div>
        `
    })

    book_shelf.innerHTML = html;
}

const return_ID = (event) => {
    const delete_btn = event.target.closest(".close");
    
    const selected_book = event.target.closest(".book");
    const book_ID = selected_book.id;
    
    if (delete_btn) {
        remove_book(book_ID);
    }

    change_read_status(event, book_ID)
}

const remove_book = (book_ID) => {
    const index = library
        .map((book) => book.id)
        .findIndex(ID => ID === book_ID);
    library.splice(index, 1);
    show_book();
}

const change_read_status = (event, book_ID) => {
    const change_btn = event.target.closest(".is-read-btn");
    if(change_btn) {
        const object = library.find(obj => obj.id === book_ID);
        (object.readed === "Readed") ? object.readed = "Not Readed" : object.readed = "Readed";
        show_book();
    }
}

new_btn.addEventListener("click", () => {
    show_dialog();
})

close_btn.addEventListener("click", () => {
    close_dialog();
    form.reset();
})

add_btn.addEventListener("click", () => {
    get_values();
    add_book_to_library();
    form.reset();
})

book_shelf.addEventListener("click", (event) => {
    return_ID(event);
})

show_book();



