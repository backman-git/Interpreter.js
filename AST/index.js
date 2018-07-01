
function Node(){
    this.left=null;
    this.right=null;
    this.value=null;
};

// op
OpNode.prototype = new Node();
OpNode.prototype.constructor = OpNode();
function OpNode(value,left,right){
    this.value=value;
    this.left=left;
    this.right=right;
};

// number
function NumNode(value){
    this.value = value;
};

