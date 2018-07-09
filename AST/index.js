import fs from 'fs';
class Node{

    constructor(){
        this.left=null;
        this.right=null;
        this.value=null;
        this.token=null;
    }

    accept(visitor){}

    static genGraph(root){
        var graph ="digraph AST{ \n";
        
        this.dfs(root,1,(node,idx)=>{
            var symbolIdx = "n"+idx; 
            graph+=symbolIdx+" [label=\""+node.token+"\"];\n";

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
}

// op
/*
OpNode.prototype = new Node();
OpNode.prototype.constructor = OpNode;

function OpNode(token,left,right){
    this.token=token;
    this.left=left;
    this.right=right;


}


// number
NumNode.prototype = new Node();
NumNode.prototype.constructor = NumNode;
function NumNode(token){
    this.token = token;
    this.value = token;
}


*/
class OpNode extends Node{
    constructor(token,left,right){
        super();
        this.token=token;
        this.left=left;
        this.right=right;
    }
    accept(visitor){
        return visitor.visitOpNode(this);
    }
}
class NumNode extends Node{

    constructor(token){
        super();
        this.token = token;
        this.value = token;

    }
    accept(visitor){return visitor.visitNumNode(this);}
}




class IDNode extends Node{

    constructor(token){
        super();
        this.token = token;
    }
}



class VarNode extends Node {

    constructor(token){
        super();
        this.token = token;
    }
    accept(visitor){return visitor.visitVarNode(this);}
}

class AssignNode extends Node{

    constructor(left,right){
        super();
        this.token='=';
        this.left=left;
        this.right=right;
    }
    accept(visitor){
        return visitor.visitAssignNode(this);
    }

}

class ProgramNode extends Node{

    constructor(stmtNode){
        super();
        this.token="Program";
        this.left = stmtNode;
    }
    addStmt(stmtNode){
        stmtNode.left=this.left;
        this.left=stmtNode;
    }

    dfs(root,visitor){
        
        if(root == null)
            return;
        this.dfs(root.left,visitor);
        root.accept(visitor);

    }

    accept(visitor){
        
        this.dfs(this.left,visitor);

        visitor.visitProgramNode(this);
    }

}

class StmtNode extends Node{
    
    constructor(expNode){
        super();
        this.token="Statement";
        this.left=null;
        this.right=expNode;

    }

    accept(visitor){
        if(this.right != null){
            this.right.accept(visitor);
        }
        visitor.visitStmtNode(this);
    }
}

class FunctNode extends Node{

    constructor(fName,argumentList,stmtNode){
        super();
        this.token="Funct: "+fName;
        this.left=argumentList;
        this.right=stmtNode;
    }


}

class CompoundStmtNode extends Node{
    constructor(stmtNode){
        super();
        this.token="CompoundStatement";
        this.left = stmtNode;
    }
    
    addStmt(stmtNode){
        stmtNode.left=this.left;
        this.left=stmtNode;
    }

}

class ParaListNode extends Node {

    constructor(pNode){
        super();
        this.token="ParaList"
        this.left=pNode;
    }

    addPara(pNode){
        pNode.left=this.left;
        this.left=pNode;
    }

}

class PNode extends Node{
    constructor(token){
        super();
        this.token=token;
    }
}




export{PNode,ParaListNode,Node,OpNode,NumNode,VarNode,AssignNode,StmtNode,ProgramNode,FunctNode,CompoundStmtNode,IDNode};