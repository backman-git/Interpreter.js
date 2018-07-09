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

    visitNumNode(node){
        return node.value;
    }

}

export{Interpreter};