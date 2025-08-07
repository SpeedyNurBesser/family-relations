const selector_list = document.getElementById("selector-list");
const reference_list = document.getElementById("reference-list");
const add_button = document.getElementById("add");
const ask_button = document.getElementById("ask");

const nom_relatives = [
    "sibling",
    "child",
    "parent",
    "pibling",
    "cousin",
    "nibling",
];

const gen_relatives = [
    "gen-sibling",
    "gen-child",
    "gen-parent",
    "gen-pibling",
    "gen-cousin",
    "gen-nibling",
];

const my_relatives = [
    "my-sibling",
    "my-child",
    "my-parent",
    "my-pibling",
    "my-cousin",
    "my-nibling",
    "me"
];

function update_selector(selector, article, relatives) {
    const article_span = selector.getElementsByClassName("article-span")[0];
    article_span.setAttribute("data-i18n", article);

    const select = selector.getElementsByClassName("selector-select")[0];
    const options = select.getElementsByTagName("option");
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        option.setAttribute("data-i18n", relatives[i]);
    }

    reloadContent();
}

function update_selector_list() {
    let selectors = selector_list.getElementsByClassName("selector");

    if (selectors.length == 1) {
        update_selector(selectors[0], "empty", my_relatives);
    } else {
        for (let i = 0; i < selectors.length; i++) {
            const selector = selectors[i];
            if (i == 0) {
                // first element
                update_selector(selector, "the-nom", nom_relatives);
            } else if (i == selectors.length - 1) {
                // last element
                update_selector(selector, "my-gen", gen_relatives);
            } else {
                // every element inbetween
                update_selector(selector, "the-gen", gen_relatives);
            }
        }
    }
}

function check_number_input(input, default_value) {
    if (isNaN(input.value)) {
        input.value = default_value;
    }
}

function add_selector(removable = true, destination = selector_list, reference = false) {
    let selector = document.createElement("div");
    selector.setAttribute("class", "selector");

    let article_span = document.createElement("span");
    article_span.setAttribute("class", "article-span");
    article_span.setAttribute("data-i18n", "for");
    selector.appendChild(article_span);

    let great_amount_input = document.createElement("input");
    great_amount_input.setAttribute("class", "great-amount");
    great_amount_input.setAttribute("type", "number");
    great_amount_input.setAttribute("min", "0");
    great_amount_input.setAttribute("value", "0");
    great_amount_input.disabled = true;
    great_amount_input.addEventListener("change", function () {
        check_number_input(great_amount_input, 0);

        if (great_amount_input.value >= 1) {
            is_grand_input.checked = true;
        }
    });

    let great_span = document.createElement("span");
    great_span.setAttribute("class", "great-span");
    great_span.setAttribute("data-i18n", "great");

    let is_grand_input = document.createElement("input");
    is_grand_input.setAttribute("class", "is-grand");
    is_grand_input.setAttribute("type", "checkbox");
    is_grand_input.disabled = true;
    is_grand_input.addEventListener("change", function () {
        if (!is_grand_input.checked) {
            great_amount_input.value = 0;
        }
    });

    let grand_span = document.createElement("span");
    grand_span.setAttribute("class", "grand-span");
    grand_span.setAttribute("data-i18n", "grand");

    let select = document.createElement("select");
    select.setAttribute("class", "selector-select");
    if (!reference) {
        for (let i = 0; i < nom_relatives.length; i++) {
            const option = document.createElement("option");
            option.setAttribute("data-i18n", nom_relatives[i]);
            option.setAttribute("value", nom_relatives[i]);
            select.appendChild(option);
        }
    } else {
        for (let i = 0; i < my_relatives.length; i++) {
            const option = document.createElement("option");
            option.setAttribute("data-i18n", my_relatives[i]);
            if (i == nom_relatives.length) {
                option.setAttribute("value", my_relatives[i]);
            } else {
                option.setAttribute("value", nom_relatives[i]);
            }

            select.appendChild(option);
        }
    }


    let degree_number_input = document.createElement("input");
    degree_number_input.setAttribute("class", "degree-number");
    degree_number_input.setAttribute("type", "number");
    degree_number_input.setAttribute("min", "1");
    degree_number_input.setAttribute("value", "1");
    degree_number_input.disabled = true;
    degree_number_input.addEventListener("change", function () {
        check_number_input(degree_number_input, 1);
    });

    let degree_span = document.createElement("span");
    degree_span.setAttribute("class", "degree-span");
    degree_span.setAttribute("data-i18n", "degree");

    select.addEventListener("change", function () {
        great_amount_input.disabled = true;
        is_grand_input.disabled = true;
        degree_number_input.disabled = true;

        great_amount_input.value = 0;
        is_grand_input.checked = false;
        degree_number_input.value = 1;

        switch (select.value) {
            case "sibling":
                great_amount_input.disabled = true;
                is_grand_input.disabled = true;

                grand_span.setAttribute("data-i18n", "grand");
                reloadContent();

                degree_number_input.disabled = true;
                break;
            case "child":
                great_amount_input.disabled = false;
                is_grand_input.disabled = false;

                grand_span.setAttribute("data-i18n", "grand-child");
                reloadContent();

                degree_number_input.disabled = true;
                break;
            case "parent":
                great_amount_input.disabled = false;
                is_grand_input.disabled = false;
                grand_span.setAttribute("data-i18n", "grand");
                reloadContent();
                degree_number_input.disabled = true;
                break;
            case "pibling":
                great_amount_input.disabled = false;
                is_grand_input.disabled = false;

                grand_span.setAttribute("data-i18n", "grand");
                reloadContent();

                degree_number_input.disabled = false;
                break;
            case "cousin":
                great_amount_input.disabled = true;
                is_grand_input.disabled = true;

                grand_span.setAttribute("data-i18n", "grand");
                reloadContent();

                degree_number_input.disabled = false;
                break;
            case "nibling":
                great_amount_input.disabled = false;
                is_grand_input.disabled = false;

                grand_span.setAttribute("data-i18n", "grand");
                reloadContent();

                degree_number_input.disabled = false;
                break;
        }
    });

    selector.appendChild(great_amount_input);
    selector.appendChild(great_span);
    selector.appendChild(is_grand_input);
    selector.appendChild(grand_span);
    selector.appendChild(select);
    selector.appendChild(degree_number_input);
    selector.appendChild(degree_span);

    if (removable) {
        const remove_button = document.createElement("button");
        remove_button.setAttribute("data-i18n", "remove");
        remove_button.addEventListener("click", function () {
            selector.remove();
            update_selector_list();
        });
        selector.appendChild(remove_button);
    }

    destination.appendChild(selector);

    update_selector_list();

    return selector;
}

function get_selector_values(selector) {
    const select = selector.getElementsByClassName("selector-select")[0];
    const great_amount_input = selector.getElementsByClassName("great-amount")[0];
    const is_grand_input = selector.getElementsByClassName("is-grand")[0];
    const degree_number_input = selector.getElementsByClassName("degree-number")[0];

    return {
        relative: select.value,
        degree: Number(degree_number_input.value) - 1,
        generation: Number(great_amount_input.value) + Number(is_grand_input.checked),
    }
}

add_button.addEventListener("click", add_selector);

add_selector(false);

add_selector(false, reference_list, true);
