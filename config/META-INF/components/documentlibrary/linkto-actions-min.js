(function(){YAHOO.Bubbling.fire("registerAction",{actionName:"onActionLinkTo",fn:function a(b){if(!this.widgets.linkToFolderPicker){this.widgets.linkToFolderPicker=new Alfresco.module.DoclibGlobalFolder(this.id+"-selectLinkToFolder");this.widgets.linkToFolderPicker.setOptions({siteId:this.options.siteId,containerId:this.options.containerId,title:this.msg("message.linkto.pickerdialog.title"),nodeRef:"alfresco://company/home"});var c=this;YAHOO.Bubbling.on("folderSelected",function(e,d){var f=new Alfresco.util.NodeRef(d[1].selectedFolder.nodeRef);console.log(d);console.log(f);console.log(b);c.modules.actions.genericAction({success:{message:c.msg("message.linkto.success",b.displayName,d[1].selectedFolder.path)},failure:{message:c.msg("message.linkto.failure")},webscript:{name:"hfb/linkTo/node/{nodeRef}",stem:Alfresco.constants.PROXY_URI,method:Alfresco.util.Ajax.POST,params:{nodeRef:f.uri},},config:{requestContentType:Alfresco.util.Ajax.JSON,dataObj:{nodeRefs:[b.nodeRef],parentId:c.options.parentId}}})})}this.widgets.linkToFolderPicker.showDialog()}})})();