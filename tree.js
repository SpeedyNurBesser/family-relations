
let id=0

function map_node_to_tree(node) {
  const mapped = {};

  const classes = [];
  if (node.isLCA) classes.push("lca-node");
  if (node.isReference) classes.push("reference-node");
  if (node.isOrigin) classes.push("origin-node");
  if (node.isDescribed) classes.push("described-node");

  if (classes.length > 0) {
    mapped.HTMLclass = classes.join(" ");
  }
  if (node.children && node.children.length > 0) {
    mapped.children = node.children.map(child => map_node_to_tree(child));
  }

  return mapped;
}


function build_chart_from_LCA(LCA) {
    id++;
    chart_section.innerHTML += '<div class="explanation-chart"><div class="explanation-item"><div class="explanation-node lca-node"></div><span data-i18n="lca"></span></div><div class="explanation-item"><div class="explanation-node reference-node"></div><span data-i18n="reference"></span></div><div class="explanation-item"><div class="explanation-node described-node"></div><span data-i18n="described"></span></div><div class="explanation-item"><div class="explanation-node origin-node"></div><span data-i18n="origin"></span></div></div>'
    container = document.createElement("div")
    container.setAttribute("class", "chart-container")
    container.setAttribute("id", `family-tree${id}`)
    chart_section.appendChild(container)

    let chart_config = {
        chart: {
            container: `#family-tree${id}`,
            siblingSeparation:   20,
            subTeeSeparation:    60,
            scrollbar: "fancy",
            
            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'default-node'
            }
        },
        nodeStructure: map_node_to_tree(LCA)
    }

    let chart = new Treant(chart_config)

    return chart
}