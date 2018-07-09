class Visitor{

    constructor(){

    }

    visitNumNode(node){}
    visitOpNode(node){}
    visitVarNode(node){}
    visitAssignNode(node){}
    visitStmtNode(node){}
    visitProgramNode(node){}

}

class Interpreter extends Visitor{

    constructor(tree){
        super();
        this.symbolTlb={};
        tree.accept(this);
    }

    visitProgramNode(node){
        console.log("interpret start!");
        console.log(this.symbolTlb);
    }

    visitFunctNode(node){
        


    }

    

    visitIfElseNode(node){
        node.right.accept(this,node.left.accept(this));
    }

    visitSepExpNode(node,truthValue){
        if (truthValue> 0)
            node.left.accept(this);
        else
            node.right.accept(this);

    }


    visitOpNode(node){
        var res=0;
        switch(node.token){

            case '+':
                res= node.left.accept(this) + node.right.accept(this);
                break;
            case '-':
                res= node.left.accept(this) - node.right.accept(this);
                break;
            case '*':
                res= node.left.accept(this) * node.right.accept(this);
                break;
            case '/':
                res= node.left.accept(this) / node.right.accept(this);
                break;
            case '>':
                res= node.left.accept(this) - node.right.accept(this);
                break;
            case '<':
                res= -1* node.left.accept(this) + node.right.accept(this);
                break;
        }
        return res;
    }

    visitAssignNode(node){
        this.symbolTlb[node.left.token] = node.right.accept(this);
        return null;
    }

    visitVarNode(node){
            return this.symbolTlb[node.token];

    }


    visitStmtNode(node){
    }

    CompoundStmtNode(node){
        node.left.accept(this);
    }

    visitNumNode(node){
        return node.value;
    }





}

export{Interpreter};