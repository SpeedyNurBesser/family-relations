
let currentValue = 0;

function checkParameter(parameter, name) {
    if (isNaN(parameter)) {
        throw new Error(`Parameter ${name} must be a number`)
    }

    if (parameter < 0) {
        throw new Error(`Parameter ${name} must be 0 or bigger`)
    }
}

class relativeNode {
    constructor(parents = [], children = []) {
        this.value = currentValue;
        currentValue++;
        this.parents = parents;
        this.children = children;

        // most of the time those arrays will be arrays of one or none, except for children relationships within the origin's direct ancestry, where it would make sense to have 2 children (own parents vs piblings (aunts and uncles))
    }

    getDirectParents() {
        if (this.parents.length == 0) {
            this.parents = [new relativeNode([], [this])]
        }

        return this.parents
    }

    getParents(generation = 0) {
        checkParameter(generation, "generation")
        // generation 0 parents are your parents
        // generation 1 parents are your parent's parents, your grandparents
        // generation 2 parents are your grandparent's parents, your great-grandparents

        if (generation == 0) {
            return this.getDirectParents()
        } else {
            const directParents = this.getDirectParents()

            let outputParents = []

            directParents.forEach(parent => {
                outputParents = outputParents.concat(parent.getParents(generation - 1));
            });

            return outputParents
        }
    }


    getDirectChildren() {
        if (this.children.length == 0) {
            this.children = [new relativeNode([this], [], []), new relativeNode([this], [], [])]
        }

        return this.children
    }

    getChildren(generation = 0) {
        checkParameter(generation, "generation")
        // generation 0 children are your children
        // generation 1 children are your children's children, your grandchildren
        // generation 2 children are your grandchildren's children, your great-grandchildren


        if (generation == 0) {
            return this.getDirectChildren()
        } else {
            const directChildren = this.getDirectChildren()

            let outputChildren = []

            directChildren.forEach(children => {
                outputChildren = outputChildren.concat(children.getChildren(generation - 1));
            });

            return outputChildren
        }
    }


    getSiblings() {
        // you only have one kind of sibling, i.e. no parameters needed
        let siblings = []

        const parents = this.getParents()

        parents.forEach(parent => {
            let children = parent.getChildren()

            let siblingExists = false
            children.forEach(child => {
                if (child.value != this.value) {
                    siblings.push(child)
                    siblingExists = true
                }
            });

            if (!siblingExists) {
                let sibling = new relativeNode(parents, [])
                parent.children.push(sibling)
                siblings.push(sibling)
            }

        });

        return siblings
    }


    getPiblings(generation = 0, degree = 0) {
        checkParameter(generation, "generation")
        checkParameter(degree, "degree")
        // generation 0, degree 0 = pibling
        // generation 1, degree 0 = grand-pibling
        // generation 2, degree 0 = great-grand-pibling
        // generation 0, degree 1 = 2nd Pibling
        // generation 0, degree 2 = 3rd Pibling
        // generation 1, degree 1 = 2nd grand-pibling
        // generation 1, degree 2 = 3rd grand-pibling

        let parents = this.getParents(generation)

        let piblings = []
        parents.forEach(parent => {
            piblings = piblings.concat(parent.getSiblings())
        });

        if (degree == 0) {
            return piblings
        } else {
            let degreePiblings = []
            piblings.forEach(pibling => {
                degreePiblings = degreePiblings.concat(pibling.getCousins(degree - 1))
            });
            return degreePiblings
        }
    }


    getNiblings(generation = 0, degree = 0) {
        checkParameter(generation, "generation");
        checkParameter(degree, "degree");
        // generation 0, degree 0 = nibling
        // generation 1, degree 0 = grand-nibling
        // generation 2, degree 0 = great-grand-nibling
        // generation 0, degree 1 = 2nd Nibling
        // generation 0, degree 2 = 3rd Nibling
        // generation 1, degree 1 = 2nd grand-Nibling
        // generation 1, degree 2 = 3rd grand-Nibling

        let niblingParents = []
        if (degree == 0) {
            niblingParents = this.getSiblings()
        } else {
            niblingParents = this.getCousins(degree - 1)
        }

        let niblings = []
        niblingParents.forEach(parent => {
            niblings = niblings.concat(parent.getChildren(generation))
        });

        return niblings
    }


    getCousins(degree = 0) {
        checkParameter(degree, "degree")
        // note, this system talks about european family relations, i.e. not everyone is your fucking cousin
        // cousins are all people within your own generation who aren't your siblings or yourself,
        // for example your pibling's children, 2nd pibling's children (2nd cousins)
        // there is no removal going on (first cousin twice removed)

        let parents = this.getParents(degree)

        let piblings = []
        parents.forEach(parent => {
            piblings = piblings.concat(parent.getSiblings())
        });

        let cousins = []
        piblings.forEach(pibling => {
            cousins = cousins.concat(pibling.getChildren(degree))
        });

        return cousins
    }

    isDirectAncestorOfThis(node, steps = 1) {
        if (node.children == undefined | node.children == []) {
            return false
        }

        if (node.children.includes(this)) {
            return steps
        } else {
            let output = false
            node.children.forEach(child => {
                let singleOutput = this.isDirectAncestorOfThis(child, steps + 1)
                if (singleOutput) {
                    output = singleOutput
                }
            })
            return output
        }
    }

    isDirectDescendantOfThis(node, steps = 1) {
        if (node.parents == undefined | node.parents == []) {
            return false
        }

        if (node.parents.includes(this)) {
            return steps
        } else {
            let output = false

            node.parents.forEach(parent => {
                let singleOutput = this.isDirectDescendantOfThis(parent, steps + 1)
                if (singleOutput) {
                    output = singleOutput
                }
            })

            return output
        }
    }

    getLastCommonAncestor(node) {
        let this_steps = 0
        let node_steps = 0


        if (this == node) { }
        else if (this.isDirectAncestorOfThis(node)) {
            this_steps = this.isDirectAncestorOfThis(node)
        }
        else if (this.isDirectDescendantOfThis(node)) {
            node_steps = this.isDirectDescendantOfThis(node)
        }
        else {
            let enabled = true
            let parent_to_check = node.parents[0]
            while (enabled) {
                node_steps++;

                let check = this.isDirectAncestorOfThis(parent_to_check)

                if (check) {
                    this_steps = check
                    enabled = false
                } else {
                    parent_to_check = parent_to_check.parents[0]
                }
            }
        }


        return {
            "this": this_steps,
            "node": node_steps
        }
    }
}
