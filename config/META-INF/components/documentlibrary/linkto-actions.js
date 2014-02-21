(function() {
    YAHOO.Bubbling.fire("registerAction", {
        actionName: "onActionLinkTo",
        fn: function hfb_onActionLinkTo(file) {
            if(!this.widgets.linkToFolderPicker) {
                this.widgets.linkToFolderPicker = 
                        new Alfresco.module.DoclibGlobalFolder(
                                this.id + "-selectLinkToFolder");
                this.widgets.linkToFolderPicker.setOptions({
                    siteId: this.options.siteId,
                    containerId: this.options.containerId,
                    title: this.msg("message.linkto.pickerdialog.title"),
                    nodeRef: "alfresco://company/home"
                });

                var that = this;

                YAHOO.Bubbling.on("folderSelected", function(layer, args) {
                    var nodeRef = new Alfresco.util.NodeRef(
                        args[1].selectedFolder.nodeRef);
                    that.modules.actions.genericAction({
                        success: {
                            message: that.msg("message.linkto.success", 
                                file.displayName, args[1].selectedFolder.path)
                        },
                        failure: {
                            message: that.msg("message.linkto.failure")
                        },
                        webscript: {
                            name: "hfb/linkTo/node/{nodeRef}",
                            stem: Alfresco.constants.PROXY_URI,
                            method: Alfresco.util.Ajax.POST,
                            params: {
                               nodeRef: nodeRef.uri
                            },
                        },
                        config: {
                            requestContentType: Alfresco.util.Ajax.JSON,
                            dataObj: {
                                nodeRefs: [file.nodeRef],
                                destNode: nodeRef,
                                parentId: that.options.parentId
                            }
                        }
                    });
                });
            }

            this.widgets.linkToFolderPicker.showDialog();
        }
    });
})();
