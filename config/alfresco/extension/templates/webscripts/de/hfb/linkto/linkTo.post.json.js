<import resource="classpath:/alfresco/templates/webscripts/org/alfresco/slingshot/documentlibrary/action/action.lib.js">

/*
 * linkTo.post.js -- Controller script for the linkTo action
 * Copyright (C) 2013  Eric MSP Veith <eric.veith@wb-fernstudium.de>
 */


/**
 * Entrypoint required by action.lib.js
 *
 * @method runAction
 * @param p_params {object} Object literal containing files array
 * @return {object|null} object representation of action results
 */
function runAction(p_params)
{
    var destNode = p_params.destNode;
    var files = p_params.files;
    var results = [];

    // Must have array of files
    if (!files || files.length == 0) {
        status.setCode(status.STATUS_BAD_REQUEST, "No files.");
        return;
    }


    files.forEach(function(ref, i) {
        var fileNode = search.findNode(ref);
        var result = {
            nodeRef: ref,
            action: "linkTo",
            success: false
        };

        if (null == fileNode) {
            result.id = i;
            results.push(result);
            return;
        }

        destNode.addNode(fileNode);
        fileNode.parents.push(destNode);

        result.success = true;

        results.push(result);
    });

    return results;
}

// Bootstrap the action script:

main();
