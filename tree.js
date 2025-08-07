const origin = new relativeNode()
const answer_section = document.getElementById("answer-section")

function get_relative(reference, step) {
    const relative_type = step["relative"]
    const degree = step["degree"]
    const generation = step["generation"]

    switch (relative_type) {
        case "sibling":
            return reference.getSiblings()

        case "child":
            return reference.getChildren(generation)

        case "parent":
            return reference.getParents(generation)

        case "pibling":
            return reference.getPiblings(generation, degree)

        case "cousin":
            return reference.getCousins(degree)

        case "nibling":
            return reference.getNiblings(generation, degree)

        case "me":
            return [reference]

    }
}

function create_relation_name_from_steps_to_last_common_ancestor(steps_reference, steps_other) {
    let text_object = document.createElement("div")
    text_object.setAttribute("class", "")

    let your = document.createElement("span")
    your.setAttribute("data-i18n", "your")
    text_object.appendChild(your)

    let uppercase = true

    // The person you are looking for is ...
    if (steps_reference == 0 && steps_other == 0) {
        // Yourself
        let yourself = document.createElement("span")
        yourself.setAttribute("data-i18n", "yourself")
        text_object.appendChild(yourself)
    }
    else if (steps_reference == 0 && steps_other > 0) {
        // Direct Descendant

        while (steps_other > 1) {
            if (steps_other > 2) {
                if (uppercase) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "upper-great")
                    text_object.appendChild(great)
                    uppercase = false
                } else {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "lower-great")
                    text_object.appendChild(great)
                }
            }
            else {
                if (uppercase) {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "upper-grand-child-prefix")
                    text_object.appendChild(grand)
                    uppercase = false
                } else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "lower-grand-child-prefix")
                    text_object.appendChild(grand)
                }
            }

            steps_other = steps_other - 1
        }


        if (uppercase) {
            let child = document.createElement("span")
            child.setAttribute("data-i18n", "upper-your-child")
            text_object.appendChild(child)
        } else {
            let child = document.createElement("span")
            child.setAttribute("data-i18n", "lower-your-child")
            text_object.appendChild(child)
        }


    }
    else if (steps_reference > 0 && steps_other == 0) {
        // Direct Ancestor

        while (steps_reference > 1) {
            if (uppercase) {
                if (steps_reference > 2) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "upper-great")
                    text_object.appendChild(great)
                }
                else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "upper-grand")
                    text_object.appendChild(grand)
                }
            } else {
                if (steps_reference > 2) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "lower-great")
                    text_object.appendChild(great)
                }
                else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "lower-grand")
                    text_object.appendChild(grand)
                }
            }

            uppercase = false
            steps_reference = steps_reference - 1
        }

        if (uppercase) {
            let parent = document.createElement("span")
            parent.setAttribute("data-i18n", "upper-your-parent")
            text_object.appendChild(parent)
        }
        else {
            let parent = document.createElement("span")
            parent.setAttribute("data-i18n", "lower-your-parent")
            text_object.appendChild(parent)
        }
    }
    else if (steps_reference == steps_other) {
        // Cousin OR Sibling


        if (steps_reference == 1) {
            // Sibling
            let sibling = document.createElement("span")
            sibling.setAttribute("data-i18n", "upper-your-sibling")
            text_object.appendChild(sibling)
        }
        else {
            // Cousin (steps_reference -1). degree
            let cousin = document.createElement("span")
            cousin.setAttribute("data-i18n", "upper-your-cousin")
            text_object.appendChild(cousin)

            let degree_number = document.createElement("span")
            degree_number.innerText = ` ${(steps_reference - 1)}`
            text_object.appendChild(degree_number)

            let degree = document.createElement("span")
            degree.setAttribute("data-i18n", "degree")
            text_object.appendChild(degree)

        }

    }
    else if (steps_reference > steps_other) {
        // Some kind of Pibling
        let generation = steps_reference - steps_other

        while (generation > 1) {
            if (uppercase) {
                if (generation > 2) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "upper-great")
                    text_object.appendChild(great)
                }
                else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "upper-grand")
                    text_object.appendChild(grand)
                }
            } else {
                if (generation > 2) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "lower-great")
                    text_object.appendChild(great)
                }
                else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "lower-grand")
                    text_object.appendChild(grand)
                }
            }


            generation = generation - 1
            uppercase = false
        }


        if (uppercase) {
            let pibling = document.createElement("span")
            pibling.setAttribute("data-i18n", "upper-your-pibling")
            text_object.appendChild(pibling)
        } else {
            let pibling = document.createElement("span")
            pibling.setAttribute("data-i18n", "lower-your-pibling")
            text_object.appendChild(pibling)
        }


        let degree_number = document.createElement("span")
        degree_number.innerText = ` ${(steps_other)}`
        text_object.appendChild(degree_number)

        let degree = document.createElement("span")
        degree.setAttribute("data-i18n", "degree")
        text_object.appendChild(degree)
    }
    else if (steps_reference < steps_other) {
        // Some kind of Nibling
        steps_other = steps_other - steps_reference;

        while (steps_other > 1) {
            if (uppercase) {
                if (steps_other > 2) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "upper-great")
                    text_object.appendChild(great)
                }
                else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "upper-grand")
                    text_object.appendChild(grand)
                }
            } else {
                if (steps_other > 2) {
                    let great = document.createElement("span")
                    great.setAttribute("data-i18n", "lower-great")
                    text_object.appendChild(great)
                }
                else {
                    let grand = document.createElement("span")
                    grand.setAttribute("data-i18n", "lower-grand")
                    text_object.appendChild(grand)
                }
            }

            steps_other = steps_other - 1
            uppercase = false
        }

        if (uppercase) {
            let nibling = document.createElement("span")
            nibling.setAttribute("data-i18n", "upper-your-nibling")
            text_object.appendChild(nibling)
        } else {
            let nibling = document.createElement("span")
            nibling.setAttribute("data-i18n", "lower-your-nibling")
            text_object.appendChild(nibling)
        }


        let degree_number = document.createElement("span")
        degree_number.innerText = ` ${(steps_reference)}`
        text_object.appendChild(degree_number)

        let degree = document.createElement("span")
        degree.setAttribute("data-i18n", "degree")
        text_object.appendChild(degree)
    }

    return text_object
}


ask_button.addEventListener("click", function () {
    // 1. get described relatives on tree
    const selectors = selector_list.getElementsByClassName("selector")

    let steps = []
    for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];
        steps.push(get_selector_values(selector))
    }

    let current_references = [origin]

    while (steps.length != 0) {
        const current_step = steps.pop()
        //console.log(current_references)

        let next_references = []

        for (let i = 0; i < current_references.length; i++) {
            next_references = next_references.concat(get_relative(current_references[i], current_step))
        }

        current_references = next_references
    }

    const described_relatives = current_references


    // 2. get reference point on tree

    const reference_relative = get_relative(origin, get_selector_values(reference_list.getElementsByClassName("selector")[0]))[0]


    // 3. get all unique steps to last common ancestors

    let steps_to_common_ancestors = []
    described_relatives.forEach(described_relative => {
        steps_to_common_ancestors.push(reference_relative.getLastCommonAncestor(described_relative))
    });

    steps_to_common_ancestors = new Set(steps_to_common_ancestors) // removes duplicates
    steps_to_common_ancestors = Array.from(steps_to_common_ancestors)


    // 4. show name

    while (answer_section.hasChildNodes()) {
        answer_section.removeChild(answer_section.firstChild)
    }

    for (let i = 0; i < steps_to_common_ancestors.length; i++) {
        const steps_to_LCA = steps_to_common_ancestors[i]
        answer_section.appendChild(create_relation_name_from_steps_to_last_common_ancestor(steps_to_LCA["this"], steps_to_LCA["node"]))

        if (i != (steps_to_common_ancestors.length - 1)) {
            // OR
            let or = document.createElement("span")
            or.setAttribute("data-i18n", "or")
            answer_section.appendChild(or)
        }
    }
    reloadContent()

})