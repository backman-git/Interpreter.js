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
    accept(visitor){return visitor.visitOpNode(this);}
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
    accept(visitor){return visitor.visitAssignNode(this);}

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

    addProgram(programNode){
        Node.dfs()
    }
   

    accept(visitor){ return visitor.visitProgramNode(this);}
    concat(programNode){

        do{
            var n=programNode.left;
            if(n.left == null){
                n.left=this.left;
                this.left = programNode.left;
                ProgramNode.left =null;
                break;
            }
            n=n.left;
        }while (n.left!=null);
    
    }

}

class StmtNode extends Node{
    
    constructor(expNode){
        super();
        this.token="Statement";
        this.left=null;
        this.right=expNode;

    }

    accept(visitor){return visitor.visitStmtNode(this);}
}

class IfElseNode extends Node{

    constructor(expNode,sepExpNode){
        super();
        this.token = "IfElse";
        this.left = expNode;
        this.right =sepExpNode;
    }

    accept(visitor){visitor.visitIfElseNode(this);}

}

class SepExpNode extends Node{

    constructor(ifExpNode,elseExpNode){
        super();
        this.token = "SepExpNode";
        this.left = ifExpNode;
        this.right = elseExpNode;
    }
    accept(visitor,truthValue){visitor.visitSepExpNode(this,truthValue);}
}

//use value to store function id.~  should change
class FunctNode extends Node{

    constructor(fName,paraList,stmtNode){
        super();
        this.token="Funct: "+fName;
        this.value =""+fName;
        this.left=paraList;
        this.right=stmtNode;
    }

    accept(visitor){return visitor.visitFunctNode(this);}

}
// use value to store function id.~ should change 2. fName should be convert to String in the bison file!
class FunctExpNode extends Node{

    constructor(fName,argList){
        super();
        this.token="Funct EXP: "+fName;
        this.value = ""+fName;
        this.left=argList;
    }

    accept(visitor){return visitor.visitFunctExpNode(this);}

}

class CompoundStmtNode extends Node{
    constructor(stmtNode){
        super();
        this.token="CompoundStatement";
        this.right = stmtNode;
    }
    
    addStmt(stmtNode){
        stmtNode.left=this.right;
        this.right=stmtNode;
    }

    accept(visitor){return visitor.visitCompoundStmtNode(this);}

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
    accept(visitor){return visitor.visitParaListNode(this);}
}

class PNode extends Node{
    constructor(token){
        super();
        this.token=token;
    }
    accept(visitor){return visitor.visitPNode(this);}

}

class ArgListNode extends Node{

    constructor(aNode){
        super();
        this.token="ArgList";
        this.idx=0;
        aNode.token="arg"+this.idx;
        this.idx+=1;
        this.left=aNode;
    
    }

    addArg(aNode){
        aNode.token="arg"+this.idx;
        this.idx+=1;
        aNode.left = this.left;
        this.left= aNode;
    }

    accept(visitor){return visitor.visitArgListNode(this);}

}

class ArgNode extends Node{

    constructor(expNode){
        super();
        this.right = expNode;
    }
    accept(visitor){return visitor.visitArgNode(this);}
}

class ReturnNode extends Node{
    
    constructor(expNode){
        super();
        this.token= "RETURN";
        this.right = expNode;
    }

    accept(visitor){return visitor.visitReturnNode(this);}



}



export{PNode,ParaListNode,Node,OpNode,NumNode,VarNode,AssignNode,StmtNode,ProgramNode,FunctNode,FunctExpNode,CompoundStmtNode,IDNode,IfElseNode,SepExpNode,ArgNode,ArgListNode,ReturnNode};
