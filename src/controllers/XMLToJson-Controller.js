const DOMParser = require('xmldom').DOMParser;

exports.post = (req, res) => {
    let json = convertXMLToJson(req.body.xmlString);
    res.status(200).send(json);
}

/* convert the XML document to json */
convertXMLToJson = (data) => {
    let json = {};	
    let document = new DOMParser().parseFromString(data, 'text/xml');

    // name of feature model	
    let featureModelName = document.getElementsByTagName('feature_model')[0].getAttribute('name');
    json['name'] = featureModelName;

    // meta of feature model
    let featureModelMeta = document.getElementsByTagName('data');
    for(index = 0;index < featureModelMeta.length;index++) {
        let dataName = featureModelMeta[index].getAttribute('name');
        let dataContent = featureModelMeta[index].textContent;
        json[dataName] = dataContent;	
    }

    // tree
    let treeString = document.getElementsByTagName('feature_tree')[0].textContent;
    let tree = generateTree(treeString);
    json['feature_tree'] = [tree];

    // constraints
    let constraintsString = document.getElementsByTagName('constraints')[0].textContent;
    let constraints = generateConstraints(constraintsString);
    json['constraints'] = constraints;

    // contexts
    let contextElements = document.getElementsByTagName('context');
    let contexts = generateContexts(contextElements);
    json['contexts'] = contexts;

    return JSON.stringify(json);
}

/* creates individual tree nodes from a string */
generateNode = (nodeString) => {
    let id, type, name, multiplicity, children;
    
    /* id */	
    id = nodeString.substring(nodeString.indexOf('(') + 1, nodeString.indexOf(')'));
    
    /* type */
    type = nodeString.substring(nodeString.indexOf(':') + 1, nodeString.indexOf(':') + 2);
    
    if (type == ' ') {
        type = '';
    }
    
    /* name */
    if (type == '') {
        name = nodeString.substring(nodeString.indexOf(':') + 2, nodeString.indexOf('('));
    } else {
        name = nodeString.substring(nodeString.indexOf(':') + 3, nodeString.indexOf('('));
    }	
    
    /* children */
    children = [];
    
    /* multiplicity */
    if (type == 'g') {
        multiplicity = nodeString.substring(nodeString.indexOf('[') + 1, nodeString.indexOf(']'));
    }

    /* return object */
    if (type == 'g') {
        return { id, type, multiplicity, name, children };	
    } else {
        return { id, type, name, children };
    }
}

/* identifies the position of a node based on the id and inserts it */
insertNode = (node, rootNode) => {
    if (rootNode.id === node.id.substring(0, node.id.lastIndexOf('_'))) {
        rootNode.children.push(node);
    } else {
        for (index in rootNode.children) {
            if (node.id.indexOf(rootNode.children[index].id) != -1) {
                insertNode(node, rootNode.children[index]);
            }
        }
    }
}

/* creates the tree based on a string */
generateTree = (treeString) => {
    let treeArray = treeString.split('\n');
    let rootNode = null;

    for (index in treeArray) {
        if (treeArray[index] !== '') {
            let node = generateNode(treeArray[index]);

            if (rootNode == null) {
                rootNode = node;
            } else {
                insertNode(node, rootNode);
            }
        }
    }

    return rootNode;
}

/* creates constraints based on a string */
generateConstraints = (constraintsString) => {
    let constraintsArray = constraintsString.split('\n');
    let constraints = [];

    for (index in constraintsArray) {
        let item = constraintsArray[index];

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

/* create a set of contexts */
generateContexts = (contextElements) => {
    let contexts = [];

    for (index = 0; index < contextElements.length; index++) {
        contexts.push(generateContext(contextElements[index]));
    }

    return contexts;
}

/* create a context */
generateContext = (contextElement) => {
    let context = {
        name: contextElement.getAttribute('name'),
        resolutions: [],
        constraints: []
    };

    // resolutions
    let resolutions = contextElement.getElementsByTagName('resolution');
    for(index = 0;index < resolutions.length;index++) {
        let resolution = {};
        resolution['feature_id'] = resolutions[index].getAttribute('id');
        resolution['feature_name'] = resolutions[index].getAttribute('feature');
        resolution['status'] = resolutions[index].getAttribute('status') === 'true';
        context.resolutions.push(resolution);
    }

    // constraints
    let constraintsString = contextElement.getElementsByTagName('constraints')[0].textContent;
    context.constraints = generateConstraints(constraintsString);   

    return context;
}
