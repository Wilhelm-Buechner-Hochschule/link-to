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
    if (!files || !files.length || files.length == 0) {
        status.setCode(status.STATUS_BAD_REQUEST, "No files given.");
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
            results.push(result);
            return;
        }

        var symlink = destNode.createNode(fileNode.name, "app:filelink", {
        		"cm:destination": fileNode
        	});
        if (symlink) {
            symlink.save();
            
            result.id = symlink.name;
            result.nodeRef = symlink.nodeRef.toString();
            result.success = true;
        }

        results.push(result);
    });

    return results;
}

// Bootstrap the action script:

main();
