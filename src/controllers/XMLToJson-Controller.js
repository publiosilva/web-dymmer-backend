const DOMParser = require('xmldom').DOMParser;

exports.post = async(req, res, next) => {
	console.log("Requisição Recebida!")
	let json = convertXMLToJson(req.body.xmlString);
	res.status(200).send(json);
	next();
}

/* convert the XML document to json */
convertXMLToJson = (data) => {
	let json = new Object();;	
	let document = new DOMParser().parseFromString(data, 'text/xml');

	// Name of feature model	
	let feature_model_name = document.getElementsByTagName('feature_model')[0].getAttribute('name');
	json['name'] = feature_model_name;

	// Meta of feature model
	let feature_model_meta = document.getElementsByTagName('data');
	for(index = 0;index < feature_model_meta.length;index++) {
		let data_name = feature_model_meta[index].getAttribute('name');
		let data_content = feature_model_meta[index].textContent;
		json[data_name] = data_content;	
	}

	// Tree
	let tree_string = document.getElementsByTagName('feature_tree')[0].textContent;
	let tree = generate_tree(tree_string);
	json['feature_tree'] = [tree];

	// Constraints
	let constraints_string = document.getElementsByTagName('constraints')[0].textContent;
	let constraints = generate_constraints(constraints_string);
	json['feature_tree']['constraints'] = constraints;

	return JSON.stringify(json);
}

/* creates individual tree nodes from a string */
generate_node = (node_string) => {
	let id, type, name, multiplicity, children;
	/* id */	
	id = node_string.substring(node_string.indexOf('(') + 1, node_string.indexOf(')'));
	/* type */
	type = node_string.substring(node_string.indexOf(':') + 1, node_string.indexOf(':') + 2);
	if (type == ' ') {
		type = '';
	}
	/* name */
	if (type == '') {
		name = node_string.substring(node_string.indexOf(':') + 2, node_string.indexOf('('));
	} else {
		name = node_string.substring(node_string.indexOf(':') + 3, node_string.indexOf('('));
	}	
	/* children */
    children = [];
	/* multiplicity */
	if (type == 'g') {
		multiplicity = node_string.substring(node_string.indexOf('[') + 1, node_string.indexOf(']'));
	}
	/* return object */
	if (type == 'g') {
		return { id, type, multiplicity, name, children };	
	} else {
		return { id, type, name, children };
	}
}

/* identifies the position of a node based on the id and inserts it */
insert_node = (node, root_node) => {
    if (root_node.id === node.id.substring(0, node.id.lastIndexOf('_'))) {
        root_node.children.push(node);
    } else {
        for (index in root_node.children) {
            if (node.id.indexOf(root_node.children[index].id) != -1) {
                insert_node(node, root_node.children[index]);
			}
		}
	}
}

/* creates the tree based on a string */
generate_tree = (tree_string) => {
    let tree_array = tree_string.split('\n');
    let root_node = null;
    for (index in tree_array) {
		if (tree_array[index] !== '') {
		    let node = generate_node(tree_array[index]);
		    if (root_node == null) {
		        root_node = node;
		    } else {
		        insert_node(node, root_node);
			}
		}
	}
    return root_node;
}

/* creates constraints based on a string */
generate_constraints = (constraints_string) => {
    let constraints_array = constraints_string.split('\n');
    let constraints = [];
    for (index in constraints_array) {
		let item = constraints_array[index];
		if (item !== '') {
		    let constraint = {};
			let name = item.substring(0, item.indexOf(':'));
			let value = item.substring(item.indexOf(':') + 1, item.length);
			constraint[name] = value;
			constraints.push(constraint);
		}
	}
    return constraints;
}