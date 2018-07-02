import fs from 'fs';
class Node{

    constructor(){
        this.left=null;
        this.right=null;
        this.value=null;
    }

    static genGraph(root){
        var graph ="digraph AST{ \n";

        this.dfs(root,1,(node,idx)=>{
            var symbolIdx = "n"+idx; 
            graph+=symbolIdx+" [label=\""+node.value+"\"];\n";

            if(node.left !==null){
                var leftSymbolIdx = "n"+(2*idx);
                graph+=symbolIdx+" -> "+leftSymbolIdx+';\n';
            }
            if(node.right !==null){
                var rightSymbolIdx = "n"+(2*idx+1);
                graph+=symbolIdx+" -> "+rightSymbolIdx+';\n';
            }
        });
        
        graph+="}";
        // write to file!
        fs.writeFile('ASTGraph',graph,  (err)=> {
            if (err) {
               return console.error(err);
            }
         });
        return graph; 
    }
   
    static dfs(node,idx,fn){

        if( node === null )
            return ;
        fn(node,idx);
        this.dfs(node.left,2*idx,fn);
        this.dfs(node.right,2*idx+1,fn);
    }
};

// op
OpNode.prototype = new Node();
OpNode.prototype.constructor = OpNode;
function OpNode(value,left,right){
    this.value=value;
    this.left=left;
    this.right=right;
};

// number
NumNode.prototype = new Node();
NumNode.prototype.constructor = NumNode;
function NumNode(value){
    this.value = value;
};

export{OpNode,NumNode,Node};